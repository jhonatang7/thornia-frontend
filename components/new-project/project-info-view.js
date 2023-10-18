import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { projectInitialSchema } from "@/schemas/new-project-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

export function ProjectInfoView({ goToNextStep, updateProjectData }) {
  const formProjectInitial = useForm({
    resolver: zodResolver(projectInitialSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      projectPrefix: "",
    },
  });

  useEffect(() => {
    const { projectName } = formProjectInitial.getValues();
    let words = projectName.split(" ");
    let prefix = words.at(0).substring(0, 3);
    words = words.filter((word) => word.length > 0);

    if (words.length == 2) {
      prefix = words.at(0).substring(0, 1) + words.at(1).substring(0, 2);
    } else if (words.length > 2) {
      prefix =
        words.at(0).substring(0, 1) +
        words.at(1).substring(0, 1) +
        words.at(2).substring(0, 1);
    }

    prefix = prefix.toUpperCase();
    formProjectInitial.setValue("projectPrefix", prefix);
  }, [formProjectInitial.watch("projectName")]);

  const onSubmit = (values) => {
    updateProjectData(values);
    goToNextStep();
  };

  return (
    <div className="grow flex flex-col max-w-sm">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Inicia tu proyecto
      </h2>
      {
        <Form {...formProjectInitial}>
          <form
            onSubmit={formProjectInitial.handleSubmit(onSubmit)}
            className="mx-auto w-full"
          >
            <FormField
              control={formProjectInitial.control}
              name="projectName"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Nombre del proyecto</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mi grandioso proyecto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formProjectInitial.control}
              name="projectPrefix"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Prefijo identificador</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="MGP" />
                  </FormControl>
                  <FormDescription>
                    Una sigla que distinga tu proyecto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" variant="Ghost">
                Siguiente
              </Button>
            </div>
          </form>
        </Form>
      }
    </div>
  );
}
