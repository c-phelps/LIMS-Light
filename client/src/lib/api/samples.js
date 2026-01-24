const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
// ---- SAMPLES ----

// GET samples/
export async function getSamples() {
  const res = await fetch(`${API_BASE_URL}/samples`);
  await handleApiError(res, "getSamples");
  return res.json();
}

// GET samples/:id
export async function getSampleById(sampleId) {
  const res = await fetch(`${API_BASE_URL}/samples/${sampleId}`);
  await handleApiError(res, "getSampleById");
  return res.json();
}

// POST samples/
export async function createSample(data) {
  const res = await fetch(`${API_BASE_URL}/samples`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "createSample");
  return res.json();
}

// PUT samples/:id
export async function updateSample(sampleId, update) {
  const res = await fetch(`${API_BASE_URL}/samples/${sampleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateSample");
  return res.json();
}

// DELETE samples/:id
export async function deleteSample(sampleId) {
  const res = await fetch(`${API_BASE_URL}/samples/${sampleId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteSample");
  return true;
}
