import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { restorePasswordFormSchema } from "@/schemas/restore-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { restorePassword } from "@/services/authentication-service";
import { useRouter } from "next/router";

export default function RestorePassword() {
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [isRequestSuccess, setisRequestSuccess] = useState(true);
  const { query } = useRouter();
  const { toast } = useToast();

  const restorePasswordForm = useForm({
    resolver: zodResolver(restorePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (restorePasswordValues) => {
    console.log(query);
    console.log(query.t);
    setIsRequestInProgress(true);
    const { success } = await restorePassword(
      restorePasswordValues,
      query.t
    );
    setIsRequestInProgress(false);
    if (success) {
      setisRequestSuccess(true);
    } else {
      let message =
        "Ups! Ocurrió un error, verifica que tu enlace aun es vigente";
      toast({
        variant: "destructive",
        title: message,
      });
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="border border-gray-300 p-4 m-4 rounded-lg min-w-min max-w-lg w-full">
        {isRequestSuccess ? (
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors text-center first:mt-0">
            La contraseña se actualizo con éxito!
            <br />
            Inicie sesión para continuar
          </h2>
        ) : (
          <>
            <h2 className="scroll-m-20 pb-9 text-3xl font-semibold tracking-tight transition-colors text-center first:mt-0">
              Actualiza tu contraseña
            </h2>
            <Form {...restorePasswordForm}>
              <form
                onSubmit={restorePasswordForm.handleSubmit(onSubmit)}
                className="mb-2 container max-w-md"
              >
                <FormField
                  control={restorePasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Contraseña </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={restorePasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-9">
                      <FormLabel>Confirmar Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  {isRequestInProgress && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  {isRequestInProgress ? (
                    <span>Espera un momento...</span>
                  ) : (
                    <span>Actualizar contraseña</span>
                  )}
                </Button>
              </form>
            </Form>
            <Toaster />
          </>
        )}
      </div>
    </main>
  );
}
