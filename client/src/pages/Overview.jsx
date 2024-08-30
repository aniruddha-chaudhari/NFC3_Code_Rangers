import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/common/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BasicTable from '../Components/common/Table';
import TableNavigation from '../Components/common/Table';

const petColumns = [
  {
      header: 'ID',
      accessorKey: 'id',
  },
  {
      header: 'Name',
      accessorKey: 'name',
  },
  {
      header: 'Breed',
      accessorKey: 'breed',
  },
  {
      header: 'Species',
      accessorKey: 'species',
  },
  {
      header: 'Adopted',
      accessorKey: 'adopted',
  },
  {
      header: 'Adopter Name',
      accessorKey: 'adopterName',
  },
  {
      header: 'Adoption Date',
      accessorKey: 'date',
  },
];

const petData = [
  {
      id: 1,
      name: "Bella",
      breed: "Golden Retriever",
      species: "Dog",
      adopted: true,
      adopterName: "John Doe",
      date: "2024-01-15",
  },
  {
      id: 2,
      name: "Whiskers",
      breed: "Siamese",
      species: "Cat",
      adopted: true,
      adopterName: "Jane Smith",
      date: "2024-02-20",
  },
  {
      id: 3,
      name: "Max",
      breed: "Beagle",
      species: "Dog",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 4,
      name: "Charlie",
      breed: "Labrador Retriever",
      species: "Dog",
      adopted: true,
      adopterName: "Emily Clark",
      date: "2024-03-12",
  },
  {
      id: 5,
      name: "Luna",
      breed: "Maine Coon",
      species: "Cat",
      adopted: true,
      adopterName: "Mark Taylor",
      date: "2024-03-25",
  },
  {
      id: 6,
      name: "Rocky",
      breed: "Bulldog",
      species: "Dog",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 7,
      name: "Milo",
      breed: "Poodle",
      species: "Dog",
      adopted: true,
      adopterName: "Olivia Brown",
      date: "2024-04-05",
  },
  {
      id: 8,
      name: "Daisy",
      breed: "Shih Tzu",
      species: "Dog",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 9,
      name: "Oscar",
      breed: "Persian",
      species: "Cat",
      adopted: true,
      adopterName: "Sophia White",
      date: "2024-04-15",
  },
  {
      id: 10,
      name: "Buddy",
      breed: "Boxer",
      species: "Dog",
      adopted: true,
      adopterName: "David Green",
      date: "2024-05-01",
  },
  {
      id: 11,
      name: "Lucy",
      breed: "Ragdoll",
      species: "Cat",
      adopted: true,
      adopterName: "Liam Johnson",
      date: "2024-05-10",
  },
  {
      id: 12,
      name: "Coco",
      breed: "Pomeranian",
      species: "Dog",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 13,
      name: "Chloe",
      breed: "Sphynx",
      species: "Cat",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 14,
      name: "Bailey",
      breed: "German Shepherd",
      species: "Dog",
      adopted: true,
      adopterName: "Ella Harris",
      date: "2024-06-12",
  },
  {
      id: 15,
      name: "Simba",
      breed: "Bengal",
      species: "Cat",
      adopted: true,
      adopterName: "Mason Lee",
      date: "2024-06-25",
  },
  {
      id: 16,
      name: "Sasha",
      breed: "Doberman",
      species: "Dog",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 17,
      name: "Nala",
      breed: "Husky",
      species: "Dog",
      adopted: true,
      adopterName: "Isabella Martinez",
      date: "2024-07-05",
  },
  {
      id: 18,
      name: "Simone",
      breed: "Russian Blue",
      species: "Cat",
      adopted: true,
      adopterName: "James Wilson",
      date: "2024-07-15",
  },
  {
      id: 19,
      name: "Zeus",
      breed: "Great Dane",
      species: "Dog",
      adopted: false,
      adopterName: "",
      date: "",
  },
  {
      id: 20,
      name: "Pepper",
      breed: "Cockatoo",
      species: "Bird",
      adopted: true,
      adopterName: "Victoria Bennett",
      date: "2024-07-22",
  },
];

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const promises = [];
        const numOfImages = 5;
        for (let i = 0; i < numOfImages; i++) {
          promises.push(axios.get('https://dog.ceo/api/breeds/image/random'));
        }
        const responses = await Promise.all(promises);
        const imageUrls = responses.map(response => response.data.message);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return <div className="text-center">Loading images...</div>;
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-lg shadow-lg">
      <img
        src={images[currentIndex] || "/api/placeholder/800/600"}
        alt={`Image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};



const OverviewPage = () => { 
  return ( 
  <div className='flex-1 overflow-auto relative z-10'> 
  <Header title={'Overview'}></Header> 
  <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'> 
    <ImageCarousel /> 
  <BasicTable columns={petColumns} data={petData} /> 
  </main> 
  </div> ); }; 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  

  const paginatedData = petData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title={'Overview'}></Header>
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <ImageCarousel />
        <div className="mt-8">
          <BasicTable columns={petColumns} data={paginatedData} />
          <TableNavigation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;