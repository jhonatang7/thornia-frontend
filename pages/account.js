import { Button } from "@/components/ui/button";
import { AccountNameField } from "@/components/account/account-name-field";
import { useAuth } from "@/components/providers/auth-provider";
import { AccountProfileImage } from "@/components/account/account-profile-image";

export function Account() {
  const { logOut } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center p-8 space-y-6">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Información de tu cuenta
      </h2>

      <AccountProfileImage />
      <AccountNameField />
      <Button type="submit" variant="outline" className="max-w-md w-full">
        Cambiar contraseña
      </Button>
      <Button
        type="submit"
        variant="destructiveOutline"
        className="max-w-md w-full"
        onClick={logOut}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
