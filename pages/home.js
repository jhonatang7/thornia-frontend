import { Navbar } from "@/components/navbar";
import { createContext, useState } from "react";
import { Projects } from "./projects";
import { Account } from "./account";

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
    </HomeNavigationContext.Provider>
  );
}

Home.requireAuth = true;
