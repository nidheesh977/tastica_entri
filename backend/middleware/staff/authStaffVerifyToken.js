import jwt from 'jsonwebtoken';

export const verifyAuthStaffToken = (req, res, next) => {
    const {staffToken} = req.cookies 
   
    if(!staffToken) {
        
        return res.status(401).json({success:false,message:"Unauthorized"})
    } 

     jwt.verify(staffToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({success:false,message:"Token expired"})
            }
            return res.status(403).json({success:false,message:"Forbidden"})
        }
        req.user = decoded 
        next()
    })

    
}

