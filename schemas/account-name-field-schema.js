import * as zod from "zod";

export const AccountNameFieldSchema = zod
  .object({
    fullName: zod
      .string({ required_error: "Es necesario que proporciones tu nombre" })
      .min(3, {
        message: "Debe tener al menos 3 caracteres",
      }),
  })
  .required();
