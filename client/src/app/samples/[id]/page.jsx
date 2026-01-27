"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { getSampleById, updateSample } from "@/src/lib/api/samples";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

export default function SampleDetailPage({ params }) {
  const [sampleDetails, setSampleDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState([]);
  const [creationDate, setCreationDate] = useState("");
  const [receivedDate, setReceivedDate] = useState("");

  const { id } = use(params);

  useEffect(() => {
    const fetchSampleDetails = async () => {
      if (!id) return;
      try {
        const data = await getSampleById(id);
        setSampleDetails(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSampleDetails();
  }, [id]);

  useEffect(() => {
    setCreationDate(dayjs(sampleDetails.createdAt).format("MM-DD-YYYY HH:mm:ss"));
    setReceivedDate(dayjs(sampleDetails.receivedDate).format("MM-DD-YYYY HH:mm:ss"));
  }, [sampleDetails]);

  async function handleSave() {
    try {
      await updateSample(sampleDetails.id, formData);
      setIsEditing(false);
      const data = await getSampleById(id);
      setSampleDetails(data);
      setFormData(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleCancel() {
    setFormData(sampleDetails);
    setIsEditing(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sample Details</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-2 txt-sm  bg-blue-600 text-white rounded hover:bg-blue-700"
            title="Edit"
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-2 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              title="Save"
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
              title="close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-[180px_1fr] gap-y-4 gap-x-6">
        <div className="text-sm font-medium text-gray-300">Matrix</div>
        <div className="text-sm text-gray-300">{sampleDetails.matrixName}</div>

        <label className="text-sm font-medium text-gray-300">Sample Name</label>
        {isEditing ? (
          <input
            type="text"
            value={formData.sampleName}
            onChange={(e) => setFormData({ ...formData, sampleName: e.target.value })}
            className="w-full rounded px-3 py-2 text-sm bg-gray-800 border border-gray-600"
          />
        ) : (
          <p className="text-sm text-gray-300">{sampleDetails.sampleName}</p>
        )}

        <label className="text-sm font-medium text-gray-300">Sample Type</label>
        {isEditing ? (
          <input
            type="text"
            value={formData.sampleType}
            onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
            className="w-full rounded px-3 py-2 text-sm bg-gray-800 border border-gray-600"
          />
        ) : (
          <p className="text-sm text-gray-300">{sampleDetails.sampleType}</p>
        )}

        <div className="text-sm font-medium text-gray-300">Created At</div>
        <div className="text-sm text-gray-300">{creationDate}</div>

        <label className="text-sm font-medium text-gray-300">Received Date</label>
        {isEditing ? (
          <input
            type="text"
            value={receivedDate}
            onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
            className="w-full rounded px-3 py-2 text-sm bg-gray-800 border border-gray-600"
          />
        ) : (
          <p className="text-sm text-gray-300">{receivedDate}</p>
        )}

        <div className="text-sm font-medium text-gray-300">Result Count</div>
        <div className="text-sm text-gray-300">{sampleDetails.resultCount}</div>

        <Link className="p-3" href={`/results/${id}`}>
          View results →
        </Link>
      </div>
    </div>
  );
}
