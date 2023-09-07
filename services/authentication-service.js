import { md5 } from "@/utils/md5";
import { getValueFromLocalStorage } from "./local-storage-service";

export async function signUp(user) {
  user.password = md5(user.password);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (response.ok) {
      let responseBody = await response.json();
      return {
        success: true,
        payload: responseBody.token,
      };
    } else {
      return {
        success: false,
        payload: response.status,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      payload: error.message,
    };
  }
}

export async function signIn({ email, password }) {
  password = md5(password);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      let responseBody = await response.json();
      return {
        success: true,
        payload: responseBody.token,
      };
    } else if (response.status === 403) {
      return {
        success: false,
        payload: "Credenciales incorrectas"
      }
    } else {
      return {
        success: false,
        payload: "Ups! Ocurrió un error inesperado, inténtalo de nuevo",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      payload: error.message,
    };
  }
}
