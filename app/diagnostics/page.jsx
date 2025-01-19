'use client';

import { useState } from 'react';
import UploadForm from '../../components/UploadForm';

const DiagnosticsPage = () => {
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSymptoms('');
    setAge('');
    setWeight('');
    setDiagnosticResults(null);
    setError(null);
  };

  const validateInputs = () => {
    if (!symptoms || !age || !weight) {
      setError('Please fill out all fields.');
      return false;
    }
    if (age <= 0 || weight <= 0) {
      setError('Age and weight must be greater than zero.');
      return false;
    }
    return true;
  };

  const handleUpload = async (image) => {
    if (!validateInputs()) return;

    try {
      setLoading(true);

      const reader = new FileReader();

      reader.onloadend = async () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Image = reader.result.split(',')[1];

          if (!base64Image) {
            setError('Failed to extract base64 from the image.');
            setLoading(false);
            return;
          }

          try {
            const response = await fetch('/api/diagnose', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                imageBase64: base64Image,
                symptoms,
                age,
                weight
              }),
            });

            setLoading(false);

            if (!response.ok) {
              throw new Error('Failed to analyze the image.');
            }

            const data = await response.json();

            if (data?.responses?.[0]?.labelAnnotations) {
              setDiagnosticResults(data);
              setError(null);
            } else {
              throw new Error('Invalid analysis response structure.');
            }
          } catch (err) {
            console.error('Error during upload:', err);
            setLoading(false);
            setError('An error occurred while analyzing the image. Please try again.');
          }
        } else {
          setError('Error reading the image file.');
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setLoading(false);
        setError('Failed to read the image file.');
      };

      reader.readAsDataURL(image);
    } catch (err) {
      console.error('Error during upload:', err);
      setLoading(false);
      setError('An error occurred while analyzing the image. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold text-gray-800 mt-10">
        Animal Disease Diagnostics
      </h1>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Symptoms:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Enter the symptoms observed..."
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Age (in years):</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age of the animal"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Weight (in kg):</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight of the animal"
          />
        </div>
      </div>

      <UploadForm onUpload={handleUpload} />

      <div className="mt-6 space-y-4">
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading && (
          <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            Analyzing image... Please wait.
          </div>
        )}

        {diagnosticResults && (
          <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {diagnosticResults.responses[0].labelAnnotations.map((label) => (
                <li key={label.description}>
                  {label.description} ({(label.score * 100).toFixed(2)}%)
                </li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">Summary:</h3>
            <p className="text-gray-700">{diagnosticResults.analysisSummary?.likelyDisease || 'No summary available.'}</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={resetForm}
          className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DiagnosticsPage;
