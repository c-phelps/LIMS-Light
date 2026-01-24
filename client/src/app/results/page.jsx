"use client";
// app/results/page.jsx
import { useState, useEffect } from "react";
import { getResultsBySample, getSamples } from "@/src/lib/api/methods";

// we are keeping this deliberately simple for mvp development
export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [sampleId, setSampleId] = useState([]);
  const [sampleData, setSampleData] = useState([]);

  // on page load
  useEffect(() => {
    const fetchSampleData = async () => {
      try {
        const data = await getSamples();
        console.log("sample data:", data);
        setSampleData(data);
      } catch (err) {
        console.log(`Error fetching SampleIds error:${err}.`);
      }
    };
    fetchSampleData();
  }, []);

  // on sampleId update
  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!sampleId) return;
        const data = await getResultsBySample(sampleId);
        setResults(data);
        console.log(data);
      } catch (err) {
        console.log(`Error fetching Results error:${err}.`);
      }
    };
    fetchResults();
  }, [sampleId]);

  // on change handler
  const handleChange = (event) => {
    const { value } = event.target;
    setSampleId(value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <select name="sampleId" id="sampleId" placeholder="Select Sample ID" onChange={handleChange} defaultValue="">
        <option value="" disabled>
          Select a Sample Id
        </option>
        {sampleData.map((sample, index) => (
          <option key={index} value={sample.id}>
            {sample.id}
          </option>
        ))}
      </select>
    </div>
  );
}
