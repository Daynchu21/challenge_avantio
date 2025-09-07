import { z } from "zod";
import { accommodationSchema } from "../steps/Accommodation/scheme";
import { ownerSchema } from "../steps/Owner/scheme";

export const formSchema = z.object({
  accommodation: accommodationSchema,
  owner: ownerSchema,
});

export type FormData = z.infer<typeof formSchema>;
