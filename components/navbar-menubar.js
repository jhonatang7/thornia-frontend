import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HomeNavigationContext } from "@/pages/home";
import { useContext } from "react";

export function NavbarMenubar() {
  const setCurrentPage = useContext(HomeNavigationContext);

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
              src="https://en.gravatar.com/avatar/d694c1a2e792a196fa88c4d8878b1f5e?d=retro"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
