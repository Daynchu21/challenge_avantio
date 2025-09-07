import type { ZodTypeAny, infer as ZodInfer } from "zod";

export function validateStep<S extends ZodTypeAny>(
  schema: S,
  data: unknown
):
  | { ok: true; data: ZodInfer<S>; errors: {} }
  | { ok: false; errors: Record<string, string> } {
  const res = schema.safeParse(data);
  if (res.success) {
    return { ok: true, data: res.data, errors: {} };
  }
  const errors: Record<string, string> = {};
  for (const issue of res.error.issues) {
    const path = issue.path.join(".") || "_";
    errors[path] = issue.message;
  }
  return { ok: false, errors };
}
