

export const checkPermission = (permission) => {
     return (req,res,next) => {
            try{
            let userPermission =  req.user.permissions || []

            if(!userPermission.includes(permission)){
                return res.status(400).json({success:false,message:"Permission denied"})
            }

            next()
            }catch(error){
                console.log()
                return res.status(400).json({success:false,message:"permission denied"})
            }
        }
}