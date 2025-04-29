
export const staffAuthorizeRole = (...roles) => {
 
    return (req, res, next) => {
        if (!req.user ) {
            
         return res.status(401).json({ message: "Unauthorized role" });
        }

          let  userRole = req.user.role;      
          
        if (!roles.includes(userRole)) {
         return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
}