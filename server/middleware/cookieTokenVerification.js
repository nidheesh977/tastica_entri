import jwt from 'jsonwebtoken'

export const userVerifyToken = async (req,res,next) => {
    try{
         
    let token = req.cookies.superAdminToken || req.cookies.adminToken || req.cookies.staffToken


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

             
            next()
        })

        
    }catch(error){
      
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
}