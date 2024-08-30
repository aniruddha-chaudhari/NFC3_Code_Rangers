import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar } from 'lucide-react';

const GridItem = ({ icon: Icon, title, description, backgroundImage, onClick, iconColor }) => (
  <div 
    className="rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-black/30 transition-all duration-300 group-hover:bg-black/10"></div>
    <div className="relative z-10 flex flex-col items-center">
      <Icon className={`w-24 h-24 mb-4 transition-colors duration-300 ${iconColor} group-hover:text-white`} />
      <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${iconColor.replace('text-', 'text-')} group-hover:text-white`}>{title}</h2>
      <p className="text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
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
    <div className="flex-1 overflow-scroll relative z-10">
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
      </div>
    </div>
  );
};

export default HomePage;