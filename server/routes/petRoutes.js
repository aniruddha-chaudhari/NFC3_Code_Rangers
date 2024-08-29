import express from "express";
import { createPet, deletePet, getAllPets, getPetById } from "../controller/petcontroller.js";


const router = express.Router();

router.post('/create', createPet);
router.get('/read', getAllPets);
router.delete('/delete/:id', deletePet);
router.get('/read/:id', getPetById);


export default router;

