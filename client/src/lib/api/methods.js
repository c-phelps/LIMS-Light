const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
//  ---- METHODS ----

// GET methods/
export async function getMethods() {
  const res = await fetch(`${API_BASE_URL}/methods`);
  await handleApiError(res, "getMethods");
  return res.json();
}

// GET methods/:id
export async function getMethodById(methodId) {
  const res = await fetch(`${API_BASE_URL}/methods/${methodId}`);
  await handleApiError(res, "getMethodById");
  return res.json();
}

// POST method/
export async function createMethod(data) {
  const res = await fetch(`${API_BASE_URL}/methods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "createMethod")
  return res.json();
}

// PUT methods/:id
export async function updateMethod(methodId, update) {
  const res = await fetch(`${API_BASE_URL}/methods/${methodId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateMethod")
  return res.json();
}

// DELETE methods/:id
export async function deleteMethod(methodId) {
  const res = await fetch(`${API_BASE_URL}/methods/${methodId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteMethod")
  return res.ok;
}
