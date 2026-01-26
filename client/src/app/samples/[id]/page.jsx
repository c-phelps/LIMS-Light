import Link from "next/link";

export default async function SampleDetailPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1>Sample Details</h1>
      <p>Sample ID: {id}</p>
      <Link href={`/results/${id}`}>View results</Link>
    </div>
  );
}
