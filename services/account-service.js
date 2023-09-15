import {
  getFromLocalStorage,
  localStorageKeys,
} from "./client-storage-service";

export async function getUser() {
  //   try {
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
  }

  //   } catch (error) {}
}

export async function updateUserName(user, newName) {
  //   try {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/users/update/name`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getFromLocalStorage(localStorageKeys.token)}`,
      },
      body: JSON.stringify({ id: user.id, name: newName }),
    }
  );
  //   } catch (error) {}
}
