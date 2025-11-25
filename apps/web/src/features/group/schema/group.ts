import * as z from "zod";

const groupFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nazwa grupy jest wymagana")
    .max(40, "Nazwa grupy nie może przekraczać 40 znaków"),
  description: z
    .string()
    .max(80, "Opis grupy nie może przekraczać 80 znaków")
    .optional(),
});

export { groupFormSchema };
