import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export function SearchProjects({ projects, setSearchedProjects }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    const filteredProjects =
      searchTerm === ""
        ? []
        : projects.filter(
            (project) =>
              project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              project.prefix.toUpperCase().includes(searchTerm.toUpperCase())
          );
    setSearchedProjects(filteredProjects);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleSearch();
    }
  }

  const handleProjectSearchChange  = (event) => {
    setSearchTerm(event.target.value);
    if(event.target.value === "") setSearchedProjects([]);
  } 

  return (
    <div className="flex justify-between m-1">
      <div className="basis-1/2 flex space-x-2 w-full ">
        <Input
          className="grow w-32"
          placeholder="Nombre, prefijo de proyecto"
          value={searchTerm}
          onChange={handleProjectSearchChange}
          onKeyPress={handleKeyPress}
        />
        <Button className="" onClick={handleSearch}>
          <Search className=" h-4 w-4" />
        </Button>
      </div>

      <Button>
        <Plus className="h-4 w-4" />
        Crear Proyecto
      </Button>
    </div>
  );
}
