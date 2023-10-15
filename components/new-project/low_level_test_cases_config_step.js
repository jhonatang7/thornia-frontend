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
import { TestCaseFieldConfig } from "./test_case_field_config";
import { Plus } from "lucide-react";

export function LowLevelTestCasesConfigStep() {
  const [fields, setFields] = useState([
    {
      key: "Título",
      type: "text",
      required: true,
      options: [],
    },
    {
      key: "Estado",
      type: "selection",
      required: true,
      options: ["Por hacer", "En progreso", "Completo"],
    },
    {
      key: "Prioridad",
      type: "selection",
      required: false,
      options: ["Alta", "Media", "Baja"],
    },
    {
      key: "Responsable",
      type: "member",
      required: false,
      options: [],
    },
    {
      key: "Descripción",
      type: "text",
      required: false,
      options: [],
    },
    {
      key: "Precondiciones",
      type: "text",
      required: false,
      options: [],
    },
    {
      key: "Entradas",
      type: "text",
      required: false,
      options: [],
    },
    {
      key: "Pasos",
      type: "text",
      required: false,
      options: [],
    },
    {
      key: "Resutlados esperados",
      type: "text",
      required: false,
      options: [],
    },
    {
      key: "Tiempo estimado",
      type: "datetime",
      required: false,
      options: [],
    },
  ]);

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
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Configura tus casos de prueba de bajo nivel
      </h2>
      {/* <Table className="w-[39rem] overflow-x-auto"> */}
      <Card>
        <CardContent className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex flex-row justify-between items-center">
                  <span>Campo</span>
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
        <CardFooter className="flex justify-between">
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
