import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/schemas/sign-in-form-schema";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Head from "next/head";

export default function SignUp() {
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <main className="grid min-h-screen place-content-center p-px">
      <div className="mb-14 flex justify-center">
        <Avatar className=" w-32 h-32">
          <AvatarImage alt="Logo" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="mb-8 text-4xl font-bold text-center">
        Inicia sesión en Thornia
      </h1>
      <Form {...signInForm}>
        <form
          onSubmit={signInForm.handleSubmit(onSubmit)}
          className="space-y-8 mb-8 container max-w-md"
        >
          <FormField
            control={signInForm.control}
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
            control={signInForm.control}
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
          <Link href="/" passHref legacyBehavior>
            <a className="text-sm mt-1 font-medium hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </Link>
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
              <span>Iniciar sesión</span>
            )}
          </Button>
        </form>
      </Form>
      <div className="flex justify-center">
        <p className="mx-1 text-base font-normal">¿Aún no tienes una cuenta?</p>
        <Link href="/" passHref legacyBehavior>
          <a className="text-base font-medium hover:underline">Regístrate</a>
        </Link>
      </div>
    </main>
  );
}
