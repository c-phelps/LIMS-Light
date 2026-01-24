const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
//  ---- MATRICES ----

// GET matrices/
export async function getMatrices() {
  const res = await fetch(`${API_BASE_URL}/matrices`);
  await handleApiError(res, "getMatrices");
  return res.json();
}

// GET matrices/:id
export async function getMatrixById(matrixId) {
  const res = await fetch(`${API_BASE_URL}/matrices/${matrixId}`);
  await handleApiError(res, "getMatrixById");
  return res.json();
}

// POST matrices/
export async function createMatrix(data) {
  const res = await fetch(`${API_BASE_URL}/matrices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "createMatrix");
  return res.json();
}

// PUT matrices/:id
export async function updateMatrix(matrixId, update) {
  const res = await fetch(`${API_BASE_URL}/matrices/${matrixId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateMatrix");
  return res.json();
}

// DELETE matrices/:id
export async function deleteMatrix(matrixId) {
  const res = await fetch(`${API_BASE_URL}/matrices/${matrixId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteMatrix");
  return res.ok;
}