import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Signuppage from './pages/Signup';
import Loginpage from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthstore } from './store/authUser';
import OverviewPage from './pages/Overview';
import Pets from './pages/Pets';
import Petcard from './pages/Pets'; // Import Petcard component
import PetDetail from './pages/PetDetail'; // Import PetDetail component
import PetProfilePage from './pages/Form';
import ContactForm from './pages/email';
import ChatComponent from './pages/chat';
import HomePage from './pages/Community';
import PetCommunityPage from './pages/Community';
import PetAdoptionEventsPage from './pages/PetAdoptionEventsPage';
import PetProfileForm from './pages/participate';
import DonateUs from './pages/donation';

const App = () => {
  const { user, ischeckingAuth, authCheck } = useAuthstore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (ischeckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 z-10 relative overflow-auto flex-1">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-white text-gray-100 overflow-hidden'>
      <Toaster />
      {user && <Sidebar />}
      <Routes>
        <Route path='/' element={user ? <OverviewPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!user ? <Loginpage /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <Signuppage /> : <Navigate to={'/'} />} />
        <Route path='/pets' element={user ? <Pets /> : <Navigate to={"/login"} />} />
        <Route path='/petcard' element={<Petcard />} /> {/* Update path if needed */}
        <Route path="/pets/:_id" element={<PetDetail />} /> {/* Add route for PetDetail */}
        <Route path="/form" element={<PetProfilePage/>} />
        <Route path="/chat" element={<ChatComponent/>} />
        <Route path="/commevent" element={<HomePage />} />
        <Route path="/petcommunity" element={<PetCommunityPage />} />
        <Route path="/events" element={<PetAdoptionEventsPage/>} />
        <Route path="/participate" element={<PetProfileForm/>} />
        <Route path="*" element={<DonateUs/>} />
     

      </Routes>
    </div>
  );
}

export default App;
