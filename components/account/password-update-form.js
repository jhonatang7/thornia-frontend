import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdatePasswordFormSchema } from "@/schemas/update-password-schema";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { updatePassword } from "@/services/account-service";

export function PasswordUpdateForm() {
  const [formStatus, setFormStatus] = useState("disabled");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(UpdatePasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setFormStatus("updating");
    let { successfullyUpdated, payload } = await updatePassword(
      data.currentPassword,
      data.newPassword
    );
    if (successfullyUpdated) {
      toast({
        title: "✅",
        description: "¡Tu contraseña ha sido actualizada exitosamente!",
      });
    } else {
      form.reset();
      let message;
      if (payload === 401) {
        message = "Tu contraseña actual es incorrecta";
      } else {
        message = "Ocurrió un error inesperado al actualizar tu contraseña";
      }

      toast({
        variant: "destructive",
        title: message,
        description: "Por favor vuelve a intentarlo más tarde.",
      });
    }
    setFormStatus("disabled");
  };

  return (
    <>
      {formStatus !== "disabled" && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={formStatus !== "editing"}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={formStatus !== "editing"}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={formStatus !== "editing"}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row space-x-2 justify-end">
              <Button
                disabled={formStatus !== "editing"}
                variant="ghost"
                onClick={() => setFormStatus("disabled")}
              >
                <span>Cancelar</span>
              </Button>
              <Button
                type="submit"
                disabled={formStatus !== "editing"}
                variant="outline"
              >
                {formStatus === "updating" && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {formStatus === "editing" && (
                  <span>Guardar nueva contraseña</span>
                )}
                {formStatus === "updating" && <span>Guardando...</span>}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {formStatus === "disabled" && (
        <Button
          type="submit"
          variant="outline"
          className="max-w-md w-full"
          onClick={() => setFormStatus("editing")}
        >
          Cambiar contraseña
        </Button>
      )}
    </>
  );
}
