import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TestCaseFieldConfig } from "./artifact-field-config";
import { Plus } from "lucide-react";
import { lowLevelTestCasesDefaultValues } from "./artifacts-default-values";
import { ArtifactConfigFieldsSchema } from "@/schemas/artifact-config-fields-schema";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function LowLevelTestCasesConfigView({
  goToNextStep,
  updateProjectData,
  goToPreviousStep,
}) {
  const { toast } = useToast();
  const [fields, setFields] = useState(lowLevelTestCasesDefaultValues);

  const addField = () => {
    setFields([
      ...fields,
      {
        key: "",
        type: "text",
        required: false,
        options: [],
      },
    ]);
  };

  const removeField = (index) => {
    let newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const updateField = (index, field) => {
    let newFields = [...fields];
    newFields.splice(index, 1, field);
    setFields(newFields);
  };

  const onSubmit = () => {
    let thereAreEmptyFields = false;
    let thereAreDuplicateFields = false;

    fields.forEach((item) => {
      let { success } = ArtifactConfigFieldsSchema.safeParse(item);
      if (!success) {
        thereAreEmptyFields = true;
      }

      if (item.type === "selection" && item.options.length === 0) {
        thereAreEmptyFields = true;
      }

      let coincidences = fields.filter(
        (field) => field.key.toLowerCase() === item.key.toLowerCase()
      );

      if (coincidences.length > 1) {
        thereAreDuplicateFields = true;
      }
    });

    if (thereAreEmptyFields) {
      toast({
        variant: "destructive",
        title: "Asegúrate de que no tienes campos vacíos",
        description: "Revisa los nombres y opciones de tus campos",
      });
      return;
    }

    if (thereAreDuplicateFields) {
      toast({
        variant: "destructive",
        title: "Asegúrate de que no tienes campos duplicados",
        description: "Los nombres para cada campo deben ser únicos",
      });
      return;
    }

    updateProjectData({ configurationLLTC: fields });
    goToNextStep();
  };

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Configura tus Casos de Prueba de Bajo Nivel (LLTC)
      </h2>
      <p className="pb-4 text-muted-foreground">
        Predefinimos esta estructura para ti, siéntete libre de modificarla
      </p>
      <Card className="p-2 w-[44rem]">
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          <Table>
            <TableHeader className="static">
              <TableRow>
                <TableHead className="items-center">
                  <span className="mr-40">Campo</span>
                  <span>Tipo de dato</span>
                </TableHead>
                <TableHead className="text-right">Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TestCaseFieldConfig
                  index={index}
                  field={field}
                  removeField={() => removeField(index)}
                  updateField={updateField}
                  key={"field-" + index}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between p-2">
          <Button variant="subtle" onClick={goToPreviousStep}>
            Atrás
          </Button>
          <div>
            <Button variant="outline" className="mr-2" onClick={addField}>
              {/* <Plus className="mr-2 h-4" /> */}
              Añadir campo
            </Button>
            <Button onClick={onSubmit}>Siguiente</Button>
          </div>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
