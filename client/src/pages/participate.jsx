import React from 'react';
import { PawPrint, Mail, Phone, Calendar } from 'lucide-react';

// Define the list of events (you can update this list as needed)
const events = [
  "Meet the Pets Day", "Doggy Stroll-a-thon", "Kitten Cuddle Festival"
];

// Paw print background component
const PawPrintBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
    {[...Array(20)].map((_, i) => (
      <PawPrint
        key={i}
        className="absolute text-pink-300"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          width: `${Math.random() * 30 + 20}px`,
          height: `${Math.random() * 30 + 20}px`,
        }}
      />
    ))}
  </div>
);

export default function PetProfileForm() {
  return (
    <div className='flex-1 relative'>
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <PawPrintBackground />
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md shadow-lg rounded-3xl overflow-hidden relative z-10">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-3xl font-bold text-pink-600 text-center mb-8">Join Our Furry Friends Event!</h2>
          <form className="space-y-8">
            {/* User Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-purple-700">Your Details</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PawPrint className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="pl-10 block w-full rounded-full border-gray-300 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="Furry Friend Lover"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="pl-10 block w-full rounded-full border-gray-300 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="tel"
                      name="contact"
                      id="contact"
                      className="pl-10 block w-full rounded-full border-gray-300 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                    Choose Your Paw-some Event
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <select
                      id="event"
                      name="event"
                      className="pl-10 block w-full rounded-full border-gray-300 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    >
                      <option value="">Select the event</option>
                      {events.map((event, index) => (
                        <option key={index} value={event}>
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
              >
                Join the Fun!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}