import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectInitial } from "@/components/new-project/project-initial";
import { IntroductionStatesMaps } from "@/components/new-project/introduction-states-maps";
import { useEffect, useState } from "react";
import { LowLevelTestCasesConfigView } from "@/components/new-project/low-level-test-cases-config-view";
import { HighLevelTestCasesConfigView } from "@/components/new-project/high-level-test-cases-config-view";
import { BugsConfigView } from "@/components/new-project/bugs-config-view";
import { ProjectMembersAdditionView } from "@/components/new-project/project-members-addition-view";

export default function NewProject() {
  const [step, setStep] = useState(0);
  const [projectData, setProjectData] = useState({});

  const updateProjectData = (newData) => {
    setProjectData({ ...projectData, ...newData });
  };

  useEffect(() => console.log(projectData), [projectData]);

  const componentsDictionary = [
    <ProjectInitial
      goToNextStep={() => setStep(1)}
      updateProjectData={updateProjectData}
    />,
    <LowLevelTestCasesConfigView
      goToNextStep={() => setStep(2)}
      updateProjectData={updateProjectData}
    />,
    <HighLevelTestCasesConfigView
      goToNextStep={() => setStep(3)}
      updateProjectData={updateProjectData}
    />,
    <BugsConfigView
      goToNextStep={() => setStep(4)}
      updateProjectData={updateProjectData}
    />,
    <IntroductionStatesMaps goToNextStep={() => setStep(5)} />,
    <ProjectMembersAdditionView
      goToNextStep={() => setStep(6)}
      updateProjectData={updateProjectData}
    />,
  ];

  return (
    <main className="flex flex-col">
      <div className="flex my-12">
        <div className="basis-[10%]" />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Paso {step + 1}/6
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
