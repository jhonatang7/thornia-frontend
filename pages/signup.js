import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const signUpFormSchema = zod.object({
  name: zod.string({ required_error: "Introduce tu nombre" }).min(3, { message: "Debe tener al menos 3 caracteres" }).max(50, { message: "No debe pasar de 50 caracteres" }),
  email: zod.string({ required_error: "Introduce tu correo" }).email({ message: "Ingresa un correo válido" }),
  password: zod.string({ required_error: "Introduce una contraseña" }).regex(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/, { message: "Debe tener al menos 6 caracteres, una letra, un dígito, un caracter especial" }),
  confirmPassword: zod.string({ required_error: "Reescribe tu contraseña" })
}).required().refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const signUpForm = useForm({ resolver: zodResolver(signUpFormSchema), mode: "onChange", })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <div className="container mx-auto p-px md:p-4">
      <Button variant="outline">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-4 mb-1">
        Bienvenido a Thornia
      </h1>
      <h3 className="mb-6 text-center text-2xl">Crea una cuenta para iniciar</h3>

      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-3 container max-w-md">
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
                  <Input {...field} placeholder="correo@ejemplo.com"/>
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
                  <Input {...field} type="password" placeholder="*********"/>
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
                  <Input {...field} type="password" placeholder="*********"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Crear cuenta</Button>
        </form>
      </Form>
      <p className="text-center mt-2">¿Ya tienes una cuenta? <Button variant="link" className="p-1 font-bold">Inicia sesión</Button> </p>
    </div>
  )
}