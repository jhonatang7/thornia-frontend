import * as zod from "zod";

export const restorePasswordFormSchema = zod
  .object({
    password: zod
      .string({ required_error: "Introduce tu nueva contraseña" })
      .regex(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/, {
        message:
          "Debe tener al menos 6 caracteres, una letra, un dígito, un caracter especial",
      }),
    confirmPassword: zod.string({ required_error: "Reescribe tu contraseña" }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });