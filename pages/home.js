import { Navbar } from "@/components/navbar";
import { createContext, useState } from "react";
import { Projects } from "./projects";
import { Account } from "./account";
import { Toaster } from "@/components/ui/toaster";

export const HomeNavigationContext = createContext();
export const LoadingProfileImage = createContext();
export default function Home() {
  const [currentPage, setCurrentPage] = useState("projects");
  const [isLoadingProfileImage, setIsLoadingProfileImage] = useState(false);

  return (
    <HomeNavigationContext.Provider value={setCurrentPage}>
      <LoadingProfileImage.Provider value={{isLoadingProfileImage, setIsLoadingProfileImage}}>
        <Navbar />
        <div className="max-w-6xl mx-auto">
          {currentPage === "projects" && <Projects />}
          {currentPage === "account" && <Account />}
        </div>
        <Toaster />
      </LoadingProfileImage.Provider>
    </HomeNavigationContext.Provider>
  );
}

Home.requireAuth = true;
