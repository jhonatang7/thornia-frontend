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
import { useAuth } from "@/components/providers/auth-provider";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { md5 } from "@/utils/md5";
import { updateProfileImage } from "@/services/account-service";

export function AccountProfileImage() {
  const { user, updateUser } = useAuth();
  const [isLoading, setisLoading] = useState(false);
  const imageInputRef = useRef(null);
  let [profileImage, setProfileImage] = useState({
    src: "loading.gif",
  });
  const { toast } = useToast();

  const emailEncrypt = md5(user.email);
  useEffect(() => {
    setProfileImage(
      isLoading
        ? (profileImage = {
            src: "loading.gif",
          })
        : (profileImage = {
            src:
              user.hasProfileImage === true
                ? `${process.env.NEXT_PUBLIC_API_HOST}/users/me/profileimage/${user.id}`
                : `https://en.gravatar.com/avatar/${emailEncrypt}?d=retro`,
          })
    );
  }, [isLoading]);

  const handleUploadImage = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
    console.log(imageInputRef.current.onChange);
  };

  const setTargetImage = async ({ target }) => {
    setisLoading(true);
    if (target.files) {
      const fileProfileImage = target.files[0];
      let successfullyUpdated = await updateProfileImage(fileProfileImage);
      if (successfullyUpdated) {
        await updateUser();
      } else {
        console.log("Nop");
        toast({
          variant: "destructive",
          title: "Ocurrió un error al actualizar la imagen",
          description: "Por favor vuelve a intentarlo más tarde.",
        });
      }
    }
    setisLoading(false);
  };

  return (
    <div className="relative">
      <Avatar className="w-48 h-48">
        <AvatarImage {...profileImage} alt="@shadcn" />
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
          <input type="file" hidden ref={imageInputRef} onChangeCapture={setTargetImage} />
          <DropdownMenuItem onSelect={handleUploadImage} disabled={isLoading}>
            Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/30"
            disabled={isLoading}
          >
            Quitar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
