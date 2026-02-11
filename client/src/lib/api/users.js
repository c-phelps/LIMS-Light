const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
// ---- USERS ----

// GET users/
export async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/users`);
  await handleApiError(res, "getUsers");
  return res.json();
}

// GET users/:id
export async function getUserById(userId) {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`);
  await handleApiError(res, "getUserById");
  return res.json();
}

// POST users/
export async function createUser(data) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "createUser");
  return res.json();
}

// PUT users/:id
export async function updateUser(userId, update) {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateUser");
  return res.json();
}

// DELETE users/:id
export async function deleteUser(userId) {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteUser");
  return true;
}