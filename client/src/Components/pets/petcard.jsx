import React, { useState, useEffect } from 'react';
import { usePetStore } from '../../store/addpet';
import { Link } from 'react-router-dom';

const breeds = ['All', 'Black', 'White', 'Green', 'Gray', 'Brown', 'Tan', 'Red'];

export default function Petcard() {
  const [selectedBreed, setSelectedBreed] = useState('All');
  const { getAllPets, pets } = usePetStore();

  useEffect(() => {
    getAllPets(); // Fetch pets when the component mounts
  }, [getAllPets]);

  const handleFilterChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const filteredPets = selectedBreed === 'All' 
    ? pets 
    : pets.filter(pet => pet.breed === selectedBreed);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl px-4">
        {/* Filter Component */}
        <div className="mb-6">
          <label htmlFor="breed-filter" className="block text-gray-700 font-medium mb-2">
            Filter by Breed:
          </label>
          <select
            id="breed-filter"
            value={selectedBreed}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md bg-white text-gray-800"
          >
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-6">
          {filteredPets.map((pet) => (
            <Link
              key={pet.id}
              to={`/pets/${pet._id}`} // Navigate to the pet detail page
              className="group relative shadow-lg rounded-md overflow-hidden bg-white"
              style={{ width: '250px', height: '300px' }} // Set fixed width and height
            >
              <div className="w-full h-2/3 bg-gray-200">
                <img
                  src={pet.image}
                  className="h-full w-full object-cover object-center"
                  alt={pet.name}
                />
              </div>
              <div className="h-1/3 mt-4 flex flex-col items-center justify-center p-2">
                <div className="text-center">
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {pet.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{pet.breed}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
