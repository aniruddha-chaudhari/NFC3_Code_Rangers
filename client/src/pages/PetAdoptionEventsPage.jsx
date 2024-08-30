import React, { useState } from 'react';
import { Calendar, MapPin, PawPrint, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Cute paw print background component
const PawPrintBackground = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
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

// EventCard Component (updated for a cuter look)
const EventCard = ({ title, location, date, description, imageUrl }) => (
  <div
    className="relative bg-cover bg-center rounded-3xl shadow-lg p-6 mb-6 text-white overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    style={{ backgroundImage: `url(${imageUrl})`, height: '340px' }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-transparent opacity-70 rounded-3xl"></div>
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-white mr-2" />
          <span className="text-sm font-medium">{location}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-yellow-300">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
      </div>
      <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 w-fit">
        <Calendar className="w-4 h-4 text-yellow-300 mr-2" />
        <span className="text-sm font-medium">{date}</span>
      </div>
    </div>
  </div>
);

// ParticipationModal Component (updated for a cuter look)
const ParticipationModal = ({ isOpen, onClose, onApply }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
      <div className="bg-white bg-opacity-95 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden">
        <PawPrintBackground />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-pink-500">Join the Furry Fun!</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Be a part of our pawsome mission to find loving homes for pets in need. Your participation can make a tail-wagging difference!
          </p>
          <div className="bg-yellow-100 bg-opacity-50 p-4 rounded-2xl mb-6 border-2 border-yellow-200">
            <p className="text-yellow-700 font-medium">
              We review applications weekly. Get ready for some fur-tastic news!
            </p>
          </div>
          <button
            onClick={onApply}
            className="w-full px-6 py-3 bg-pink-500 text-white rounded-full font-bold text-lg hover:bg-pink-600 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Apply Now & Make a Difference!
          </button>
        </div>
      </div>
    </div>
  );
};

// PetAdoptionEventsPage Component (updated for a cuter look)
const PetAdoptionEventsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = () => {
    navigate('/participate');
  };

  return (
    <div className='flex-1 relative over'>
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen p-8 relative">
      <PawPrintBackground />
      <div className="max-w-6xl mx-auto relative">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-8 mb-12 shadow-lg transform hover:scale-105 transition-all duration-300">
          <h2 className="text-4xl font-bold text-white mb-4">Furry Friends Fiesta! 🐾</h2>
          <p className="text-white text-lg">
            Get ready for a tail-wagging good time! Join our events to meet adorable potential fur-ever friends, 
            enjoy playful walks, and learn about being the best pet parent ever!
          </p>
        </div>
        <h3 className="text-3xl font-bold mb-8 text-center text-purple-600">Upcoming Paw-some Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard
            title="Puppy Playtime Paradise"
            location="Central Bark, New York"
            date="AUG 15 - 16, 2024"
            description="A day of frolicking fun! Meet our lovable pups, play fetch, and maybe find your new best friend!"
            imageUrl="/eventsimg/petdays1.png"
          />
          <EventCard
            title="Woof & Walk-a-thon"
            location="Pawside Park, Chicago"
            date="SEP 5 - 6, 2024"
            description="Join our energetic doggos for a stroll in the park. Exercise, socialize, and spread joy on four paws!"
            imageUrl="/eventsimg/petstroll1.png"
          />
          <EventCard
            title="Kitten Cuddle Carnival"
            location="Whisker Wonderland, San Francisco"
            date="OCT 10 - 11, 2024"
            description="Prepare for cuteness overload! Snuggle with our adorable kittens and learn about the joys of cat companionship."
            imageUrl="/eventsimg/kittencuddles1.png"
          />
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-8 bg-pink-500 text-white rounded-full p-4 shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transform transition-all duration-300 hover:scale-110"
        aria-label="Participation Information"
      >
        <PawPrint className="w-8 h-8" />
      </button>
      <ParticipationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyClick}
      />
    </div>
    </div>
  );
};

export default PetAdoptionEventsPage;