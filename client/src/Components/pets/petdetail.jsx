'use client'

import { Transition } from '@headlessui/react';
import { HeartIcon, SparklesIcon } from '@heroicons/react/20/solid'

function RelatedPetCard({ pet }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <img
          src={pet.image}
          alt={pet.imageAlt}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900">
          <a href={pet.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {pet.name}
          </a>
        </h3>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-sm text-gray-500">{pet.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function Pet({ pet, relatedPets }) {
  // Extract the pet id
  const petId = pet._id;
  console.log(_id);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start p-6">
      <div className="backdrop-blur-lg bg-opacity-50 rounded-lg shadow-lg p-6 transition ease-in-out duration-500 hover:shadow-2xl hover:backdrop-blur-xl max-w-7xl w-full">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex space-x-2 text-sm text-gray-500">
            {pet.breadcrumbs.map((breadcrumb) => (
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

        {/* Main Content Layout */}
        <div className="lg:flex lg:space-x-8 mt-6">
          {/* Image gallery */}
          <div className="lg:w-1/2 grid grid-cols-1 gap-6">
            {pet.images.map((image, index) => (
              <Transition
                key={index}
                show={true}
                enter="transform transition duration-500"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="transform transition duration-500"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-90"
              >
                <div className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Transition>
            ))}
          </div>

          {/* Pet info and details */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{pet.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{pet.price}</p>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">Pet-sonality Profile</h3>
              <p className="mt-4 text-sm text-gray-600">{pet.details}</p>
            </div>

            {/* Button group */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white px-6 py-3 font-medium text-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <HeartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Adopt Now
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-pink-500 text-white px-6 py-3 font-medium text-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <SparklesIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                Spread Joy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Pets Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Discover More Adorable Companions</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {relatedPets.map((relatedPet) => (
            <RelatedPetCard key={relatedPet.id} pet={relatedPet} />
          ))}
        </div>
      </div>
    </div>
  )
}
