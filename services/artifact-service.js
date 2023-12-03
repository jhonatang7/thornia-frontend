import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

export async function getArtifacts({ projectId, type }) {
  const queryString = new URLSearchParams({ projectId, type }).toString();
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/artifact/list?${queryString}`,
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
      let artifacts = await response.json();
      return {
        success: true,
        payload: artifacts,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}

export async function createArtifact(artifact) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/artifact/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify(artifact),
      }
    );

    if (response.ok) {
      let artifact = await response.json();
      return { success: true, createdArtifact: artifact };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}

export async function deleteArtifact(artifactDTO) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/artifact/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify(artifactDTO),
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}

export async function getArtifact(id, type) {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/artifact/${id}?type=${type}`,
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
      let artifact = await response.json();
      return { success: true, payload: artifact };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}

export async function updateArtifact(id, artifactFields, type) {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/artifact/update/${id}?type=${type}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify(artifactFields),
      }
    );
    return { success: response.ok };
  } catch (error) {
    return { success: false };
  }
}

export async function searchArtifacts({ type, text }) {
  const queryString = new URLSearchParams({ type, text }).toString();
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/artifact/searchartifacts?${queryString}`,
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
      let artifacts = await response.json();
      return {
        success: true,
        payload: artifacts,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}
