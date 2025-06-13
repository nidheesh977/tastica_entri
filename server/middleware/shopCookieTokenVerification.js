import jwt from 'jsonwebtoken'

export const shopVerifyToken = async (req,res,next) => {
    try{
        const token =  req.cookies.shopToken
        
        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized"})
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY,(err,decoded) => {
            
            if (err) {
                
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ success: false, message: "Token expired" });
                }
                return res.status(403).json({ success: false, message: "Forbidden" });
            }

             req.shop = decoded

             
            next()
        })

        
    }catch(error){
        
       return res.status(500).json({ success: false, message: "Internal server error" });
    }
}