import * as zod from "zod";

export const signInFormSchema = zod
  .object({
    email: zod
      .string({ required_error: "Introduce tu correo" })
      .email({ message: "Ingresa un correo válido" }),
    password: zod
      .string({ required_error: "Introduce tu contraseña" })
      .regex(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/, {
        message:
          "Debe tener al menos 6 caracteres, una letra, un dígito, un caracter especial",
      }),
  })
  .required();