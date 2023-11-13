import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MemberArtifactField({ field, members, updateArtifact }) {
  const handleChange = (value) => {
    updateArtifact({ key: field.key, value: value });
  };

  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-fit py-1 px-2 h-auto space-x-1">
          <SelectValue
            placeholder={"Selecciona un(a) " + field.key.toLowerCase()}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{field.key}</SelectLabel>
            {members.map((opt, index) => (
              <SelectItem
                value={opt.toLowerCase().replace(" ", "-")}
                key={opt + index}
              >
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
