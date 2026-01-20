/**
 * Centralized API helpers
 * - Keeps fetch logic out of components
 * - Easy to add auth headers later
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ---- SAMPLES ----

export async function getSamples() {
  const res = await fetch(`${API_BASE_URL}/samples`);

  if (!res.ok) {
    throw new Error("Failed to fetch samples");
  }

  return res.json();
}

export async function getSampleById(sampleId) {
  const res = await fetch(`${API_BASE_URL}/samples/${sampleId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch sample data.");
  }
  return res.json();
}

export async function createSample(data){
  const res = await fetch(`${API_BASE_URL}/samples`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateSample(sampleId, update) {
  const res = await fetch(`${API_BASE_URL}/samples/${sampleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  return res.json();
}

export async function deleteSample(sampleId) {
  const res = await fetch(`${API_BASE_URL}/samples/${sampleId}`, {
    method: "DELETE",
  });
  return res.ok;
}

//  ---- RESULTS ----

export async function getResultsBySample(sampleId) {
  const res = await fetch(`${API_BASE_URL}/results/sample/${sampleId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch result for sample");
  }
  return res.json();
}

export async function createResult(data) {
  const res = await fetch(`${API_BASE_URL}/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateResult(resultId, update) {
  const res = await fetch(`${API_BASE_URL}/results/${resultId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  return res.json();
}

export async function deleteResult(resultId) {
  const res = await fetch(`${API_BASE_URL}/results/${resultId}`, {
    method: "DELETE",
  });
  return res.ok;
}

//  ---- METHODS ----

export async function getMethods() {
  const res = await fetch(`${API_BASE_URL}/methods`);
  if (!res.ok) {
    throw new Error("Failed to fetch methods");
  }
  return res.json();
}

export async function createMethod(data) {
  const res = await fetch(`${API_BASE_URL}/methods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMethod(methodId, update) {
  const res = await fetch(`${API_BASE_URL}/methods/${methodId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  return res.json();
}

export async function deleteMethod(methodId) {
  const res = await fetch(`${API_BASE_URL}/methods/${methodId}`, {
    method: "DELETE",
  });
  return res.ok;
}