import React, { useState } from 'react';

const petss = [
  { id: 1, name: 'Dog', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg', breed: 'Black' },
  { id: 2, name: 'Cat', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg', breed: 'White' },
  { id: 3, name: 'Bird', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg', breed: 'Green' },
  { id: 4, name: 'Rabbit', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg', breed: 'Gray' },
  { id: 5, name: 'Hamster', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-05.jpg', breed: 'Brown' },
  { id: 6, name: 'Turtle', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-06.jpg', breed: 'Green' },
  { id: 7, name: 'Ferret', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-07.jpg', breed: 'White' },
  { id: 8, name: 'Guinea Pig', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-08.jpg', breed: 'Tan' },
  { id: 9, name: 'Chinchilla', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-09.jpg', breed: 'Gray' },
  { id: 10, name: 'Squirrel', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-10.jpg', breed: 'Brown' },
  { id: 11, name: 'Parrot', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-11.jpg', breed: 'Red' },
  { id: 12, name: 'Lizard', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-12.jpg', breed: 'Green' },
];

const breeds = ['All', 'Black', 'White', 'Green', 'Gray', 'Brown', 'Tan', 'Red'];

export default function Petcard() {
  const [selectedBreed, setSelectedBreed] = useState('All');

  const handleFilterChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const filteredPets = selectedBreed === 'All' ? petss : petss.filter(pet => pet.breed === selectedBreed);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl px-4">
        {/* Filter Component */}
        <div className="mb-6">
          <label htmlFor="breed-filter" className="block text-gray-700 font-medium mb-2">Filter by Breed:</label>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="group relative shadow-lg rounded-md overflow-hidden bg-white">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <img
                  src={pet.imageSrc}
                  className="h-full w-full object-cover object-center"
                  alt={pet.name}
                />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <div className="text-center">
                  <h3 className="text-sm text-gray-700">
                    <a href={pet.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {pet.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{pet.breed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
