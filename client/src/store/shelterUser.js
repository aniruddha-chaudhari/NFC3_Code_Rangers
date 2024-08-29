import axios from 'axios';
import { User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';

export const useShelterUserStore = create((set) => ({
    shelter: null,
    User: null,
    isLoggingIn: false,
    isLoggingOut: false,
    isSigningUp: false,
    isCheckingAuth: false,

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post('/api/v1/shelter/login', credentials);
            set({ shelter: response.data.shelter,User:response.data.shelter,isLoggingIn: false });
            toast.success('Logged in successfully');
        } catch (error) {
            set({ isLoggingIn: false, shelter: null });
            toast.error(error.response.data.message || 'Something went wrong');
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post('/api/v1/shelter/logout');
            set({ shelter: null, isLoggingOut: false });
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
            set({ isLoggingOut: false });
        }
    },

    signup: async (details) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/v1/shelter/signup', details);
            set({ shelter: response.data.data,User:response.data.shelter, isSigningUp: false });
            toast.success('Signed up successfully');
        } catch (error) {
            set({ isSigningUp: false });
            toast.error(error.response.data.message || 'Something went wrong');
            console.log(shelter);
        }
    },
    shelterCheck: async () => {
        set({ ischeckingAuth: true });
        try {
            const response = await axios.get('/api/v1/shelter/authcheck');
            set({ shelter: response.data.shelter, ischeckingAuth: false });
        } catch (error) {
            set({ shelter: null, ischeckingAuth: false });
        }
        console.log(shelter);
    }

}));