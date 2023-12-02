import { PlusSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TestPlanDialog } from "./test-plan-dialog";
import { getTestPlan, uploadTestPlan } from "@/services/test-plan-service";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "@/components/ui/button";

export function TestPlanView({ projectId }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [updateTestPlan, setUpdateTestPlan] = useState(null);
  const [testPlan, setTestPlan] = useState(null);
  const [isOpenDialogAlert, setIsOpenDialogAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewTestPlan, setHasNewTestPlan] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((file) => {
    if (file[0].type === "application/pdf") {
      setUpdateTestPlan(file[0]);
      setIsOpenDialogAlert(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: false,
  });

  const confirmDialog = async () => {
    setHasNewTestPlan(false);
    setIsLoading(true);
    setIsOpenDialogAlert(false);
    if (updateTestPlan != null && projectId !== undefined) {
      const { success } = await uploadTestPlan(updateTestPlan, projectId);
      if (success) {
        await loadTestPlan();
        toast({
          className: "bg-green-700 border border-b-green-700",
          title: "El test plan se actualizo!!! ;)",
        });
      } else {
        toast({
          variant: "destructive",
          title: "No se pudo actualizar el test plan :(",
        });
      }
    }
    setIsLoading(false);
  };

  const closeDialog = () => {
    setIsOpenDialogAlert(false);
    setUpdateTestPlan(null);
  };

  const loadTestPlan = async () => {
    setIsLoading(true);
    const { success, payload } = await getTestPlan(projectId);
    if (success) {
      setTestPlan(payload);
    }
    setIsLoading(false);
  };

  const showUpdateTestPlan = () => {
    setUpdateTestPlan(testPlan);
    setHasNewTestPlan(true);
  };

  const closeUpdateTestPlan = () => {
    loadTestPlan();
    setHasNewTestPlan(false);
  };

  useEffect(() => {
    loadTestPlan();
  }, []);

  return (
    <div className="grow p-2 h-screen max-h-screen">
      <div className="border rounded-lg min-h-full h-full max-h-full shadow-md overflow-y-auto">
        <div className="py-8 px-5 flex flex-col h-full max-w-lg md:max-w-3xl md:m-auto sm:px-16 space-y-4 ">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Test Plan
          </h2>
          <div className="flex justify-between items-center">
            <div className="flex justify-center">
              {testPlan ? (
                <div className="flex flex-col space-y-1">
                  {hasNewTestPlan ? (
                    <Button variant="outline" onClick={closeUpdateTestPlan}>
                      Volver
                    </Button>
                  ) : (
                    <>
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        ¿Quieres actualizar tu test plan?
                      </h4>
                      <Button variant="outline" onClick={showUpdateTestPlan}>
                        Actualizar Test Plan
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  No cuentas con un test Plan
                </h4>
              )}
            </div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {testPlan ? "v Temporal" : "Aún no tienes una versión"}
            </h4>
          </div>
          <section className="flex-1">
            {isLoading && (
              <div className="h-full border rounded-lg flex justify-center items-center">
                <div className="flex p-3 place-items-center border rounded-lg">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Esta cargando...
                  </p>
                </div>
              </div>
            )}
            {(!testPlan || hasNewTestPlan) && !isLoading && (
              <div
                {...getRootProps()}
                className="h-full border rounded-lg flex justify-center items-center"
              >
                <div className="flex flex-col px-3 place-items-center border rounded-lg max-w-lg h-1/4">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <div className="h-full w-full flex flex-col justify-center items-center">
                      <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Suelta los archivos aquí...
                      </p>
                    </div>
                  ) : (
                    <div className="h-full w-full flex flex-col justify-center items-center">
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Agrega tu Test Plan
                      </h4>
                      <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Arrastra un archivo pdf aqui o clickeame
                      </p>
                      <PlusSquare className="w-8 h-8" />
                    </div>
                  )}
                </div>
              </div>
            )}
            {testPlan && !hasNewTestPlan && !isLoading && (
              <div className="h-full border rounded-lg flex justify-center items-center">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <div className="w-full h-[750px]">
                    <Viewer
                      fileUrl={testPlan}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </div>
                </Worker>
              </div>
            )}
          </section>
          {isOpenDialogAlert && (
            <TestPlanDialog
              title={updateTestPlan.name}
              onConfirm={confirmDialog}
              onCancel={closeDialog}
              isOpen={isOpenDialogAlert}
              setOpen={setIsOpenDialogAlert}
            />
          )}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
