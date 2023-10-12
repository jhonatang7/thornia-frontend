import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useState } from "react";
import { ArtifactConfigFieldsSchema } from "@/schemas/artifact-config-fields-schema";
import { TestCaseFieldConfig } from "./test_case_field_config";

export function LowLevelTestCasesConfigStep() {
  const [fields, setFields] = useState([
    ArtifactConfigFieldsSchema.parse({
      key: "Título",
      type: "text",
      required: true,
    }),
    ArtifactConfigFieldsSchema.parse({
      key: "Estado",
      type: "selection",
      required: true,
      options: ["Por hacer", "En progreso", "Completo"],
    }),
    ArtifactConfigFieldsSchema.parse({
      key: "Prioridad",
      type: "selection",
      required: false,
      options: ["Alta", "Media", "Baja"],
    }),
    ArtifactConfigFieldsSchema.parse({
      key: "Responsable",
      type: "member",
      required: false,
    }),
    ArtifactConfigFieldsSchema.parse({
      key: "Descripción",
      type: "text",
      required: false,
    }),
  ]);

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Configura tus casos de prueba de bajo nivel
      </h2>
      {/* <Table className="w-[39rem] overflow-x-auto"> */}
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
          {fields.map((field, index) => (
            <TestCaseFieldConfig field={field} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
