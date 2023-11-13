import { Textarea } from "@/components/ui/textarea";

export function TextArtifactField({ field, updateArtifact }) {
  const handleChange = (e) => {
    updateArtifact({ key: field.key, value: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-2">
      <p className="font-semibold">{field.key}</p>
      <Textarea
        placeholder={"Escribe tu(s) " + field.key.toLowerCase()}
        onBlur={handleChange}
      />
    </div>
  );
}
