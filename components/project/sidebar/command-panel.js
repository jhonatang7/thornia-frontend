import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { searchArtifacts } from "@/services/artifact-service";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { CommandLoading } from "cmdk";

export function CommandPanel() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(["HOME"]);
  const debounceValue = useDebounce(search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [artifacts, setArtifacts] = useState([]);
  const page = pages[pages.length - 1];

  useEffect(() => {
    const getSearchArtifacts = async () => {
      console.log({ debounceValue, page });
      setIsLoading(true);
      const { payload, success } = await searchArtifacts({
        type: page,
        text: debounceValue,
      });
      console.log(payload);
      if (success) setArtifacts(payload);
      setIsLoading(false);
    };
    search ? getSearchArtifacts() : setArtifacts([]);
  }, [debounceValue]);
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-auto px-2 py-1 w-auto rounded-lg"
        onClick={() => setOpen((open) => !open)}
      >
        <SearchIcon className="w-4 h-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Que quieres hacer?</DialogTitle>
            <DialogDescription>
              {pages.length > 0 &&
                pages.map((value) => {
                  console.log(value);
                  return <Badge className="m-1">{value}</Badge>;
                })}
            </DialogDescription>
            <Command
              className="rounded-lg border"
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !search) {
                  e.preventDefault();
                  setPages((pages) => pages.slice(0, -1));
                }
              }}
            >
              {(page === "LLTC" || page === "HLTC" || page === "BUG") && (
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Buscar resultados"
                />
              )}
              <CommandList>
                {page === "HOME" && (
                  <CommandGroup heading="Artefactos">
                    <CommandItem onSelect={() => setPages([...pages, "LLTC"])}>
                      Buscar LLTC
                    </CommandItem>
                    <CommandItem onSelect={() => setPages([...pages, "HLTC"])}>
                      Buscar HLTC
                    </CommandItem>
                    <CommandItem onSelect={() => setPages([...pages, "BUG"])}>
                      Buscar Bugs
                    </CommandItem>
                  </CommandGroup>
                )}
                {(page === "LLTC" || page === "HLTC" || page === "BUG") && (
                  <CommandGroup heading={`Resultados de ${page}:`}>
                    {isLoading && (
                      <CommandLoading>Buscando palabras...</CommandLoading>
                    )}
                    {artifacts.map((artifact) => {
                      console.log(artifact);
                      return (
                        <CommandItem key={artifact.id}>
                          {artifact.parameterArtifact.Título}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
                <CommandEmpty>No se encontró resultados.</CommandEmpty>
              </CommandList>
            </Command>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
