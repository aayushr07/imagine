// components/UploadForm.jsx
'use client';

import React, { useState } from 'react';

const UploadForm = ({ onUpload }) => {
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError('No file selected!');
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file!');
      return;
    }

    setError(null); // Clear previous errors
    onUpload(file); // Send the valid file to the parent component
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-gray-700 border border-gray-300 rounded-md p-2"
      />
      {error && <div className="error text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default UploadForm;
