import express from 'express';
import { shelterSignup, shelterLogin } from '../controller/sheltercontroller.js';

const router = express.Router();

// Shelter signup route
router.post('/signup', shelterSignup);

// Shelter login route
router.post('/login', shelterLogin);

export default router;