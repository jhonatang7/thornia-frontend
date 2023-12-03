import { Menu, Loader2 } from "lucide-react";
import { NewArtifact } from "@/components/project/new-artifact";
import { ProjectSideBar } from "@/components/project/sidebar/project-sidebar";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getProject } from "@/services/software-projects-service";
import { ArtifactView } from "@/components/project/artifact-view";
import { Toaster } from "@/components/ui/toaster";
import { newArtifactPages } from "@/components/project/new-artifact-pages";
import { ProjectsMembersProvider } from "@/components/providers/project-members-provider";
import { TestPlanView } from "@/components/project/test-plan/test-plan-view";

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

  const projectPages = project === null ? null : newArtifactPages(project);

  const configByType =
    project === null
      ? null
      : {
          hltc: project.configurationHLTC,
          lltc: project.configurationLLTC,
          bug: project.configurationBugs,
        };

  return !router.isReady || projectRequestStatus === null ? (
    <div className="flex h-screen items-center">
      <Loader2 className="animate-spin m-auto" />
    </div>
  ) : (
    <ProjectsMembersProvider memberIds={project.memberIds}>
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
      <div className="flex flex-row">
        <ProjectSideBar
          showSidebar={showSidebar}
          toggleSidebarButtonVisibility={toggleSidebarButtonVisibility}
          projectId={router.query.id[0]}
          project={project}
          selectedArtifactId={router.query.item ? router.query.item : null}
          selectedArtifactType={router.query.type ? router.query.type : null}
        />
        {router.query.id.length == 2 && projectPages[router.query.id.at(1)]}
        {router.query.item && router.query.type && (
          <ArtifactView
            artifactId={router.query.item}
            type={router.query.type}
            config={configByType[router.query.type]}
            project={project}
          />
        )}
        {router.query.type === "testplan" && (
          <TestPlanView projectId={project.id} />
        )}
      </div>
      <Toaster />
    </ProjectsMembersProvider>
  );
}
