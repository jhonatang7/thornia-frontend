import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function TimeArtifactField({ field, updateArtifact }) {
  const onBlur = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Input
        onBlur={onBlur}
        type="number"
        placeholder="0"
        className="h-auto px-2 py-1"
      />
      <Select>
        <SelectTrigger className="w-fit py-1 px-2 h-auto space-x-1">
          <SelectValue placeholder="Unidad" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Unidad</SelectLabel>
            <SelectItem value="hour">Hora(s)</SelectItem>
            <SelectItem value="minute">Minuto(s)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
