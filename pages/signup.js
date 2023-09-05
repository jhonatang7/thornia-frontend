import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { NextResponse } from "next/server";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { signUpFormSchema } from "@/schemas/sign-up-form-schema";
import { signUp } from "@/services/authentication-service";
import { saveValueToLocalStorage } from "@/services/local-storage-service";

export default function SignUp() {
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const { toast } = useToast();

  const signUpForm = useForm({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(signUpFormValues) {
    setIsRequestInProgress(true);
    delete signUpFormValues.confirmPassword;
    const { success, payload } = await signUp(signUpFormValues)

    if (success) {
      saveValueToLocalStorage(process.env.NEXT_PUBLIC_API_HOST, payload)
      setIsRequestInProgress(false);
      NextResponse.redirect('/index')
    }
    else {
      setIsRequestInProgress(false);
      toast({
        variant: "destructive",
        title: "Ups! Ocurrió un error inesperado, inténtalo de nuevo"
      })
    }
  }

  return (
    <div className="container mx-auto p-px md:p-4">
      <Button variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4 mb-1">
        Bienvenido a Thornia
      </h1>
      <h3 className="mb-6 text-center text-2xl">
        Crea una cuenta para iniciar
      </h3>

      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSubmit)}
          className="space-y-3 container max-w-md"
        >
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="correo@ejemplo.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirma tu contraseña</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isRequestInProgress}
          >
            {isRequestInProgress && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {isRequestInProgress ? (
              <span>Espera un momento...</span>
            ) : (
              <span>Crear cuenta</span>
            )}
          </Button>
        </form>
      </Form>
      <p className="text-center mt-2">
        ¿Ya tienes una cuenta?
        <Button variant="link" className="p-1 font-bold">
          Inicia sesión
        </Button>
      </p>
      <Toaster />
    </div>
  );
}
