import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

export async function createProject(project) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/projects/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify(project),
      }
    );

    console.log(response);

    if (response.ok) {
      let project = await response.json();
      return project;
    }
  } catch (error) {}
}
