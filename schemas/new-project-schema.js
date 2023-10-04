import * as zod from "zod";

export const projectInitialSchema = zod.object({
  projectName: zod
    .string({ required_error: "Introduce un nombre para el proyecto" })
    .min(3, { message: "Debe tener al menos 3 caracteres" })
    .max(20, { message: "No debe pasar de 20 caracteres" }),
  projectPrefix: zod
    .string({ required_error: "Introduce un prefijo para tu proyecto" })
    .min(2, { message: "Debe tener al menos 2 caracteres" })
    .max(5, { message: "No debe pasar de 5 caracteres" }),
})
.required();
