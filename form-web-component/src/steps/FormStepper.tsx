import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  initialAccommodation,
  initialOwner,
  type Accommodation,
  type Owner,
} from "../types";
import AccommodationStep from "./Accommodation/AccommodationStep";
import OwnerStep from "./Owner/OwnerStep";
import SummaryStep from "./Summary/SummaryStep";
import { accommodationSchema } from "./Accommodation/scheme";
import { ownerSchema } from "./Owner/scheme";
import { validateStep } from "../validation/helpers";
import { formSchema } from "../validation/rootSchema";
import { AnimatePresence, motion } from "framer-motion";
import ResultStep from "./Result/ResultStep";
import { useGoogleMapsLoader } from "../hooks/useGoogleMapsLoader";

export type FormStepperProps = {
  mapsKey: string | undefined;
  country?: string;
  onSubmit?: (payload: { accommodation: Accommodation; owner: Owner }) => void;
};

const variants = {
  enter: (dir: 1 | -1) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: 1 | -1) => ({ x: -dir * 40, opacity: 0 }),
};

export default function FormStepper({
  mapsKey,
  country,
  onSubmit,
}: FormStepperProps) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<1 | -1>(1); // 1=next, -1=back
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [formState, setFormState] = useState({
    accommodation: initialAccommodation,
    owner: initialOwner,
  });
  const googleComponent = useGoogleMapsLoader(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || mapsKey
  );

  const stepSchemas = useMemo(() => [accommodationSchema, ownerSchema], []);
  const currentSchema = stepSchemas[step];
  const currentData = useMemo(() => {
    return step === 0 ? formState.accommodation : formState.owner;
  }, [step, formState]);

  const validateCurrentStep = () => {
    if (!currentSchema) return true;
    const res = validateStep(currentSchema, currentData);
    setErrors(res.ok ? {} : res.errors);
    return res.ok;
  };

  const setAccommodation: Dispatch<SetStateAction<Accommodation>> = (value) => {
    setFormState((prev) => ({
      ...prev,
      accommodation:
        typeof value === "function"
          ? (value as (prev: Accommodation) => Accommodation)(
              prev.accommodation
            )
          : value,
    }));
  };

  const setOwner: Dispatch<SetStateAction<Owner>> = (value) => {
    setFormState((prev) => ({
      ...prev,
      owner:
        typeof value === "function"
          ? (value as (prev: Owner) => Owner)(prev.owner)
          : value,
    }));
  };

  const submit = async () => {
    const res = formSchema.safeParse(formState);

    if (!res.success) {
      const fieldErrors: Record<string, string> = {};
      res.error.issues.forEach((issue) => {
        fieldErrors[issue.path.join(".")] = issue.message;
      });
      setErrors(fieldErrors);
      setFeedback({
        type: "error",
        msg: "Please fix the errors in the form and try again.",
      });
      setStep(3);
      return { ok: false, errors: fieldErrors };
    }

    setSubmitting(true);
    setFeedback(null);

    await new Promise((r) => setTimeout(r, 900));

    const ok = Math.random() < 0.7;

    if (ok) {
      onSubmit?.(formState);
      setFeedback({
        type: "success",
        msg: "¡Formulario enviado correctamente!",
      });
      setSubmitting(false);
      setStep(3);
      return { ok: true, data: res.data };
    } else {
      setFeedback({
        type: "error",
        msg: "Ocurrió un error al enviar. Intenta nuevamente.",
      });
      setSubmitting(false);
      setStep(3);
      return { ok: false, errors: { _: "random-failure" } };
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleResetForm = () => {
    setFormState({ accommodation: initialAccommodation, owner: initialOwner });
    setErrors({});
    setFeedback(null);
    setStep(0);
    setDirection(1);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white text-neutral-900 shadow-xl p-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.5,
            }}
          >
            {step === 0 && (
              <AccommodationStep
                google={googleComponent}
                country={country}
                accommodation={formState.accommodation}
                setAccommodation={setAccommodation}
                next={handleNext}
                errors={errors}
              />
            )}
            {step === 1 && (
              <OwnerStep
                owner={formState.owner}
                setOwner={setOwner}
                next={handleNext}
                back={handleBack}
                errors={errors}
              />
            )}
            {step === 2 && (
              <SummaryStep
                accommodation={formState.accommodation}
                submit={submit}
                owner={formState.owner}
                back={handleBack}
                submitting={submitting}
                feedback={feedback}
              />
            )}
            {step === 3 && feedback && (
              <ResultStep
                feedback={feedback}
                onRetry={() => {
                  setSubmitting(false);
                  setStep(2);
                }}
                onNew={() => {
                  handleResetForm();
                  setStep(0);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
