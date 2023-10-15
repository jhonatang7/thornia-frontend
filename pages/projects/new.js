import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectInitial } from "@/components/new-project/project-initial";
import { useState } from "react";
import { LowLevelTestCasesConfigStep } from "@/components/new-project/low_level_test_cases_config_step";

export default function NewProject() {
  const [step, setStep] = useState(0);
  const [projectData, setProjectData] = useState({});
  const componentsDictionary = [
    <LowLevelTestCasesConfigStep />,
    <ProjectInitial
      setStep={setStep}
      projectData={projectData}
      setProjectData={setProjectData}
    />,
  ];

  return (
    <main className="flex flex-col">
      <div className="flex my-12">
        <div className="basis-[10%]" />
        <Button
          variant="outline"
          className="basis-[10%] flex-none"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
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
