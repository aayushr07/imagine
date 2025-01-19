"use client";
import React, { useState } from 'react';

const AnimalHealthForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedImage) {
      alert('Please upload an image');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('/api/classify-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: selectedImage }),
      });
  
      // Check if the response status is not ok (2xx status code)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Read the response as text first
      const textResponse = await response.text();
      console.log('Raw Response:', textResponse);  // Log the raw response to see if it's empty
  
      // Now safely parse the response text as JSON
      const data = textResponse ? JSON.parse(textResponse) : {}; // Avoid empty JSON parsing
  
      setResult(data.predictions);  // Display the classification results
    } catch (error) {
      console.error('Error:', error);
      alert('Error classifying the image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Animal Health Classifier</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageUpload} />
        <button type="submit">Classify Image</button>
      </form>

      {result && (
        <div>
          <h2>Classification Results</h2>
          {result.predictions.map((prediction) => (
            <p key={prediction.name}>
              Disease: {prediction.name}, Confidence: {prediction.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalHealthForm;
