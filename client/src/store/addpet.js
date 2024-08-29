import axios from 'axios';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';

export const usePetStore = create((set) => ({
    pets: [],
    isLoading: false,
    error: null,
    
    createPet: async (petData) => {
        set({ isLoading: true });
        try {
            const response = await axios.post('/api/v1/pet/create', petData);
            set((state) => ({ pets: [...state.pets, response.data], isLoading: false }));
            toast.success('Pet created successfully');
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || 'Something went wrong' });
            toast.error(error.response.data.message || 'Something went wrong');
        }
    },
    
    getAllPets: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('/api/v1/pet/read');
            set({ pets: response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || 'Something went wrong' });
            toast.error(error.response.data.message || 'Something went wrong');
        }
    },
    
    deletePet: async (id) => {
        set({ isLoading: true });
        try {
            await axios.delete(`/api/v1/pet/${id}`);
            set((state) => ({ pets: state.pets.filter(pet => pet._id !== id), isLoading: false }));
            toast.success('Pet deleted successfully');
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || 'Something went wrong' });
            toast.error(error.response.data.message || 'Something went wrong');
        }
    }
}));