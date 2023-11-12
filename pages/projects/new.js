import { ProjectInfoView } from "@/components/new-project/project-info-view";
import { IntroductionStatesMaps } from "@/components/new-project/introduction-states-maps";
import { useEffect, useState } from "react";
import { LowLevelTestCasesConfigView } from "@/components/new-project/low-level-test-cases-config-view";
import { HighLevelTestCasesConfigView } from "@/components/new-project/high-level-test-cases-config-view";
import { BugsConfigView } from "@/components/new-project/bugs-config-view";
import { ProjectMembersAdditionView } from "@/components/new-project/project-members-addition-view";
import { createProject } from "@/services/software-projects-service";
import {
  ProjectCreationFailedMessage,
  ProjectSuccessfullyCreatedMessage,
} from "@/components/new-project/project-creation-completed-message";

export default function NewProject() {
  const [step, setStep] = useState(0);
  const [projectData, setProjectData] = useState({});
  const [projectSuccessfullyCreated, setProjectSuccessfullyCreated] =
    useState(null);

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const updateProjectData = (newData) => {
    setProjectData({ ...projectData, ...newData });
  };

  useEffect(() => console.log(projectData), [projectData]);
  useEffect(() => {
    const lastStep = 6;
    if (step !== lastStep) return;
    async function sendRequest() {
      let response = await createProject(projectData);
      return response;
    }

    sendRequest()
      .then((response) => {
        console.log(response.success);
        setProjectSuccessfullyCreated(response.success);
      })
      .catch((_) => {
        setProjectSuccessfullyCreated(false);
      });
  }, [step]);

  const componentsDictionary = [
    <ProjectInfoView
      goToNextStep={() => setStep(1)}
      updateProjectData={updateProjectData}
    />,
    <LowLevelTestCasesConfigView
      goToNextStep={() => setStep(2)}
      updateProjectData={updateProjectData}
      goToPreviousStep={goToPreviousStep}
    />,
    <HighLevelTestCasesConfigView
      goToNextStep={() => setStep(3)}
      updateProjectData={updateProjectData}
      goToPreviousStep={goToPreviousStep}
    />,
    <BugsConfigView
      goToNextStep={() => setStep(4)}
      updateProjectData={updateProjectData}
      goToPreviousStep={goToPreviousStep}
    />,
    <IntroductionStatesMaps
      goToNextStep={() => setStep(5)}
      goToPreviousStep={goToPreviousStep}
    />,
    <ProjectMembersAdditionView
      updateProjectData={updateProjectData}
      goToNextStep={() => setStep(6)}
      goToPreviousStep={goToPreviousStep}
    />,
    <div>
      {projectSuccessfullyCreated === true && (
        <ProjectSuccessfullyCreatedMessage projectData={projectData} />
      )}
      {projectSuccessfullyCreated === false && <ProjectCreationFailedMessage />}
      {projectSuccessfullyCreated === null && (
        <h3 className="text-center scroll-m-20 text-2xl tracking-tight max-w-md">
          Tu proyecto está en proceso de crearse, aguarda un momento y no salgas
          de esta página, por favor :)
        </h3>
      )}
    </div>,
  ];

  return (
    <main className="flex flex-col">
      <div className="flex my-12">
        <div className="basis-[10%]" />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Paso {step + 1}/7
        </h3>
        <h1 className="basis-[70%] text-end scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Nuevo proyecto
        </h1>
        <div className="basis-[10%]" />
      </div>
      <div className="flex justify-center w-full ">
        {componentsDictionary[step]}
      </div>
    </main>
  );
}

NewProject.requireAuth = true;
