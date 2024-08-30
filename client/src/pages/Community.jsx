import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';

const GridItem = ({ icon: Icon, title, description, backgroundImage, onClick, iconColor }) => (
  <div 
    className="rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300 cursor-pointer relative overflow-hidden"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-white opacity-10"></div>
    <div className="relative z-10 flex flex-col items-center">
      <Icon className={`w-24 h-24 mb-4 ${iconColor}`} />
      <h2 className={`text-3xl font-bold mb-2 ${iconColor.replace('text-', 'text-')}`}>{title}</h2>
      <p className="text-center text-white ">{description}</p>
    </div>
  </div>
);

const HomePage = ({ 
  gridSizeClass = "h-[calc(100vh-4rem)]",
  communityBackgroundImage = "public/gridimg/commgrid.jpg",
  eventBackgroundImage = "public/gridimg/eventgrid.jpg"
}) => {
  const navigate = useNavigate();

  const handleEventsClick = () => {
    navigate('/events');
  };

  return (
    <div className="flex-1 relative z-10">
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-8">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ${gridSizeClass}`}>
        <GridItem 
          icon={Users}
          title="Community"
          description="Connect with fellow pet lovers and share your experiences."
          backgroundImage={communityBackgroundImage}
          iconColor="text-purple-800"
        />
        <GridItem 
          icon={Calendar}
          title="Events"
          description="Discover and participate in exciting pet adoption events."
          backgroundImage={eventBackgroundImage}
          onClick={handleEventsClick}
          iconColor="text-yellow-500"
        />
      </div>
    </div></div>
  );
};

export default HomePage;