import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { md5 } from "@/utils/md5";

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

const signUpFormSchema = zod
  .object({
    name: zod
      .string({ required_error: "Introduce tu nombre" })
      .min(3, { message: "Debe tener al menos 3 caracteres" })
      .max(50, { message: "No debe pasar de 50 caracteres" }),
    email: zod
      .string({ required_error: "Introduce tu correo" })
      .email({ message: "Ingresa un correo válido" }),
    password: zod
      .string({ required_error: "Introduce una contraseña" })
      .regex(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/, {
        message:
          "Debe tener al menos 6 caracteres, una letra, un dígito, un caracter especial",
      }),
    confirmPassword: zod.string({ required_error: "Reescribe tu contraseña" }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [requestStatus, setRequestStatus] = useState("initial");
  const { toast } = useToast()

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
    setRequestStatus("inProgress");
    signUpFormValues.password = md5(signUpFormValues.password);
    delete signUpFormValues.confirmPassword;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/users/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpFormValues),
        }
      );

      if (response.ok) {
        setRequestStatus("success");
        NextResponse.redirect("/index");
      } else throw new Error();
    } catch (error) {
      setRequestStatus("failure");
      let { id } = toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      })

      console.log(error)
      console.log(id)
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
            disabled={requestStatus === "inProgress"}
          >
            {requestStatus === "inProgress" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {requestStatus !== "inProgress" ? (
              <span>Crear cuenta</span>
            ) : (
              <span>Espera un momento...</span>
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
    </div>
  );
}
