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

export function MemberArtifactField({
  field,
  members,
  updateArtifact,
  defaultValue,
  disabled,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (value) => {
    setValue(value);
    updateArtifact({ key: field.key, value: value });
  };

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Select onValueChange={handleChange} value={value} disabled={disabled}>
        <SelectTrigger className="w-fit py-1 px-2 h-auto space-x-1 disabled:opacity-80 disabled:cursor-default">
          <SelectValue
            placeholder={"Selecciona un(a) " + field.key.toLowerCase()}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{field.key}</SelectLabel>
            {members.map((opt, index) => (
              <SelectItem value={opt} key={opt + index}>
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
