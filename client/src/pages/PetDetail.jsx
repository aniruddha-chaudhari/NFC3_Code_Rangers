import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pet from '../Components/pets/petdetail'; // Adjust the path as necessary
import Header from '../Components/common/Header';
import { usePetStore } from '../store/addpet'; // Import your store or data-fetching logic

function PetDetail() {
  const { _id } = useParams();
  const { getPetById } = usePetStore(); // Assuming you have a method to fetch pet by ID
  const [pet, setPet] = useState(null);
  const [relatedPets, setRelatedPets] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      const petData = await getPetById(_id);
      setPet(petData);
      // Fetch related pets if needed
      const relatedPetsData = await getRelatedPets(petData.breed); // Adjust as necessary
      setRelatedPets(relatedPetsData);
    };

    fetchPet();
  }, [_id, getPetById]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <Header title={'Pet Detail'} />
      
      <main className="relative max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Pass the pet and related pets to the Pet component */}
        <Pet pet={pet} relatedPets={relatedPets} />
      </main>
    </div>
  );
}

export default PetDetail;
