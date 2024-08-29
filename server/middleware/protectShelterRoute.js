import jwt from 'jsonwebtoken';
import Shelter from '../models/sheltermodel.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectShelterRoute = async (req, res, next) => {
    try {
        const token = req.cookies['shelter_token'];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        const shelter = await Shelter.findById(decoded.shelterId).select('-password');
        if (!shelter) {
            return res.status(404).json({
                success: false,
                message: 'Shelter not found'
            });
        }

        req.shelter = shelter;
        console.log(req.shelter);
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};