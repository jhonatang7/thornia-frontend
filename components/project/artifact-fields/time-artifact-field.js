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
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue, input) => {
    setValue({ ...value, [input]: newValue });
  };

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Input
        onChange={(e) => handleChange(e.target.value, "quantity")}
        onBlur={() => updateArtifact({ key: field.key, value: value })}
        type="number"
        placeholder="0"
        className="h-auto px-2 py-1 disabled:opacity-80 disabled:cursor-text"
        value={value ? value.quantity : ""}
        disabled={disabled}
      />
      <Select
        onValueChange={(e) => {
          handleChange(e, "unit");
          updateArtifact({ key: field.key, value: value });
        }}
        value={value ? value.unit : ""}
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
