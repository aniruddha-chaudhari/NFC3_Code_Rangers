import React, { useState } from 'react';
import { PhotoIcon, DocumentIcon } from '@heroicons/react/24/solid';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { usePetStore } from '../../store/addpet';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtqx1ieE4Uk1qqL17w1akyIcxhQDStxAA",
  authDomain: "nfc3-c7eda.firebaseapp.com",
  projectId: "nfc3-c7eda",
  storageBucket: "nfc3-c7eda.appspot.com",
  messagingSenderId: "969449084959",
  appId: "1:969449084959:web:ab54f261096f66a40f1d2a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const petBreeds = [
  "Dog - Labrador Retriever", "Dog - German Shepherd", "Dog - Golden Retriever",
  "Cat - Persian", "Cat - Siamese", "Cat - Maine Coon",
  "Bird - Parrot", "Bird - Canary", "Bird - Cockatiel",
  "Fish - Goldfish", "Fish - Betta", "Fish - Guppy",
  "Rabbit - Holland Lop", "Rabbit - Lionhead", "Rabbit - Dutch",
  "Hamster - Syrian", "Hamster - Dwarf Campbell Russian", "Hamster - Roborovski",
  // Add more breeds as needed
];



const shelterid = 'djcjsdnvsdnkvk';

export default function PetProfileForm() {
  const [formData, setFormData] = useState({
    petName: '',
    breed: '',
    age: '',
    petGender: '',
    adoptionStatus: '',
    description: '',
    shelterName: '',
    shelterContact: '',
    shelterEmail: '',
    shelterAddress: '',
    vaccination: '',
    petImage: null,
    certificates: {
      registration: null,
      pollution: null,
      health: null,
      microchip: null
    }
  });

  const [uploadStatus, setUploadStatus] = useState({});
  const [imageUploadStatus, setImageUploadStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      if (name === 'petImage') {
        setFormData(prevData => ({
          ...prevData,
          petImage: files[0]
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          certificates: {
            ...prevData.certificates,
            [name]: files[0]
          }
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleUpload = (file, certificateType, isImage = false) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        const message = "No file selected";
        if (isImage) {
          setImageUploadStatus(message);
        } else {
          setUploadStatus(prevStatus => ({ ...prevStatus, [certificateType]: message }));
        }
        reject(message);
        return;
      }
      const storageRef = ref(storage, isImage ? `images/${file.name}` : `certificates/${certificateType}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progressMessage = `Upload is ${progress}% done`;
          if (isImage) {
            setImageUploadStatus(progressMessage);
          } else {
            setUploadStatus(prevStatus => ({ ...prevStatus, [certificateType]: progressMessage }));
          }
        },
        (error) => {
          const errorMessage = `Upload failed: ${error.message}`;
          if (isImage) {
            setImageUploadStatus(errorMessage);
          } else {
            setUploadStatus(prevStatus => ({ ...prevStatus, [certificateType]: errorMessage }));
          }
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const successMessage = `File uploaded successfully: ${downloadURL}`;
            if (isImage) {
              setImageUploadStatus(successMessage);
              setImageUrl(downloadURL);
              console.log("Image available at", downloadURL);
            } else {
              setUploadStatus(prevStatus => ({ ...prevStatus, [certificateType]: successMessage }));
              console.log("File available at", downloadURL);
            }
            resolve(downloadURL);
          });
        }
      );
    });
  };
const {createPet} = usePetStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageLink = "";
      if (formData.petImage) {
        imageLink = await handleUpload(formData.petImage, null, true);
      }
      
      // Prepare the data to be sent to the database
      const dataToSend = {
        name: formData.petName,
        breed: formData.breed,
        age: formData.age,
        gender: formData.petGender,
        description: formData.description,
        shelter:shelterid,
        image: imageLink
      };

      // Here you would typically send this data to your backend API
      console.log("Data to be sent:", dataToSend);
      createPet(dataToSend);
      console.log('Pet created successfully');
      

      // For demonstration purposes, we're just logging the data
      // In a real application, you would make an API call here
      // Example:
      // const response = await fetch('/api/pet-profile', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(dataToSend),
      // });
      // if (response.ok) {
      //   console.log('Profile saved successfully');
      // } else {
      //   console.error('Failed to save profile');
      // }

    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  // ... (rest of the component remains the same)

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pet Profile for Adoption</h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Pet Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Pet Basic Information</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="petName" className="block text-sm font-medium text-gray-700">Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    id="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
                  <select
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a breed</option>
                    {petBreeds.map((breed, index) => (
                      <option key={index} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="petGender" className="block text-sm font-medium text-gray-700">Pet Gender</label>
                  <select
                    id="petGender"
                    name="petGender"
                    value={formData.petGender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Adoption Status Radio Buttons */}
                <div className="sm:col-span-6">
                  <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Adoption Status</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="adopted"
                          name="adoptionStatus"
                          type="radio"
                          value="Adopted"
                          checked={formData.adoptionStatus === 'Adopted'}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="adopted" className="ml-3 block text-sm font-medium text-gray-700">Adopted</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="not-adopted"
                          name="adoptionStatus"
                          type="radio"
                          value="Not Adopted"
                          checked={formData.adoptionStatus === 'Not Adopted'}
                          onChange={handleChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="not-adopted" className="ml-3 block text-sm font-medium text-gray-700">Not Adopted</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Write a short description about the pet"
                  />
                </div>

                {/* Shelter Information */}
               

                {/* Vaccination Status */}
                <div className="sm:col-span-3">
                  <label htmlFor="vaccination" className="block text-sm font-medium text-gray-700">Vaccination Status</label>
                  <select
                    id="vaccination"
                    name="vaccination"
                    value={formData.vaccination}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select vaccination status</option>
                    <option value="Fully Vaccinated">Fully Vaccinated</option>
                    <option value="Partially Vaccinated">Partially Vaccinated</option>
                    <option value="Not Vaccinated">Not Vaccinated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pet Image Upload */}
            <div className="sm:col-span-6">
              <label htmlFor="petImage" className="block text-sm font-medium text-gray-700">Pet Image</label>
              <input
                type="file"
                name="petImage"
                id="petImage"
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span>{imageUploadStatus}</span>
            </div>

            {/* Certificates Upload */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Upload Certificates</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="registration" className="block text-sm font-medium text-gray-700">Registration Certificate</label>
                  <input
                    type="file"
                    name="registration"
                    id="registration"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{uploadStatus.registration}</span>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="pollution" className="block text-sm font-medium text-gray-700">Pollution Certificate</label>
                  <input
                    type="file"
                    name="pollution"
                    id="pollution"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{uploadStatus.pollution}</span>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="health" className="block text-sm font-medium text-gray-700">Health Certificate</label>
                  <input
                    type="file"
                    name="health"
                    id="health"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{uploadStatus.health}</span>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="microchip" className="block text-sm font-medium text-gray-700">Microchip Certificate</label>
                  <input
                    type="file"
                    name="microchip"
                    id="microchip"
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{uploadStatus.microchip}</span>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}