// app/results/page.jsx

import { getResultsBySample } from "@/lib/api";

// we are keeping this deliberately simple for mvp development
export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [sampleId, setSampleId] = useState([]);

  useEffect(()=>{
    getResultsBySample(sampleId).then(setResults).catch(console.error);
  }, [sampleId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <p className="text-gray-800">This will display a list of lab results by sample id when sample id is selected</p>
    </div>
  );
}
