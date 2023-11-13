import { Input } from "@/components/ui/input";

export function NumericArtifactField({ field }) {
  return (
    <div className="flex flex-row items-center space-x-3">
      <p className="font-semibold">{field.key}</p>
      <Input type="number" placeholder="0" className="h-auto px-2 py-1" />
    </div>
  );
}
