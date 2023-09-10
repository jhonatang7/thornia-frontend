export const localStorageKeys = {
  token: process.env.NEXT_PUBLIC_USER_TOKEN_KEY
}

export const sessionStorageKeys = {
  signInRedirectUrl: "THORNIA_SIGN_IN_REDIRECT_URL"
}

export function saveToLocalStorage(key, value) {
  if (typeof (key) === "string" && typeof (value) === "string") {
    localStorage.setItem(key, value);
  }
}

export function getFromLocalStorage(key) {
  if (typeof (key) === "string") {
    return localStorage.getItem(key)
  }
}

export function saveToSessionStorage(key, value) {
  if (typeof (key) === "string" && typeof (value) === "string") {
    sessionStorage.setItem(key, value);
  }
}

export function getFromSessionStorage(key) {
  if (typeof (key) === "string") {
    return sessionStorage.getItem(key)
  }
}