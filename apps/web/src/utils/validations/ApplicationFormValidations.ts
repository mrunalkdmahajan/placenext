import z from "zod";

export const ApplicatioonFormValidations = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
