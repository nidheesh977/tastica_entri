import jwt from 'jsonwebtoken';

export const generateToken = (payload,expireTime) => {
   
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expireTime,
    });
}