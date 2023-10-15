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
import { useEffect, useState } from "react";

export function TestCaseFieldConfig({
  index,
  field,
  removeField,
  updateField,
}) {
  const form = useForm({
    resolver: zodResolver(ArtifactConfigFieldsSchema),
    mode: "onChange",
    defaultValues: field,
  });

  const [selectionOptions, setSelectionOptions] = useState([...field.options]);

  const handleBlur = (e) => {
    updateField(index, { ...form.getValues(), options: selectionOptions });
  };

  const handleOptionsKeyUp = (e) => {
    if (e.key !== ",") return;

    let value = e.target.value;
    if (!value.trim() && selectionOptions.length === 0) return;

    if (e.key === ",") {
      let option = e.target.value.substring(0, value.indexOf(","));
      setSelectionOptions([...selectionOptions, option]);
      e.target.value = "";
      form.setValue("options", "");
    }
  };

  const handleOptionsKeyDown = (e) => {
    if (e.key !== "Backspace") return;
    let value = e.target.value;

    if (
      e.key === "Backspace" &&
      value.trim().length === 0 &&
      selectionOptions.length > 0
    ) {
      let lastValue = selectionOptions.at(-1);

      let updatedOptions = [...selectionOptions];
      updatedOptions.pop();
      setSelectionOptions(updatedOptions);

      console.log(lastValue);
      form.setValue("options", [lastValue + ","]);
      e.target.value = lastValue + ",";
    }
  };

  useEffect(() => {
    form.reset(field);
    form.trigger();
  }, [field]);

  return (
    <TableRow>
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
                      onBlur={handleBlur}
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
                    onValueChange={(event) => {
                      formField.onChange(event);
                      handleBlur();
                    }}
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
                      <SelectItem value="datetime">Tiempo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </TableCell>
      <TableCell className="max-w-xs">
        {form.watch("type") === "selection" ? (
          <>
            {selectionOptions.length > 0 && (
              <div className="flex flex-row space-x-1 flex-wrap mb-1">
                {selectionOptions.length > 0 &&
                  selectionOptions.map((option) => (
                    <Badge variant="secondary" className="mb-1">
                      {option}
                    </Badge>
                  ))}
              </div>
            )}

            {!field.required && (
              <Input
                type="text"
                placeholder="Opciones ( ' , ' para separar)"
                disabled={field.required}
                required={true}
                onBlur={handleBlur}
                onKeyUp={handleOptionsKeyUp}
                onKeyDown={handleOptionsKeyDown}
              />
            )}
          </>
        ) : (
          <div></div>
        )}
      </TableCell>
      <TableCell className="p-2">
        <Button
          variant="outline"
          size="icon"
          disabled={field.required}
          onClick={() => {
            handleBlur();
            removeField();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
