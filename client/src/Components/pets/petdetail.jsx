import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transition, Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { HeartIcon, SparklesIcon } from '@heroicons/react/20/solid';
import Email from '../../pages/email';
import { Navigate } from 'react-router-dom';

const Pet = ({ pet }) => {
  const navigate = useNavigate();
  if (!pet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"
        />
      </div>
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const petImage = pet.image;
  const handledonate = () => {
  navigate('/donation');
  }

  const product = {
    name: pet.name || 'Pet',
    price: pet.price || 'Priceless',
    breadcrumbs: pet.breadcrumbs || [{ id: 1, name: 'Adoptions', href: '#' }],
    images: [{ src: petImage || '/api/placeholder/400/400', alt: `Image of ${pet.name || 'a pet'}` }],
    description: pet.description || 'This adorable pet is looking for a loving home!',
    details: pet.details || `${pet.name || 'This pet'} has been health-checked, vaccinated, and is ready for immediate adoption.`,
  };

  const relatedProducts = [
    {
      id: 1,
      name: 'Pet Food',
      href: '#',
      imageSrc: '/api/placeholder/100/100',
      imageAlt: 'Premium pet food',
      description: 'High-quality nutrition for your furry friend',
    },
    {
      id: 2,
      name: 'Pet Bed',
      href: '#',
      imageSrc: '/api/placeholder/100/100',
      imageAlt: 'Comfortable pet bed',
      description: 'Cozy and comfortable for sweet dreams',
    },
    {
      id: 3,
      name: 'Pet Toys Set',
      href: '#',
      imageSrc: '/api/placeholder/100/100',
      imageAlt: 'Set of pet toys',
      description: 'Fun and engaging toys for playtime',
    },
  ];

  return (
   
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen flex flex-col items-center justify-start p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-filter backdrop-blur-xl bg-white bg-opacity-30 rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:bg-opacity-40 max-w-7xl w-full"
      >
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex space-x-2 text-sm text-gray-600">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <a href={breadcrumb.href} className="hover:text-gray-900 transition-colors duration-200">
                  {breadcrumb.name}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-4 w-4 text-gray-400 mx-1"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </li>
            ))}
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="lg:flex lg:space-x-8 mt-6">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 grid grid-cols-1 gap-6"
          >
            {product.images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out"
              >
                <img alt={image.alt} src={image.src} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

          {/* Product info and details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:w-1/2 mt-10 lg:mt-0 space-y-6"
          >
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>
            <p className="text-2xl text-indigo-600 font-semibold">{product.price}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>

            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} className="bg-red-100 bg-opacity-50 p-2 rounded-full">
                <HeartIcon className="h-8 w-8 text-red-500" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="bg-yellow-100 bg-opacity-50 p-2 rounded-full">
                <SparklesIcon className="h-8 w-8 text-yellow-500" />
              </motion.div>
            </div>

            <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pet-sonality Profile</h3>
              <p className="text-gray-700 leading-relaxed">{product.details}</p>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Age: {pet.age}</p>
              <p>Breed: {pet.breed}</p>
            </div>

            {/* Button group */}
            <div className="flex space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="flex-1 inline-flex items-center justify-center rounded-full bg-indigo-600 text-white px-6 py-3 font-medium text-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
                onClick={toggleModal}
              >
                <HeartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                Adopt Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handledonate}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-pink-500 text-white px-6 py-3 font-medium text-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
              >
                <SparklesIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                Donate
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Related Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8 text-center">Discover More Pet Essentials</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="group relative bg-white bg-opacity-40 backdrop-filter backdrop-blur-md p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                  src={relatedProduct.imageSrc}
                  alt={relatedProduct.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{relatedProduct.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{relatedProduct.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Email Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Adopt {pet.name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <Email toggleModal={toggleModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  );
};

export default Pet;