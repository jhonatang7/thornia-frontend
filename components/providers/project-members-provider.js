import { createContext, useContext, useEffect, useState } from "react";
import { getMemberList } from "@/services/software-projects-service";

export const ProjectMembersContext = createContext();

export function ProjectsMembersProvider({ children, memberIds }) {
  const [listMembers, setListMembers] = useState([]);
  useEffect(() => {
    async function requestMembersList(memberIds) {
      const { success, payload } = await getMemberList(memberIds);
      if (success) {
        setListMembers(payload);
      }
    }
    requestMembersList(memberIds);
  }, []);

  return (
    <ProjectMembersContext.Provider value={listMembers}>
      {children}
    </ProjectMembersContext.Provider>
  );
}
