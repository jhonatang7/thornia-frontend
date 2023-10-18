import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import * as zod from "zod";

export function ProjectMembersAdditionView({
  goToPreviousStep,
  updateProjectData,
}) {
  const [memberEmails, setMemberEmails] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState();
  const [alreadyExists, setAlreadyExists] = useState(false);

  const onSubmit = () => {
    updateProjectData({ members: memberEmails });
    // goToNextStep();
  };

  const handleOnChange = (e) => {
    let email = e.target.value.split(",")[0];
    let validationResult = zod.string().email().safeParse(email);
    setIsEmailValid(validationResult.success);
  };

  const handleOptionsKeyUp = (e) => {
    if (e.key !== ",") return;

    let email = e.target.value.substring(0, e.target.value.indexOf(","));
    if (!email.trim()) return;
    if (email.length === 0) return;
    if (!isEmailValid) return;

    let emailAlreadyExists = memberEmails.indexOf(email) !== -1;
    setAlreadyExists(emailAlreadyExists);
    if (emailAlreadyExists) return;

    setMemberEmails([...memberEmails, email]);
    e.target.value = "";
    setIsEmailValid();
  };

  const removeEmail = (index) => {
    let updatedOptions = [...memberEmails];
    updatedOptions.splice(index, 1);
    setMemberEmails(updatedOptions);
  };

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Agrega a los miembros de tu proyecto
      </h2>
      <p className="mb-7 text-muted-foreground">
        Enviaremos una invitación a su correo electrónico
      </p>
      {memberEmails.length > 0 && (
        <div className="flex flex-row space-x-1 flex-wrap mb-1 max-w-lg">
          {memberEmails.map((email, index) => (
            <Badge
              variant="secondary"
              className="mb-2 text-sm"
              key={"email-" + index}
            >
              {email}
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 p-0.5 ml-2 rounded-full"
                onClick={() => removeEmail(index)}
              >
                <X />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      <Input
        type="text"
        placeholder="Corro electrónico ( ' , ' para agregar)"
        required={true}
        onChange={handleOnChange}
        onKeyUp={handleOptionsKeyUp}
        className="max-w-lg"
      />
      {isEmailValid === false && (
        <p className="text-sm font-medium text-destructive mt-2">
          Ingresa un correo válido
        </p>
      )}
      {alreadyExists === true && (
        <p className="text-sm font-medium text-destructive mt-2">
          Ingresa un correo que no hayas ingresado antes
        </p>
      )}

      <div className="flex flex-row py-4 justify-end space-x-4">
        <Button onClick={goToPreviousStep} variant="outline">
          Atrás
        </Button>
        <Button onClick={onSubmit}>Crear proyecto</Button>
      </div>
    </div>
  );
}
