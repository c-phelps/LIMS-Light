/**
 * Centralized API helpers
 * - Keeps fetch logic out of components
 * - Easy to add auth headers later
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getSamples() {
    const res = await fetch(`${API_BASE_URL}/samples`);

    if (!res.ok){
        throw new Error("Failed to fetch samples");
    }

    return res.json();
}

