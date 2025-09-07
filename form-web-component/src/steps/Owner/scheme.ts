import { z } from "zod";
import { EMAIL_RX, PHONE_RX, NON_EMPTY_RX } from "../../validation/regex";

export const ownerSchema = z.object({
  name: z
    .string()
    .regex(NON_EMPTY_RX, "Owner name is required")
    .min(4, "Owner name must be at least 4 characters")
    .max(64, "Owner name must be at most 64 characters"),
  email: z.string().regex(EMAIL_RX, "Invalid email"),
  phone: z
    .string()
    .regex(PHONE_RX, "Invalid phone")
    .or(z.literal(""))
    .optional(),
});

export type OwnerData = z.infer<typeof ownerSchema>;
