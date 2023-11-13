import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

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
