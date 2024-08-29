import React from 'react';
  import { PawPrint } from 'lucide-react';
  const Chatbot = ({ onClose }) => {
    const navigationButtons = [
      { label: 'View Available Pets', action: () => console.log('Viewing available pets') },
      { label: 'Adoption Process', action: () => console.log('Showing adoption process') },
      { label: 'Contact Us', action: () => console.log('Showing contact information') },
      { label: 'Events', action: () => console.log('Showing Events') },
    ];
    
      
    return (
      <div className="fixed bottom-16 right-4 w-80 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden border border-white border-opacity-30">
        <div className="bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white p-4 flex items - cente">
          <PawPrint className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-semibold">FetchBot</h2>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto">
          <p className="mb-6 text-gray-700">Welcome to our pet adoption service! How can I assist you today?</p>
          <div className="space-y-3">
            {navigationButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className="w-full bg-white/50 hover:bg-white/70 text-blue-800 font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out backdrop-blur-sm shadow-md"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Chatbot;

