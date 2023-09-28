import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeNavigationContext } from "@/pages/home";
import { useContext, useState, useEffect } from "react";
import { LoadingProfileImage } from "@/pages/home";
import { useAuth } from "@/components/providers/auth-provider";
import { md5 } from "@/utils/md5";

export function NavbarMenubar() {
  const setCurrentPage = useContext(HomeNavigationContext);
  const { isLoadingProfileImage } = useContext(LoadingProfileImage);
  const { user } = useAuth();
  let [profileImage, setProfileImage] = useState({
    src: "loading.gif",
  });
  const emailEncrypt = md5(user.email);

  useEffect(() => {
    setProfileImage(
      isLoadingProfileImage
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
  }, [isLoadingProfileImage]);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger onClick={() => setCurrentPage("projects")}>
          Proyectos
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => setCurrentPage("account")}>
          Cuenta
          <Avatar className="w-5 h-5 p-0 ml-2 my-0">
            <AvatarImage
              {...profileImage}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
