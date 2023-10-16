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
import { highLevelTestCasesDefaultValues } from "./artifacts-default-values";

export function HighLevelTestCasesConfigView() {
  const [fields, setFields] = useState(highLevelTestCasesDefaultValues);

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

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Configura tus Casos de Prueba de Alto Nivel (HLTC)
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
          <Button variant="subtle">Atrás</Button>
          <div>
            <Button variant="outline" className="mr-2" onClick={addField}>
              {/* <Plus className="mr-2 h-4" /> */}
              Añadir campo
            </Button>
            <Button onClick={() => console.log(fields)}>Siguiente</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
