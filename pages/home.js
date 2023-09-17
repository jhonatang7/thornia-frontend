import { Navbar } from "@/components/navbar";
import { createContext, useState } from "react";
import { Projects } from "./projects";
import { Account } from "./account";
import { Toaster } from "@/components/ui/toaster";

export const HomeNavigationContext = createContext();
export default function Home() {
  const [currentPage, setCurrentPage] = useState("projects");

  return (
    <HomeNavigationContext.Provider value={setCurrentPage}>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        {currentPage === "projects" && <Projects />}
        {currentPage === "account" && <Account />}
      </div>
      <Toaster />
    </HomeNavigationContext.Provider>
  );
}

Home.requireAuth = true;
