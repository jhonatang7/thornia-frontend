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

export async function getMemberList(memberIds) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/projects/memberlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify(memberIds),
      }
    );

    if (response.ok) {
      let members = await response.json();
      return { success: true, payload: members };
    } else return { success: false };
  } catch (error) {
    return { success: false };
  }
}

export async function createProjectVersion(projectId, version) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/projects/commit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify({ projectId, version }),
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else if (response.status === 204) {
      return { success: false };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}

export async function getProjectVerions(projectId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/projects/versions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify({ projectId }),
      }
    );
    if (response.ok) {
      let versions = await response.json();
      return { success: true, payload: versions };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}
