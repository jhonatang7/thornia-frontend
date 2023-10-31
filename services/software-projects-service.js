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
          Authorization: `Bearer ${getFromLocalStorage(localStorageKeys.token)}`,
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
    }
  }
}
