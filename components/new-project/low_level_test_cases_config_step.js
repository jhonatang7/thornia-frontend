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
  const [fields, setFields] = useState([
    {
      key: "Título",
      type: "text",
      required: true,
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
    },
    ,
    {
      key: "Descripción",
      type: "text",
      required: false,
    },
  ]);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const addField = () => {
    let newFields = [
      ...fields,
      {
        key: "",
        type: "text",
        required: false,
      },
    ];
    setFields(newFields);
  };

  const removeField = (index) => {
    console.log(index);
    let newFields = [...fields];
    let removedFields = newFields.splice(index, 1);
    console.log(removedFields);
    console.log(newFields);
    setFields(newFields);
  };

  const updateField = (index, field) => {
    console.log("NUEVOS VALORES DE FIELDS ESTADO PADRE");
    let newFields = [...fields];
    newFields.splice(index, 1, field);
    console.log(newFields);
    setFields(newFields);
  };

  const [elements, setElements] = useState(
    fields.map((field, index) => (
      <TestCaseFieldConfig
        field={field}
        index={index}
        removeField={() => removeField(index)}
        updateField={updateField}
        key={"field-" + index}
      />
    ))
  );

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
            <TableBody>{elements}</TableBody>
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
