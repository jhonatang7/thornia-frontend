import { SearchProjects } from "@/components/project/search-projects";
import { ProjectListByUser } from "@/components/project/project-list-by-user";
import { useState } from "react";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchedProjects, setSearchedProjects] = useState([]);

  return (
    <div className="m-1 mt-4 space-y-4">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Tus proyectos
      </h2>
      <SearchProjects
        projects={projects}
        setSearchedProjects={setSearchedProjects}
      />
      <ProjectListByUser
        projects={projects}
        setProjects={setProjects}
        searchedProjects={searchedProjects}
      />
    </div>
  );
}
