import { NavbarMenubar } from "@/components/navbar-menubar";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

export function Navbar() {
  return (
    <nav className="max-w-6xl mx-auto border-b flex justify-between flex-wrap gap-6 p-3">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Thornia
      </h2>
      <NavbarMenubar />
      <ThemeToggleButton />
    </nav>
  );
}
