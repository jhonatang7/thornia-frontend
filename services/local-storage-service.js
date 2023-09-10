export function saveValueToLocalStorage(key, value) {
  if (typeof (key) === "string" && typeof (value) === "string") {
    localStorage.setItem(key, value);
  }
}

export function getValueFromLocalStorage(key) {
  if (typeof (key) === "string") {
    return localStorage.getItem(key)
  }
}