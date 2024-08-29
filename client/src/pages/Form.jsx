import React from 'react';
import PetProfileForm from '../Components/pets/form';// Adjust the path as necessary
import Header from '../Components/common/Header'; // Adjust the path as necessary

function PetProfilePage() {
  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <Header title={'Pet Profile'} />
      
      <main className="relative max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <PetProfileForm />
      </main>
    </div>
  );
}

export default PetProfilePage;
