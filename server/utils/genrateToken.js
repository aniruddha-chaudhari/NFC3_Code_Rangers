import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenandsetcookie = (userId,res) => {
const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"15d"});

res.cookie("jeevsathi_token",token,{
    httpOnly:true,
    sameSite:'strict',
    maxAge:15*24*60*60*1000,
    secure : ENV_VARS.Node_ENV !== "development"
});

return token;
}