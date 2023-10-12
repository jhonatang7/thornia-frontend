import { ArtifactConfigFieldsSchema } from "@/schemas/artifact-config-fields-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";

export function TestCaseFieldConfig({
  index,
  field,
  removeField,
  updateField,
}) {
  console.log(field);
  const form = useForm({
    resolver: zodResolver(ArtifactConfigFieldsSchema),
    mode: "onChange",
    defaultValues: field,
  });

  // useEffect(() => {
  // console.log("USE EFFECT VALORES FORM");
  // console.log(form.getValues());
  // if (form.formState.isValid) {
  // updateField(index, form.getValues());
  // }
  // }, [form.watch("key"), form.watch("type"), form.watch("options")]);

  useEffect(() => {
    form.reset(field);
  }, [field]);

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell className="font-medium p-2">
        <Form {...form}>
          <form className="flex flex-row space-x-5">
            <FormField
              control={form.control}
              name="key"
              render={({ field: formField }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...formField}
                      type="text"
                      placeholder="Nombre del campo"
                      disabled={field.required}
                      required={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="type"
              render={({ field: formField }) => (
                <FormItem>
                  <Select
                    disabled={field.required}
                    onValueChange={formField.onChange}
                    value={formField.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de dato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="numeric">Numérico</SelectItem>
                      <SelectItem value="selection">Selección</SelectItem>
                      <SelectItem value="member">Miembro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
            {form.watch("type") === "selection" ? (
              <FormField
                control={form.control}
                name="options"
                render={({ field: formField }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...formField}
                        type="text"
                        placeholder="Opciones de selección"
                        disabled={field.required}
                        required={true}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            ) : (
              <div></div>
            )}
          </form>
        </Form>
      </TableCell>
      <TableCell className="p-2">
        <Button
          variant="outline"
          size="icon"
          disabled={field.required}
          onClick={() => {
            updateField(index, form.getValues());
            removeField();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
