const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { handleApiError } from "./handleApiError";
//  ---- METHODANALYTES ----

// POST methodAnalytes/method/:methodId
export async function addAnalyteToMethod(methodId, data) {
  const res = await fetch(`${API_BASE_URL}/methodAnalytes/method/${methodId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await handleApiError(res, "addAnalyteToMethod");
  return res.json();
}

// PUT methodAnalytes//:id
export async function updateMethodAnalyte(methodAnalyte, update) {
  const res = await fetch(`${API_BASE_URL}/methodAnalytes/${methodAnalyte}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  await handleApiError(res, "updateMethodAnalyte");
  return res.json();
}

// DELETE methodAnalytes//:id
export async function deleteMethodAnalyte(methodAnalyteId) {
  const res = await fetch(`${API_BASE_URL}/methodAnalytes/${methodAnalyteId}`, {
    method: "DELETE",
  });
  await handleApiError(res, "deleteMethodAnalyte");
  return res.ok;
}
