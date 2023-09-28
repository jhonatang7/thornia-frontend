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

export function ProyectInitial() {
  const formInitial = useForm({});
  return (
    <div className="flex flex-col">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Inicia tu proyecto
      </h3>
      {/*
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <div className="flex flex-row space-x-2">
                    <Input {...field} />
                    <Button type="submit" variant="ghost">
                      Siguiente
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Este es el nombre que los demás verán en los proyectos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      */}
    </div>
  );
}
