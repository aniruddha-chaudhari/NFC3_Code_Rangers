import axios from 'axios';
import { toast } from 'react-hot-toast';
import { LogOut, User } from 'lucide-react';
import { create } from 'zustand';

export const useAuthstore = create((set) => ({
    User: null,
    isSigningUp: false,
    ischeckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials);
            set({ User: response.data.user, isSigningUp: false });
            toast.success('account created successfully');
        }
        catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
            set({ isSigningUp: false, User: null });
            console.log(error);
        }
    },
    login: async (credentials) => {
        isLoggingIn: true;
        try {
            const response = await axios.post('/api/v1/auth/login', credentials);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success('Logged in successfully');
        }
        catch (error) {
            set({ isLoggingIn: false, user: null });
            toast.error(error.response.data.message || 'Something went wrong');
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post('/api/v1/auth/logout');
            set({ user: null, isLoggingOut: false });
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong');
            set({ isLoggingOut: false });
        }
    },
    authCheck: async () => {
        try {
            const response = await axios.get('/api/v1/auth/authcheck');
            set({ user: response.data.user, ischeckingAuth: false });

        } catch (error) {
            set({ user: null, ischeckingAuth: false });
        }
    }
}
));