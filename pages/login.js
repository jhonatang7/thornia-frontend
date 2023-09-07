import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/schemas/sign-in-form-schema";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/services/authentication-service";
import { NextResponse } from "next/server";
import { saveValueToLocalStorage } from "@/services/local-storage-service"
import { useRouter } from "next/router"

export default function SignUp() {
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const signInForm = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit (signInFormValues) {
    setIsRequestInProgress(true);
    const { success, payload } = await signIn(signInFormValues);

    if(success) {
      saveValueToLocalStorage(process.env.NEXT_PUBLIC_USER_TOKEN_KEY, payload);
      setIsRequestInProgress(false);
      router.push('/');
    }else{
      setIsRequestInProgress(false);
      toast({
        variant: "destructive",
        title: payload
      });
    }

  };

  return (
    <main className="grid grid-cols-1 min-h-screen place-content-center p-px">
      <div className="mb-6 flex justify-center">
        <Avatar className=" w-28 h-28">
          <AvatarImage alt="Logo" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="mb-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Inicia sesión en Thornia
      </h1>
      <Form {...signInForm}>
        <form
          onSubmit={signInForm.handleSubmit(onSubmit)}
          className="mb-4 container max-w-md"
        >
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
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
              <FormItem className="mb-1">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex mb-4 justify-end">
            <Link href="/" passHref legacyBehavior>
              <a className="text-sm mt-1 font-medium hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </Link>
          </div>
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
      <Toaster/>
    </main>
  );
}