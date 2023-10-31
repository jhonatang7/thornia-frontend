import * as zod from "zod";

export const ArtifactConfigFieldsSchema = zod.object({
  key: zod
    .string({ required_error: "Proporciona un nombre para el campo" })
    .trim()
    .min(1, {
      message: "*Obligatorio",
    }),
  type: zod.enum(["numeric", "text", "selection", "member", "datetime"]),
  required: zod.boolean(),
  options: zod.optional(zod.array(zod.string())),
});
