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

export function LowLevelTestCasesConfigStep() {
  const [fields, setFields] = useState([
    {
      key: "ID",
      type: "numeric",
      required: true,
    },
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
    {
      key: "Descripción",
      type: "text",
      required: false,
    },
  ]);

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Configura tus casos de prueba de bajo nivel
      </h2>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Campo</TableHead>
            <TableHead>Tipo de dato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.key}>
              <TableCell className="font-medium">
                <Input
                  type="text"
                  placeholder="Field name"
                  value={field.key}
                  disabled={field.required}
                  required={true}
                />
              </TableCell>
              <TableCell>
                <Select value={field.type} disabled={field.required}>
                  <SelectTrigger>
                    <SelectValue placeholder="Field data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="numeric">Numérico</SelectItem>
                    <SelectItem value="selection">Selección</SelectItem>
                    <SelectItem value="member">Miembro</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              {field.options ? (
                <TableCell className="font-medium">
                  <Input
                    type="text"
                    placeholder="Field name"
                    value={field.options}
                    disabled={field.required}
                    required={true}
                  />
                </TableCell>
              ) : (
                <div></div>
              )}
              <TableCell>
                <Button variant="outline" size="icon" disabled={field.required}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
