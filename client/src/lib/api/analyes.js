const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
//  ---- ANALYTES ----

// GET analytes/
export async function getAnalytes() {
  const res = await fetch(`${API_BASE_URL}/analytes`);
  await handleApiError(res, "getAnalytes");
  return res.json();
}

// GET analytes/:id
export async function getAnalyteById(analyteId) {
  const res = await fetch(`${API_BASE_URL}/analytes/${analyteId}`);
  await handleApiError(res, "getAnalyteById");
  return res.json();
}

// POST analytes/
export async function createAnalyte(data) {
  const res = await fetch(`${API_BASE_URL}/analytes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "createAnalyte");
  return res.json();
}

// PUT analytes/:id
export async function updateAnalyte(analyteId, update) {
  const res = await fetch(`${API_BASE_URL}/analytes/${analyteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateAnalyte");
  return res.json();
}

// DELETE analytes/:id
export async function deleteAnalyte(analyteId) {
  const res = await fetch(`${API_BASE_URL}/analytes/${analyteId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteAnalyte");
  return res.ok;
}