import Pet from '../models/petmodel.js';
export async function createPet(req, res) {
    try {
        const { name, species, breed, age, gender, description, shelter, image } = req.body;

        // Set default image URL if not provided
        const petImage = image || 'https://avatar.iran.liara.run/public';

        const newPet = new Pet({
            name,
            species,
            breed,
            age,
            gender,
            description,
            shelter,
            image: petImage
        });

        const savedPet = await newPet.save();

        res.status(201).json(savedPet);
        console.log('Pet created successfully');
    } catch (error) {
        // Send error response
        res.status(500).json({ message: 'Error creating pet', error });
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

export async function addMultiplePets(req, res) {
    try {
        const pets = req.body; // Assuming the array of pet objects is sent in the request body

        // Assuming Pet is a model from a database ORM like Mongoose
        const insertedPets = await Pet.insertMany(pets);

        res.status(201).json(insertedPets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}