import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

export async function getArtifacts(queryParams) {
  const queryString = new URLSearchParams(queryParams).toString();
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
