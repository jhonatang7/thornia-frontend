import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectionArtifactField({
  field,
  updateArtifact,
  value,
  disabled,
}) {
  const handleChange = (value) => {
    updateArtifact({ key: field.key, value: value });
  };

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Select
        onValueChange={handleChange}
        defaultValue={value}
        disabled={disabled}
      >
        <SelectTrigger className="w-fit py-1 px-2 h-auto space-x-1 disabled:opacity-80 disabled:cursor-default">
          <SelectValue
            placeholder={"Selecciona un(a) " + field.key.toLowerCase()}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{field.key}</SelectLabel>
            {field.options.map((opt, index) => (
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
