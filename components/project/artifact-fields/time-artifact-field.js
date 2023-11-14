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

export function TimeArtifactField({
  field,
  updateArtifact,
  defaultValue,
  disabled,
}) {
  const [value, setValue] = useState(defaultValue ? defaultValue : {});

  const handleChange = (newValue, input) => {
    setValue({ ...value, [input]: newValue });
  };

  useEffect(() => {
    updateArtifact({ key: field.key, value: value });
  }, [value]);

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Input
        onBlur={(e) => handleChange(e.target.value, "quantity")}
        type="number"
        placeholder="0"
        className="h-auto px-2 py-1 disabled:opacity-80 disabled:cursor-text"
        defaultValue={defaultValue ? defaultValue.quantity : undefined}
        disabled={disabled}
      />
      <Select
        onValueChange={(e) => handleChange(e, "unit")}
        defaultValue={defaultValue ? defaultValue.unit : undefined}
        disabled={disabled}
      >
        <SelectTrigger className="w-fit py-1 px-2 h-auto space-x-1 disabled:opacity-80 disabled:cursor-default">
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
