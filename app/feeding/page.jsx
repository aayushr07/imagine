'use client';
import { useState } from 'react';
import AnimalForm from '../../components/AnimalForm';

const DietaryPlan = () => {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnimalSubmit = async (animalData) => {
    setLoading(true);
    setError(null);

    try {
      // Send the animal data to the backend
      const response = await fetch('/api/generate-diet-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
      });

      // Handle any errors from the server
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate diet plan');
      }

      const data = await response.json();
      setDietPlan(data); // Set the diet plan if successful
    } catch (error) {
      console.error('Error in submitting form:', error);
      setError(error.message || 'There was an error generating the diet plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dietary Regulation for Animals</h1>
      <AnimalForm onSubmit={handleAnimalSubmit} />

      {/* Loading State */}
      {loading && (
        <div className="text-center mt-4 text-gray-700">
          <p>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg max-w-xl mx-auto">
          <p>{error}</p>
        </div>
      )}

      {/* Display Diet Plan if Available */}
      {dietPlan && (
        <div className="mt-8 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Recommended Diet Plan</h2>

          {/* Food Recommendations */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Food Recommendations</h3>
            <p className="text-lg text-gray-700">{dietPlan.foodRecommendations}</p>
            <ul className="list-disc pl-6 mt-4">
              <li className="text-gray-600">Ensure a high-protein diet for active dogs (e.g., chicken, lamb, or beef).</li>
              <li className="text-gray-600">For cows, add high-calcium feed like hay and silage to improve milk production.</li>
            </ul>
          </div>

          {/* Feeding Schedule */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Feeding Schedule</h3>
            <p className="text-lg text-gray-700">{dietPlan.feedingSchedule}</p>
          </div>

          {/* Additional Recommendations */}
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Additional Recommendations</h3>
            <ul className="list-disc pl-6">
              <li className="text-gray-600">Monitor the animal's weight and adjust food portions based on activity level.</li>
              <li className="text-gray-600">Ensure fresh water is available at all times, especially for cows and chickens.</li>
              {dietPlan.activityLevel && (
                <li className="text-gray-600">For a more active animal, increase the protein intake and feeding frequency.</li>
              )}
            </ul>
          </div>

          {/* Feeding Frequency Benefits */}
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Feeding Frequency</h3>
            {dietPlan.feedingFrequency === 'once-a-day' && (
              <p className="text-lg text-gray-700">Feeding once a day is ideal for sedentary or elderly animals with low activity levels.</p>
            )}
            {dietPlan.feedingFrequency === 'twice-a-day' && (
              <p className="text-lg text-gray-700">Feeding twice a day is standard for most animals to maintain energy levels.</p>
            )}
            {dietPlan.feedingFrequency === 'three-times-a-day' && (
              <p className="text-lg text-gray-700">For active or working animals, three meals a day ensure sustained energy.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DietaryPlan;
