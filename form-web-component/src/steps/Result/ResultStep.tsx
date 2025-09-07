import ButtonUI from "../../components/ui/Button";

export default function ResultStep({
  feedback,
  onRetry,
  onNew,
}: {
  feedback: { type: "success" | "error"; msg: string };
  onRetry: () => void;
  onNew: () => void;
}) {
  const isOk = feedback.type === "success";
  return (
    <section className="text-center space-y-4">
      <div
        className={`mx-auto w-16 h-16 rounded-full grid place-items-center
        ${
          isOk ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
        }`}
      >
        {isOk ? "✓" : "✕"}
      </div>
      <h2 className="text-xl font-semibold">
        {isOk ? "Submitted!" : "Submission failed"}
      </h2>
      <p className="text-sm text-gray-600">{feedback.msg}</p>
      <div className="flex gap-3 pt-2">
        {!isOk && (
          <ButtonUI className="flex-1" variant="white" onClick={onRetry}>
            Try again
          </ButtonUI>
        )}
        <ButtonUI className="flex-1" variant="blue" onClick={onNew}>
          New submission
        </ButtonUI>
      </div>
    </section>
  );
}
