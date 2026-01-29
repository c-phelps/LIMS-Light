"use client";
import { useState, useEffect, use } from "react";
import { getResultsBySample } from "@/src/lib/api/results";
import { getSampleById } from "@/src/lib/api/samples";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddResultModal from "./AddResultModal";

export default function ResultsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [sample, setSample] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // on sampleId update
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const resultData = await getResultsBySample(id);
        const sampleData = await getSampleById(id);
        setResults(resultData);
        setSample(sampleData);
      } catch (err) {
        console.log(`Error fetching Results error:${err}.`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  const refreshResults = async () => {
    const data = await getResultsBySample(id);
    setResults(data);
  };

  return (
    <div className="mt-6 ml-1">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">
          Results{" "}
          {isLoading ? (
            <>loading ...</>
          ) : (
            <>
              <span className="ml-4">{sample.sampleName}</span> <span className="ml-4">{sample.matrixName}</span>
            </>
          )}
        </h2>
        <button
          onClick={() => setIsAddOpen(true)}
          className="mr-1 mb-1 px-2 py-2 txt-sm  bg-green-600 text-white rounded hover:bg-green-700"
          title="Add Result"
        >
          Add Result
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <AddResultModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        sample={sample}
        onCreated={refreshResults}
      />
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="px-3 py-2 text-left">Method</th>
            <th className="px-3 py-2 text-left">Analyte</th>
            <th className="px-3 py-2 text-left">Detection Limit</th>
            <th className="px-3 py-2 text-left">Value</th>
            <th className="px-3 py-2 text-left">Units</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Approved By</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={7} className="px-3 py-4 text-center text-gray-400">
                Loading results…
              </td>
            </tr>
          ) : results.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-3 py-4 text-center text-gray-400">
                No results for this sample
              </td>
            </tr>
          ) : (
            results.map((result) => (
              <tr key={result.id} className="border-t">
                <td className="px-3 py-3">{result.methodName}</td>
                <td className="px-3 py-3">{result.analyteName}</td>
                <td className="px-3 py-3">{result.detectionLimit}</td>
                <td className="px-3 py-3">{result.value}</td>
                <td className="px-3 py-3">{result.unit}</td>
                <td className="px-3 py-3">{result.status}</td>
                <td className="px-3 py-3">{result.approvedBy}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        onClick={() => router.back()}
        className="mr-1 mt-1 px-2 py-2 txt-sm  bg-blue-600 text-white rounded hover:bg-blue-700"
        title="Back"
      >
        <FontAwesomeIcon icon={faRotateLeft} />
      </button>
    </div>
  );
}
