const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
//  ---- RESULTS ----

// GET results/sample/:id
export async function getResultsBySample(sampleId) {
  const res = await fetch(`${API_BASE_URL}/results/sample/${sampleId}`);
  await handleApiError(res, "getResultsBySample");
  return res.json();
}

// GET results/:id
export async function getResultsById(resultId) {
  const res = await fetch(`${API_BASE_URL}/results/${resultId}`);
  await handleApiError(res, "getResultsById");
  return res.json();
}

// POST results/
export async function createResult(data) {
  const res = await fetch(`${API_BASE_URL}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "createResult");
  return res.json();
}

// PUT results/:id
export async function updateResult(resultId, update) {
  const res = await fetch(`${API_BASE_URL}/results/${resultId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateResult");
  return res.json();
}

// DELETE results/:id
export async function deleteResult(resultId) {
  const res = await fetch(`${API_BASE_URL}/results/${resultId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteResult");
  return res.ok;
}
