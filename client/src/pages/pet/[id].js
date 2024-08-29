// src/pages/pet/[id].js

import { useRouter } from 'next/router';
import React from 'react';

const petDetails = [
  { id: 1, name: 'Dog', breed: 'Black', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg', description: 'Friendly and playful.' },
  { id: 2, name: 'Cat', breed: 'White', imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg', description: 'Calm and independent.' },
  // Add all other pet details here...
];

export default function PetDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const pet = petDetails.find(p => p.id.toString() === id);

  if (!pet) return <div>Pet not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex">
            <img src={pet.imageSrc} alt={pet.name} className="w-64 h-64 object-cover rounded-lg" />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{pet.breed}</p>
              <p className="text-sm text-gray-500 mt-4">{pet.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
