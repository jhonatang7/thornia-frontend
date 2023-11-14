import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function NumericArtifactField({
  field,
  updateArtifact,
  defaultValue,
  disabled,
}) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (e) => {
    updateArtifact({ key: field.key, value: e.target.value });
  };

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Input
        type="number"
        placeholder="0"
        className="h-auto px-2 py-1 disabled:opacity-80 disabled:cursor-text"
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}
