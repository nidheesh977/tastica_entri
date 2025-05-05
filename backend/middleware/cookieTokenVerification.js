import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next) => {
    try{
        const token = req.cookies.staffToken || req.cookies.adminToken || req.cookies.shopToken
        
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

             req.user = decoded

             if(decoded.role === "shop" ){
                req.shop = decoded
             }

            next()
        })

        
    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}