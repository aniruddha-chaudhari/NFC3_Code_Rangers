import express from "express";
import { createPet, deletePet, getAllPets } from "../controller/petcontroller.js";


const router = express.Router();

router.post('/create', createPet);
router.get('/read', getAllPets);
router.delete('/delete/:id', deletePet);


export default router;

