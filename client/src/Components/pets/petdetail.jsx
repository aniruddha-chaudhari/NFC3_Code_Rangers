'use client'

import { Transition } from '@headlessui/react';
import { HeartIcon, SparklesIcon } from '@heroicons/react/20/solid';

export default function Pet({ pet }) {
  // Ensure pet object is defined
  if (!pet) {
    return <div>Loading...</div>;
  }

  // Extract the pet image
  const petImage = pet.image;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start p-6">
      <div className="backdrop-blur-lg bg-opacity-50 rounded-lg shadow-lg p-6 transition ease-in-out duration-500 hover:shadow-2xl hover:backdrop-blur-xl max-w-7xl w-full">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex space-x-2 text-sm text-gray-500">
            {pet.breadcrumbs && pet.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <a href={breadcrumb.href} className="hover:text-gray-700">
                  {breadcrumb.name}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-4 w-4 text-gray-300 mx-1"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </li>
            ))}
            <li className="text-gray-700">{pet.name}</li>
          </ol>
        </nav>

        <div className="lg:flex lg:space-x-8 mt-6">
          {/* Image gallery */}
          <div className="lg:w-1/2 grid grid-cols-1 gap-6">
            {petImage && (
              <img
              src={petImage}
              className="w-64 h-64 object-cover object-center rounded-lg"
              alt={pet.name}
            />
            )}
          </div>

          {/* Pet details */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
            <p className="text-lg text-gray-700">{pet.description}</p>
            <div className="flex items-center space-x-4">
              <HeartIcon className="h-6 w-6 text-red-500" />
              <SparklesIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-sm text-gray-500">
              <p>Age: {pet.age}</p>
              <p>Breed: {pet.breed}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}