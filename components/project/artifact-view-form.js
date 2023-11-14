import { SelectionArtifactField } from "./artifact-fields/selection-artifact-field";
import { MemberArtifactField } from "./artifact-fields/member-artifact-field";
import { TextArtifactField } from "./artifact-fields/text-artifact-field";
import { NumericArtifactField } from "./artifact-fields/numeric-artifact-field";
import { TimeArtifactField } from "./artifact-fields/time-artifact-field";

export function ArtifactViewForm({
  config,
  values,
  editing,
  project,
  updateArtifactFields,
}) {
  return config.slice(1).map((e, index) => (
    <div key={e + index}>
      {e.type === "member" && (
        <MemberArtifactField
          field={e}
          members={project.memberIds}
          updateArtifact={updateArtifactFields}
          defaultValue={values[e.key]}
          disabled={!editing}
        />
      )}

      {e.type === "selection" && (
        <SelectionArtifactField
          field={e}
          updateArtifact={updateArtifactFields}
          defaultValue={values[e.key]}
          disabled={!editing}
        />
      )}

      {e.type === "text" && (
        <TextArtifactField
          field={e}
          updateArtifact={updateArtifactFields}
          defaultValue={values[e.key]}
          disabled={!editing}
        />
      )}

      {e.type === "numeric" && (
        <NumericArtifactField
          field={e}
          updateArtifact={updateArtifactFields}
          value={values[e.key]}
          disabled={!editing}
        />
      )}

      {e.type === "datetime" && (
        <TimeArtifactField
          field={e}
          updateArtifact={updateArtifactFields}
          defaultValue={values[e.key]}
          disabled={!editing}
        />
      )}
    </div>
  ));
}
