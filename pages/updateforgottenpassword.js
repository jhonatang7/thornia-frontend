import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { updateForgottenPasswordFormSchema } from "@/schemas/restore-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateForgottenPassword } from "@/services/authentication-service";
import { useRouter } from "next/router";

export default function UpdateForgottenPassword() {
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const { query } = useRouter();
  const { toast } = useToast();

  const updateForgottenPasswordForm = useForm({
    resolver: zodResolver(updateForgottenPasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (updateForgottenPasswordValues) => {
    setIsRequestInProgress(true);
    const { success } = await updateForgottenPassword(
      updateForgottenPasswordValues,
      query.t
    );
    setIsRequestInProgress(false);
    if (success) {
      setIsRequestSuccess(true);
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
      <div className="border border-gray-300 p-8 pt-7 rounded-xl min-w-min max-w-lg w-full">
        {isRequestSuccess ? (
          <>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors text-center first:mt-0">
              ¡Tu contraseña se actualizó exitosamente!
            </h2>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mt-4">
              <Link href="/signin" passHref legacyBehavior>
                <a className="font-bold underline mr-1.5">Inicia sesión</a>
              </Link>
              en Thornia para continuar
            </h4>
          </>
        ) : (
          <>
            <h2 className="scroll-m-20 pb-9 text-3xl font-semibold tracking-tight transition-colors text-center first:mt-0">
              Actualiza tu contraseña
            </h2>
            <Form {...updateForgottenPasswordForm}>
              <form
                onSubmit={updateForgottenPasswordForm.handleSubmit(onSubmit)}
                className="w-full"
              >
                <FormField
                  control={updateForgottenPasswordForm.control}
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
                  control={updateForgottenPasswordForm.control}
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
