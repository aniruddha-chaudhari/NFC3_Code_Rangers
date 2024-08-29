import Shelter from '../models/sheltermodel.js';
import bcryptjs from 'bcryptjs';
import { generateTokenandsetcookie } from '../utils/genrateToken.js'; // Assuming you have this utility function

export async function shelterSignup(req, res) {
    try {
        const { name, email, password, address, phone } = req.body;
        if (!name || !email || !password || !address || !phone) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const existingShelterByEmail = await Shelter.findOne({ email: email });

        if (existingShelterByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newShelter = new Shelter({
            name,
            email,
            password: hashedPassword,
            address,
            phone
        });

        generateTokenandsetcookie(newShelter._id, res);
        await newShelter.save();
        res.status(201).json({
            success: true, shelter: {
                ...newShelter._doc,
                password: ""
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong" });
        console.log(err);
    }
}

export async function shelterLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const shelter = await Shelter.findOne({ email: email });

        if (!shelter) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, shelter.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenandsetcookie(shelter._id, res);
        res.status(200).json({
            success: true, shelter: { ...shelter._doc, password: "" }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}