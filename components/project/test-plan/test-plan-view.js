import { PlusSquare } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function TestPlanView() {
  const onDrop = useCallback((file) => {
    console.log(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: false,
  });

  return (
    <div className="grow p-2 h-screen max-h-screen">
      <div className="border rounded-lg min-h-full h-full max-h-full shadow-md overflow-y-auto">
        <div className="py-8 px-5 flex flex-col h-full max-w-lg md:max-w-3xl md:m-auto sm:px-16 space-y-4 ">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Test Plan
          </h2>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                No cuentas con un test Plan
              </h4>
            </div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Version
            </h4>
          </div>
          <section className="flex-1">
            <div
              {...getRootProps()}
              className="h-full border rounded-lg justify-center items-center"
            >
              <div className="flex flex-col place-items-center border rounded-lg max-w-lg h-1/4">
                {/* <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Agrega tu Test Plan
                </h4>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Arrastra un archivo pdf aqui o clickeame
                </p>
                <PlusSquare className="w-24 h-24" /> */}
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div className="h-full w-full flex flex-col justify-center items-center">
                    <p className="">Suelta los archivos aquí...</p>
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
          </section>
        </div>
      </div>
    </div>
  );
}
