import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export function TextArtifactField({
  field,
  updateArtifact,
  defaultValue,
  disabled,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleBlur = (e) => {
    updateArtifact({ key: field.key, value: e.target.value });
  };

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <div className="flex flex-col space-y-2">
      <p className="font-semibold">{field.key}</p>
      <Textarea
        placeholder={"Escribe tu(s) " + field.key.toLowerCase()}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        value={value}
        disabled={disabled}
        className="disabled:cursor-text disabled:opacity-80"
      />
    </div>
  );
}
