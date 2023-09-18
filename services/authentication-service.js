import { md5 } from "@/utils/md5";

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
    } else {
      return {
        success: false,
        payload: response.status,
      };
    }
  } catch (error) {
    return {
      success: false,
      payload: error.message,
    };
  }
}

export async function updateForgottenPassword({ password }, token) {
  password = md5(password);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/update/forgottenpassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    return {
      success: response.ok,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

export async function restorePassword({ email }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/users/restorepassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    return {
      success: response.ok,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}
