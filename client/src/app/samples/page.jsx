// app/samples/page.jsx
import { getSamples } from "@/src/lib/api/methods";
import Link from "next/link";

/**
 * Samples page
 * Responsibility:
 * - Fetch and display samples
 * - Navigation happens here, not creation yet
 */

// we are keeping this deliberately simple for mvp development
export default async function SamplesPage() {
  const samples = await getSamples();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Samples</h1>
      {samples.length === 0 ? (
        <p>No samples found</p>
      ) : (
        <ul>
          {samples.map((sample) => (
            <li key={sample.id}>
              <Link href={`/samples/${sample.id}`}>{sample.name || sample.id}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
