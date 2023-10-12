import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArtifactConfigFieldsSchema } from "@/schemas/artifact-config-fields-schema";
import { TestCaseFieldConfig } from "./test_case_field_config";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

export function LowLevelTestCasesConfigStep() {
  // let [increment, setIncrement] = useState(4);
  const [fields, setFields] = useState([
    {
      // id: 0,
      key: "Título",
      type: "text",
      required: true,
    },
    {
      // id: 1,
      key: "Estado",
      type: "selection",
      required: true,
      options: ["Por hacer", "En progreso", "Completo"],
    },
    {
      // id: 2,
      key: "Prioridad",
      type: "selection",
      required: false,
      options: ["Alta", "Media", "Baja"],
    },
    {
      // id: 3,
      key: "Responsable",
      type: "member",
      required: false,
    },
    {
      // id: 4,
      key: "Descripción",
      type: "text",
      required: false,
    },
  ]);

  // useEffect(() => {
  //   console.log(fields);
  // }, [fields]);

  const addField = () => {
    // setIncrement(increment++);
    setFields([
      ...fields,
      {
        // id: increment,
        key: "",
        type: "text",
        required: false,
      },
    ]);
  };

  const removeField = (index) => {
    //console.log(index);
    let newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
    //console.log(removedFields);
    //console.log(newFields);
    // setFields(fields.filter((a) => a.id !== index + 1));
  };

  const updateField = (index, field) => {
    console.log("NUEVOS VALORES DE FIELDS ESTADO PADRE");
    let newFields = [...fields];
    newFields.splice(index, 1, field);
    console.log(newFields);
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
          <Table className="overflow-x-auto">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="flex flex-row justify-between items-center">
                  <span>Campo</span>
                  <span>Tipo de dato</span>
                  <span>Opciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => {
                return (
                  <TestCaseFieldConfig
                    index={index}
                    field={field}
                    removeField={() => removeField(index)}
                    updateField={updateField}
                    key={"field-" + index}
                  />
                );
              })}
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
            <Button>Siguiente</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
