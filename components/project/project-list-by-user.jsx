import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProjectsByUser } from "@/services/software-projects-service";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export function ProjectListByUser({ projects, setProjects, searchedProjects }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const projectList = async () => {
    const { success, payload } = await getAllProjectsByUser();
    setIsLoading(false);
    if (success) {
      setProjects(payload);
    } else {
      let message = "Ups! Ocurrió un error inesperado, inténtalo de nuevo";
      toast({
        variant: "destructive",
        title: message,
      });
    }
  };

  useEffect(() => {
    projectList();
  }, []);

  return isLoading ? (
    <div className="flex justify-center">
      <Loader2 className="animate-spin mt-16 w-12 h-12" />
    </div>
  ) : (
    <Card className="p-2">
      <CardContent>
        <Table>
          <TableHeader className="static">
            <TableRow className="items-center">
              <TableHead className="w-8">Proyecto</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="w-28">Versión</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedProjects.length > 0
              ? searchedProjects.map((project, index) => (
                  <TableRow
                    onClick={() => {
                      console.log(project);
                      router.push(`/projects/${project.id}`);
                    }}
                    className="cursor-pointer"
                    key={index}
                  >
                    <TableCell>{project.prefix}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.version}</TableCell>
                  </TableRow>
                ))
              : projects.map((project, index) => (
                  <TableRow
                    onClick={() => {
                      console.log(project);
                      router.push(`/projects/${project.id}`);
                    }}
                    className="cursor-pointer"
                    key={index}
                  >
                    <TableCell>{project.prefix}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.version}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
