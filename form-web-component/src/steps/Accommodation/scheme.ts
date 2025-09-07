import { z } from "zod";
import { NON_EMPTY_RX } from "../../validation/regex";

const TYPES_RENT = ["apartment", "villa", "house"];

export const accommodationSchema = z.object({
  name: z
    .string()
    .regex(NON_EMPTY_RX, "Name is required")
    .min(4, "Min. 4 characters")
    .max(128, "Max. 128 characters"),
  address: z
    .string()
    .regex(NON_EMPTY_RX, "Address is required")
    .min(4, "Min. 4 characters")
    .max(128, "Max. 128 characters"),
  description: z
    .string()
    .max(2048, "Max. 2048 characters")
    .refine((val) => val.length === 0 || val.length >= 128, {
      message: "Min. 128 characters",
    })
    .optional(),
  type: z
    .string()
    .transform((val) => val.toLowerCase())
    .refine((val) => TYPES_RENT.includes(val), {
      message:
        "Only one of these values is allowed: apartment, villa, or house",
    }),
  photos: z.array(z.string()).max(2, "At least one photo").optional(),
});

export type AccommodationData = z.infer<typeof accommodationSchema>;
