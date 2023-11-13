import { NewArtifact } from "@/components/project/new-artifact";

export const newArtifactPages = (project) => {
  return {
    newhltc: (
      <NewArtifact
        project={project}
        config={project.configurationHLTC}
        type="HLTC"
        title="Caso de Prueba de Alto Nivel"
      />
    ),
    newlltc: (
      <NewArtifact
        project={project}
        config={project.configurationLLTC}
        type="LLTC"
        title="Caso de Prueba de Bajo Nivel"
      />
    ),
    newbug: (
      <NewArtifact
        project={project}
        config={project.configurationBugs}
        type="BUG"
        title="Error (bug)"
      />
    ),
  };
};
