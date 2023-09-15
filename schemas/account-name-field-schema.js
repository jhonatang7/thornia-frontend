import * as zod from "zod";

export const AccountNameFieldSchema = zod
  .object({
    name: zod
      .string({ required_error: "Es necesario que proporciones tu nombre" })
      .min(3, {
        message: "Debe tener al menos 3 caracteres",
      }),
  })
  .required();
