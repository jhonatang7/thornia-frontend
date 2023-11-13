import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

export async function getAllProjectsByUser() {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/projects/projectlist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
      }
    );
    return {
      success: response.ok,
      payload: await response.json(),
    };
  } catch (error) {
    return {
      success: false,
      payload: [],
    };
  }
}

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
      return { success: true, project: project };
    } else return { success: false };
  } catch (error) {
    return { success: false };
  }
}

export async function getProject(projectId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/projects/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
      }
    );

    if (response.ok) {
      let project = await response.json();
      return { success: true, project: project };
    } else return { success: false };
  } catch (error) {
    return { success: false };
  }
}
