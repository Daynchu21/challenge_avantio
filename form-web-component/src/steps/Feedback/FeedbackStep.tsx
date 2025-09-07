import React from "react";
import ButtonUI from "../../components/ui/Button";

export type FeedbackStepProps = {
  feedback: { type: "success" | "error"; msg: string };
  onRetry: () => void;
  onNew: () => void;
};

const FeedbackStep: React.FC<FeedbackStepProps> = ({
  feedback,
  onRetry,
  onNew,
}) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[200px]">
      <div
        className={`rounded-lg px-4 py-3 text-base mb-6 max-w-md text-center border ${
          feedback.type === "success"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-rose-50 text-rose-800 border-rose-200"
        }`}
      >
        {feedback.msg}
      </div>
      {feedback.type === "success" ? (
        <ButtonUI variant="blue" onClick={onNew}>
          New Submission
        </ButtonUI>
      ) : (
        <ButtonUI variant="blue" onClick={onRetry}>
          Retry
        </ButtonUI>
      )}
    </section>
  );
};

export default FeedbackStep;
