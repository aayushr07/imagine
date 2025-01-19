'use client';

import { useState } from 'react';

const AnimalForm = ({ onSubmit }) => {
  const [animalType, setAnimalType] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState('');
  const [feedingFrequency, setFeedingFrequency] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      animalType,
      breed,
      age,
      weight,
      healthConditions,
      vaccinationStatus,
      feedingFrequency,
      activityLevel,
      dietaryRestrictions,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-50 to-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Animal Health Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Animal Type */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Animal Type</label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
            required
          >
            <option value="">Select Animal Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="cow">Cow</option>
            <option value="chicken">Chicken</option>
          </select>
        </div>

        {/* Breed */}
        {animalType && (
          <div>
            <label className="block text-lg font-medium text-gray-800">Breed</label>
            <select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
              required
            >
              <option value="">Select Breed</option>
              {(animalType === 'dog') && (
                <>
                  <option value="labrador">Labrador</option>
                  <option value="german shepherd">German Shepherd</option>
                  <option value="beagle">Beagle</option>
                </>
              )}
              {(animalType === 'cat') && (
                <>
                  <option value="persian">Persian</option>
                  <option value="siamese">Siamese</option>
                  <option value="maine coon">Maine Coon</option>
                </>
              )}
              {(animalType === 'cow') && (
                <>
                  <option value="holstein">Holstein</option>
                  <option value="angus">Angus</option>
                  <option value="jersey">Jersey</option>
                </>
              )}
              {(animalType === 'chicken') && (
                <>
                  <option value="broiler">Broiler</option>
                  <option value="layer">Layer</option>
                  <option value="leghorn">Leghorn</option>
                </>
              )}
            </select>
          </div>
        )}

        {/* Age */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Age (in years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
            placeholder="Enter animal age"
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Weight (in kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
            placeholder="Enter animal weight"
            required
          />
        </div>

        {/* Health Conditions */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Health Conditions</label>
          <select
            value={healthConditions}
            onChange={(e) => setHealthConditions(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
          >
            <option value="">Select Health Condition</option>
            <option value="healthy">Healthy</option>
            <option value="allergic">Allergic</option>
            <option value="diabetic">Diabetic</option>
          </select>
        </div>

        {/* Vaccination Status */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Vaccination Status</label>
          <select
            value={vaccinationStatus}
            onChange={(e) => setVaccinationStatus(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
          >
            <option value="">Select Vaccination Status</option>
            <option value="vaccinated">Vaccinated</option>
            <option value="not-vaccinated">Not Vaccinated</option>
            <option value="partially-vaccinated">Partially Vaccinated</option>
          </select>
        </div>

        {/* Feeding Frequency */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Feeding Frequency</label>
          <select
            value={feedingFrequency}
            onChange={(e) => setFeedingFrequency(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
          >
            <option value="">Select Feeding Frequency</option>
            <option value="once-a-day">Once a Day</option>
            <option value="twice-a-day">Twice a Day</option>
            <option value="three-times-a-day">Three Times a Day</option>
          </select>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Activity Level</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
          >
            <option value="">Select Activity Level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-lg font-medium text-gray-800">Dietary Restrictions</label>
          <select
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:shadow-md transition-shadow"
          >
            <option value="">Select Dietary Restrictions</option>
            <option value="none">None</option>
            <option value="gluten-free">Gluten Free</option>
            <option value="dairy-free">Dairy Free</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-lg shadow-lg transition-all"
          >
            Generate Diet Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimalForm;
