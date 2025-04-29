import jwt from 'jsonwebtoken';

export const verifyAuthAdminToken = (req, res, next) => {
    const {adminToken} = req.cookies 
 
    if(!adminToken) {
        
        return res.status(401).json({success:false,message:"Unauthorized"})
    }
  
     jwt.verify(adminToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            
            return res.status(403).json({success:false,message:"Forbidden"})
        }
        
        req.admin = decoded
        next()
    })

    
}

