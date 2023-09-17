import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { AccountNameFieldSchema } from "@/schemas/account-name-field-schema";
import { useAuth } from "../providers/auth-provider";
import { useState, useEffect } from "react";
import { updateUserName } from "@/services/account-service";
import { useToast } from "@/components/ui/use-toast";

export function AccountNameField() {
  const { user, updateUser } = useAuth();
  const [nameStatus, setNameStatus] = useState("disabled");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(AccountNameFieldSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name,
    },
  });

  useEffect(() => {
    form.reset({
      name: user.name,
    });
  }, [user]);

  const onSubmit = async (data) => {
    if (nameStatus === "disabled") {
      setNameStatus("editing");
    } else if (nameStatus === "editing") {
      setNameStatus("updating");
      let successfullyUpdated = await updateUserName(user, data.name);

      if (successfullyUpdated) {
        await updateUser();
      } else {
        form.reset({
          name: user.name,
        });

        toast({
          variant: "destructive",
          title: "Ocurrió un error al actualizar tu nombre",
          description: "Por favor vuelve a intentarlo más tarde.",
        });
      }

      setNameStatus("disabled");
    }
  };

  return (
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
                  <Input {...field} disabled={nameStatus !== "editing"} />
                  <Button
                    type="submit"
                    disabled={nameStatus === "updating"}
                    variant="ghost"
                  >
                    {nameStatus === "updating" && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {nameStatus === "disabled" && <span>Editar</span>}
                    {nameStatus === "editing" && <span>Guardar</span>}
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
  );
}
