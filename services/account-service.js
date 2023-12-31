import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";
import { md5 } from "@/utils/md5";

export async function getUser() {
  try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage(localStorageKeys.token)}`,
      },
    });

    if (response.ok) {
      let user = await response.json();
      delete user.password;
      delete user.authorities;
      delete user.username;
      return user;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

export async function updateUserName(newName) {
  let successfullyUpdated;
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/update/name`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify({ fullName: newName }),
      }
    );
    successfullyUpdated = response.ok;
  } catch (error) {
    successfullyUpdated = false;
  } finally {
    return successfullyUpdated;
  }
}

export async function updatePassword(currentPassword, newPassword) {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/update/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
        body: JSON.stringify({
          currentPassword: md5(currentPassword),
          newPassword: md5(newPassword),
        }),
      }
    );
    console.log(response);
    if (response.ok) {
      return {
        successfullyUpdated: true,
      };
    } else {
      return {
        successfullyUpdated: false,
        payload: response.status,
      };
    }
  } catch (error) {
    return {
      successfullyUpdated: false,
    };
  }
}

export async function updateProfileImage(profileImage) {
  let successfullyUpdated;
  try {
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/update/profileimage`,
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
    successfullyUpdated = response.ok;
  } catch (error) {
    successfullyUpdated = false;
  } finally {
    return successfullyUpdated;
  }
}

export async function deleteProfileImage() {
  let successfullyDelete;
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/delete/profileimage`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(
            localStorageKeys.token
          )}`,
        },
      }
    );
    successfullyDelete = response.ok;
  } catch (error) {
    successfullyDelete = false;
  } finally {
    return successfullyDelete;
  }
}
