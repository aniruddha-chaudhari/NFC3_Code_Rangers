import React, { useState, useEffect } from 'react';
import { usePetStore } from '../../store/addpet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

const breeds = ['All', 'Black', 'White', 'Green', 'Gray', 'Brown', 'Tan', 'Red'];

export default function Petcard() {
  const [selectedBreed, setSelectedBreed] = useState('All');
  const { getAllPets, pets } = usePetStore();

  useEffect(() => {
    getAllPets();
  }, [getAllPets]);

  const handleFilterChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const filteredPets = selectedBreed === 'All' 
    ? pets 
    : pets.filter(pet => pet.breed === selectedBreed);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen flex flex-col items-center py-12">
      <div className="w-full max-w-7xl px-4">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find Your Perfect Companion
        </motion.h1>

        {/* Filter Component */}
        <motion.div 
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative inline-block">
            <select
              id="breed-filter"
              value={selectedBreed}
              onChange={handleFilterChange}
              className="appearance-none bg-white border border-gray-300 rounded-full py-3 px-6 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md transition duration-300 ease-in-out"
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FaPaw className="fill-current h-4 w-4" />
            </div>
          </div>
        </motion.div>

        {/* Pet Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredPets.map((pet, index) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/pets/${pet._id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
              >
                <div className="relative pb-[100%]">
                  <img
                    src={pet.image}
                    className="absolute h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-110"
                    alt={pet.name}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{pet.name}</h3>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {pet.age}
                    </span>
                    <FaPaw className="text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}