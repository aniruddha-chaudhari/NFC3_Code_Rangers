import express from "express";
import { addMultiplePets, createPet, deletePet, getAllPets, getPetById } from "../controller/petcontroller.js";


const router = express.Router();

router.post('/create', createPet);
router.get('/read', getAllPets);
router.delete('/delete/:id', deletePet);
router.get('/read/:id', getPetById);
router.post('/pets/bulk', addMultiplePets);


export default router;

