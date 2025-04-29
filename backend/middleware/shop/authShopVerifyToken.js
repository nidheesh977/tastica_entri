import jwt from 'jsonwebtoken';

export const verifyAuthShopToken = (req, res, next) => {
    const {shopToken} = req.cookies 
   
    if(!shopToken) {
        
        return res.status(401).json({success:false,message:"Unauthorized"})
    } 

     jwt.verify(shopToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({success:false,message:"Token expired"})
            }
            return res.status(403).json({success:false,message:"Forbidden"})
        }
        req.shop = decoded 
        next()
    })

    
}

