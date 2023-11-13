import { Button } from "../ui/button";
import { SelectionArtifactField } from "./artifact-fields/selection-artifact-field";
import { MemberArtifactField } from "./artifact-fields/member-artifact-field";
import { TextArtifactField } from "./artifact-fields/text-artifact-field";
import { NumericArtifactField } from "./artifact-fields/numeric-artifact-field";
import { TimeArtifactField } from "./artifact-fields/time-artifact-field";

export function NewArtifact({ project, config, title }) {
  return (
    <div className="grow py-8 px-5">
      <div className="flex flex-col max-w-lg md:max-w-xl md:m-auto sm:px-16 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Nuevo {title}</p>
          <p
            contentEditable
            before="Título"
            className="empty:before:content-[attr(before)] empty:before:text-muted-foreground border-0 focus:border-input text-3xl font-semibold tracking-tight resize-none mt-2 pl-0 p-1.5 hover:bg-accent rounded-md"
          ></p>
        </div>

        {config.slice(1).map((e, index) => (
          <div key={e + index}>
            {e.type === "member" && (
              <MemberArtifactField field={e} members={project.memberIds} />
            )}

            {e.type === "selection" && <SelectionArtifactField field={e} />}
            {e.type === "text" && <TextArtifactField field={e} />}
            {e.type === "numeric" && <NumericArtifactField field={e} />}
            {e.type === "datetime" && <TimeArtifactField field={e} />}
          </div>
        ))}

        <div className="flex flex-row justify-end space-x-2">
          <Button variant="ghost">Cancelar</Button>
          <Button>Guardar</Button>
        </div>
      </div>
    </div>
  );
}
