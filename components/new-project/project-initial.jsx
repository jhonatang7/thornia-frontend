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

export function ProjectInitial() {
  const formProjectInitial = useForm({
    resolver: zodResolver(projectInitialSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      projectPrefix: "",
    },
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="grow flex flex-col max-w-sm">
      <h3 className="flex-none mb-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        Inicia tu proyecto
      </h3>
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
            <Button type="submit" variant="Ghost">Siguiente</Button>
            </div>
          </form>
        </Form>
      }
    </div>
  );
}
