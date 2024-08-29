import React from 'react';
import Petcard from '../Components/pets/petcard'; // Adjust the path as necessary
import Header from '../Components/common/Header';

function Pets() {
  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <Header title={'Pets'} />
      
      <main className="relative max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <Petcard />
      </main>
    </div>
  );
}

export default Pets;
