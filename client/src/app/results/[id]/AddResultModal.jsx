"use client";
import { useEffect, useState } from "react";
import { createResult } from "@/src/lib/api/results";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { getAvailableMethodAnalytes } from "@/src/lib/api/methodAnalytes";

const EMPTY_FORM = {
  methodAnalyteId: "",
  value: "",
  notes: "",
};

export default function AddResultModal({ isOpen, onClose, sample, onCreated }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [methodAnalytes, setMethodAnalytes] = useState([]);
  // reset form on open
  useEffect(() => {
    if (!isOpen) return;
    if (!sample?.id) return;

    setFormData(EMPTY_FORM);
    const loadOptions = async () => {
      const data = await getAvailableMethodAnalytes(sample.id);
      setMethodAnalytes(data);
    };
    loadOptions();
  }, [isOpen, sample]);

  // cleanup
  const handleClose = () => {
    setFormData(EMPTY_FORM);
    onClose();
  };

  if (!isOpen) return null;
  const handleSubmit = async () => {
    // quick field validation
    if (!formData.methodAnalyteId || !formData.value) {
      alert("Method/Analyte and value are required");
      return;
    }
    try {
      setIsSaving(true);
      await createResult({
        sampleId: sample.id,
        methodAnalyteId: formData.methodAnalyteId,
        value: formData.value,
        notes: formData.notes,
      });
      onCreated();
      handleClose();
    } catch (err) {
      console.log(err);
      alert("Failed to create result");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Add result</h2>
        <div className="text-sm text-gray-400">
          <div>Sample: {sample.sampleName}</div>
          <div>Matrix: {sample.matrixName}</div>
        </div>

        <div>
          <label className="block text-sm mb-1">Method - Analyte</label>
          <select
            className=""
            value={formData.methodAnalyteId}
            onChange={(e) => {
              setFormData({ ...formData, methodAnalyteId: e.target.value });
            }}
          >
            <option value="" disabled>
              Select method / analyte
            </option>

            {methodAnalytes.map((ma) => (
              <option key={ma.id} value={ma.id}>
                {ma.methodName} - {ma.analyteName} ({ma.unit})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Result Value</label>
          <input
            type="text"
            className="w-full bg-gray-800 border rounded px-3 py-2"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Notes (optional)</label>
          <textarea
            type="text"
            className="w-full bg-gray-800 border rounded px-3 py-2"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-green-600 rounded hover:bg-green-700"
          >
            {isSaving ? "Saving..." : <FontAwesomeIcon icon={faFloppyDisk} />}
          </button>
          <button
            onClick={handleClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-gray-700 rounded  hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
}
