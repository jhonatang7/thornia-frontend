import * as zod from "zod";

export const signUpFormSchema = zod
  .object({
    name: zod
      .string({ required_error: "Introduce tu nombre" })
      .min(3, { message: "Debe tener al menos 3 caracteres" })
      .max(50, { message: "No debe pasar de 50 caracteres" }),
    email: zod
      .string({ required_error: "Introduce tu correo" })
      .email({ message: "Ingresa un correo válido" }),
    password: zod
      .string({ required_error: "Introduce una contraseña" })
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
