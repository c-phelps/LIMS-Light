/**
 * Centralized API helpers
 * - Keeps fetch logic out of components
 * - Easy to add auth headers later
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSamples() {
  const res = await fetch(`${API_BASE_URL}/samples`);

  if (!res.ok) {
    throw new Error("Failed to fetch samples");
  }

  return res.json();
}

export async function getSampleById(sampleId) {
  const res = await fetch(`${API_BASE_URL}/${sampleId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch sample data.");
  }
  return res.json();
}

export async function getResultsBySample(sampleId) {
  const res = await fetch(`${API_BASE_URL}/results/sample/${sampleId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch result for sample");
  }
  return res.json();
}
