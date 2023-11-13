import { Textarea } from "@/components/ui/textarea";

export function TextArtifactField({ field }) {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-semibold">{field.key}</p>
      <Textarea placeholder={"Escribe tu(s) " + field.key.toLowerCase()} />
    </div>
  );
}
