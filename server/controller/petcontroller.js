import Pet from '../models/petmodel.js';
import axios from 'axios';

export async function createPet(req, res) {
    try {
        const { name, breed, age, gender, description, shelter, image } = req.body;
        
        // Log the entire request body to ensure it is being received correctly
        console.log('Request body:', req.body);
        
        // Log individual fields to verify they are being extracted correctly
        console.log('Extracted fields:', name, breed, age, gender, description, shelter, image);

        async function fetchImageUrl() {
            try {
                const response = await axios.get('https://dog.ceo/api/breeds/image/random'); // Replace with the actual API URL
                return response.data.message; // Adjust based on the actual response structure
            } catch (error) {
                console.error('Error fetching image URL:', error);
                return 'https://avatar.iran.liara.run/public'; // Fallback URL
            }
        }

        // Fetch image URL if not provided
        const petImage = image || await fetchImageUrl();

        const newPet = new Pet({
            name,
            breed,
            age,
            gender,
            description,
            shelter, // Ensure this is either a valid ObjectId or a string based on your schema
            image: petImage
        });

        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Error creating pet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getAllPets(req, res) {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pets', error });
    }
}

// Function to delete a pet
export async function deletePet(req, res) {
    try {
        const { id } = req.params;

        const deletedPet = await Pet.findByIdAndDelete(id);

        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pet', error });
    }
}

export async function getPetById(req, res) {
    try {
        const { id } = req.params;

        // Assuming Pet is a model from a database ORM like Mongoose
        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        console.log('Pet found successfully');
        res.status(200).json(pet);
    } catch (error) {
        console.error(error);
        console.log('Error fetching pet');
        res.status(500).json({ message: 'Server error' });
    }
}

