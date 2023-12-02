import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

export async function uploadTestPlan(testPlanFile, projectId) {
  try {
    const formData = new FormData();
    formData.append("testPlanDocument", testPlanFile);
    formData.append("projectId", projectId);
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/testplan/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: formData,
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

export async function getTestPlan(projectId) {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/testplan/get/${projectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
      }
    );

    if (response.status === 200) {
      let file = await response.blob();
      const arrayBuffer = await new Response(file).arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      return { success: true, payload: uint8Array };
    } else if (response.status === 204) {
      return { success: false };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}
