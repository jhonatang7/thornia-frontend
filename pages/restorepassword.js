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
import { restorePasswordSchema } from "@/schemas/restore-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { restorePassword } from "@/services/authentication-service";

export default function RestorePassword() {
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const { toast } = useToast();
  const restorePasswordForm = useForm({
    resolver: zodResolver(restorePasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (restorePasswordValues) => {
    setIsRequestInProgress(true);
    const { success } = await restorePassword(restorePasswordValues);
    setIsRequestInProgress(false);
    if (success) {
      setIsRequestSuccess(true);
    } else {
      let message =
        "Ups! Ocurrió un error, vuelva a intentarlo dentro de un momento";
      toast({
        variant: "destructive",
        title: message,
      });
    }
  };
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="border border-gray-300 p-8 pt-6 rounded-xl min-w-min max-w-lg w-full">
        {isRequestSuccess ? (
          <>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors text-center first:mt-0">
              ¡Operación finalizada!
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mt-2">
              Te enviamos un correo electrónico para que puedas restaurar tu
              contraseña
            </h4>
          </>
        ) : (
          <>
            <h2 className="scroll-m-20 pb-6 text-3xl font-semibold tracking-tight transition-colors text-center first:mt-0">
              Recupera tu contraseña
            </h2>
            <Form {...restorePasswordForm}>
              <form
                onSubmit={restorePasswordForm.handleSubmit(onSubmit)}
                className="w-full"
              >
                <FormField
                  control={restorePasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="correo@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isRequestInProgress}
                >
                  {isRequestInProgress && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}

                  {isRequestInProgress ? (
                    <span>Espera un momento...</span>
                  ) : (
                    <span>Enviar</span>
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
