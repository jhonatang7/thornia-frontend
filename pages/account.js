import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountNameField } from "@/components/account/account-name-field";
import { useAuth } from "@/components/providers/auth-provider";
import { useRef, useState } from "react";

export function Account() {
  const { logOut } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [selectImageName, setSelectImageName] = useState("");
  const [selectedFile, setselectedFile] = useState();
  const imageInputRef = useRef(null);

  const handleUploadImage = async () => {
    imageInputRef.current.click();
  };

  const setTargetImage = ({ target }) => {
    if (target.files) {
      const fileProfileImage = target.files[0];
      setSelectImageName(URL.createObjectURL(fileProfileImage));
      setselectedFile(fileProfileImage);
      //LOGICA PARA SUBIR
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 space-y-6">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Información de tu cuenta
      </h2>
      <div className="relative">
        <Avatar className="w-48 h-48">
          <AvatarImage
            src="https://en.gravatar.com/avatar/d694c1a2e792a196fa88c4d8878b1f5e?d=retro"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-1 right-1 rounded-full"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Foto de perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Input
              type="file"
              ref={imageInputRef}
              hidden
              onChange={setTargetImage}
            />
            <DropdownMenuItem onSelect={handleUploadImage}>
              Actualizar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:bg-destructive/30">
              Quitar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
