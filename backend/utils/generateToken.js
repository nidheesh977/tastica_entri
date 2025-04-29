import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
   
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
}