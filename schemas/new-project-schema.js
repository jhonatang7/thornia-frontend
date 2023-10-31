import * as zod from "zod";

export const projectInitialSchema = zod
  .object({
    name: zod
      .string({ required_error: "Introduce un nombre para el proyecto" })
      .trim()
      .min(3, { message: "Debe tener al menos 3 caracteres" })
      .max(25, { message: "No debe pasar de 25 caracteres" }),
    prefix: zod
      .string({ required_error: "Introduce un prefijo para tu proyecto" })
      .trim()
      .toUpperCase()
      .min(2, { message: "Debe tener al menos 2 caracteres" })
      .max(5, { message: "No debe pasar de 5 caracteres" }),
  })
  .required();
