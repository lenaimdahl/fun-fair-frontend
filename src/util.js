export function loadAuthToken() {
  return localStorage.getItem("authToken");
}

export function saveAuthToken(token) {
  localStorage.setItem("authToken", token);
}

export function removeToken() {
  localStorage.removeItem("authToken");
}
