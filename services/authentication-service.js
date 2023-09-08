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
      let responseBody = await response.json()
      return {
        success: true,
        payload: responseBody.token
      }
    } else {
      return {
        success: false,
        payload: response.status
      }
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      payload: error.message
    }
  }
}

export async function signIn(email, password) {

}
