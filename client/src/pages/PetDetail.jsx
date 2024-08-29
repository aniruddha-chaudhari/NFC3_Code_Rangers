import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pet from '../Components/pets/petdetail'; // Adjust the path as necessary
import Header from '../Components/common/Header';
import { usePetStore } from '../store/addpet'; // Import your store or data-fetching logic

function PetDetail() {
  const { _id } = useParams();
  console.log(_id); // This should log the _id from the URL
  const { getPetById } = usePetStore(); // Assuming you have a method to fetch pet by ID
  const [pet, setPet] = useState(null);
  const [relatedPets, setRelatedPets] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/pet/read/${_id}`);
        const petData = response.data;
        console.log(petData);
        setPet(petData);
        
        // Fetch related pets if needed
        const relatedPetsResponse = await axios.get(`/related-pets?breed=${petData.breed}`); // Adjust as necessary
        const relatedPetsData = relatedPetsResponse.data;
        setRelatedPets(relatedPetsData);
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };
  
    fetchPet();
  }, [_id]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <Header />
      <Pet pet={pet} relatedPets={relatedPets} _id={_id} /> {/* Pass _id as a prop */}
    </div>
  );
}

export default PetDetail;