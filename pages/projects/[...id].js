import { Menu, Loader2 } from "lucide-react";
import { NewArtifact } from "@/components/project/new-artifact";
import { ProjectNavBar } from "@/components/project/project-navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getProject } from "@/services/software-projects-service";
import { ArtifactView } from "@/components/project/artifact-view";
import { Toaster } from "@/components/ui/toaster";

export default function ProjectById() {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [project, setProject] = useState(null);
  const [projectRequestStatus, setProjectRequestStatus] = useState(null);
  const sidebarButtonRef = useRef(null);

  useEffect(() => {
    if (!router.isReady) return;

    async function requestProject() {
      let { success, project } = await getProject(router.query.id[0]);
      setProjectRequestStatus(success);
      if (success) setProject(project);
    }

    requestProject();
  }, [router]);

  const toggleSidebarButtonVisibility = () => {
    sidebarButtonRef.current.classList.toggle("hidden");
  };

  const projectPages =
    project === null
      ? null
      : {
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

  return !router.isReady || projectRequestStatus === null ? (
    <div className="flex h-screen items-center">
      <Loader2 className="animate-spin m-auto" />
    </div>
  ) : (
    <>
      <Button
        size="icon"
        className="absolute top-4 right-4 lg:hidden"
        ref={sidebarButtonRef}
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
      >
        <Menu />
      </Button>
      <div className="flex flex-row-reverse">
        <ProjectNavBar
          showSidebar={showSidebar}
          toggleSidebarButtonVisibility={toggleSidebarButtonVisibility}
          projectId={router.query.id[0]}
        />
        {router.query.id.length == 2 && projectPages[router.query.id.at(1)]}
        {router.query.item && router.query.type && (
          <ArtifactView
            artifactId={router.query.item}
            type={router.query.type}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}
