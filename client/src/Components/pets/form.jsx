import React, { useState } from 'react';
import { PhotoIcon, DocumentIcon } from '@heroicons/react/24/solid';

const petBreeds = [
  "Dog - Labrador Retriever", "Dog - German Shepherd", "Dog - Golden Retriever",
  "Cat - Persian", "Cat - Siamese", "Cat - Maine Coon",
  "Bird - Parrot", "Bird - Canary", "Bird - Cockatiel",
  "Fish - Goldfish", "Fish - Betta", "Fish - Guppy",
  "Rabbit - Holland Lop", "Rabbit - Lionhead", "Rabbit - Dutch",
  "Hamster - Syrian", "Hamster - Dwarf Campbell Russian", "Hamster - Roborovski",
  // Add more breeds as needed
];

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
    certificates: {
      registration: null,
      pollution: null,
      health: null,
      microchip: null
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        certificates: {
          ...prevData.certificates,
          [name]: files[0]
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process formData as needed
    console.log(formData);
  };

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
                  <label htmlFor="petName" className="block text-sm font-medium text-gray-700">
                    Pet Name
                  </label>
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
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
                    Breed
                  </label>
                  <select
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a breed</option>
                    {petBreeds.map((breed, index) => (
                      <option key={index} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
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
                  <label htmlFor="petGender" className="block text-sm font-medium text-gray-700">
                    Pet Gender
                  </label>
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
                        <label htmlFor="adopted" className="ml-3 block text-sm font-medium text-gray-700">
                          Adopted
                        </label>
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
                        <label htmlFor="not-adopted" className="ml-3 block text-sm font-medium text-gray-700">
                          Not Adopted
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            {/* Pet Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Pet Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Pet Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white"
                  placeholder="Tell us about your pet..."
                />
              </div>
            </div>

            {/* Shelter Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Shelter Details</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="shelterName" className="block text-sm font-medium text-gray-700">
                    Shelter Name
                  </label>
                  <input
                    type="text"
                    name="shelterName"
                    id="shelterName"
                    value={formData.shelterName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="shelterContact" className="block text-sm font-medium text-gray-700">
                    Shelter Contact
                  </label>
                  <input
                    type="number"
                    name="shelterContact"
                    id="shelterContact"
                    value={formData.shelterContact}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="shelterEmail" className="block text-sm font-medium text-gray-700">
                    Shelter Email
                  </label>
                  <input
                    type="email"
                    name="shelterEmail"
                    id="shelterEmail"
                    value={formData.shelterEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="shelterAddress" className="block text-sm font-medium text-gray-700">
                    Shelter Address
                  </label>
                  <input
                    type="text"
                    name="shelterAddress"
                    id="shelterAddress"
                    value={formData.shelterAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
              <div className="space-y-4">
                {[
                  { id: 'registration', label: 'Certificate of Registration from the state\'s Animal Welfare Board' },
                  { id: 'pollution', label: 'Pollution authorization from the State Pollution Control Board (SPCB)' },
                  { id: 'health', label: 'Veterinary health certificate' },
                  { id: 'microchip', label: 'Microchip certificate' },
                ].map((cert) => (
                  <div key={cert.id} className="flex items-center space-x-2">
                    <label htmlFor={cert.id} className="block text-sm font-medium text-gray-700 flex-grow">
                      {cert.label}
                    </label>
                    <div className="flex items-center">
                      <input
                        id={cert.id}
                        name={cert.id}
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={cert.id}
                        className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <DocumentIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Upload PDF
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vaccination Details */}
            <div>
              <label htmlFor="vaccination" className="block text-sm font-medium text-gray-700">
                Vaccination Details
              </label>
              <div className="mt-1">
                <textarea
                  id="vaccination"
                  name="vaccination"
                  rows={4}
                  value={formData.vaccination}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md text-gray-900 bg-white"
                  placeholder="Enter vaccination details here..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
