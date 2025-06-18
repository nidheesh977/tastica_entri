import AdminStaffModel from '../../model/adminAndStaffModel.js';

export const staffLogged = async (req,res) => {
    try {
        const userLogged = req.user;

        if(userLogged.role !== "staff"){
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        const userExist = await  AdminStaffModel.findById(userLogged.id)
        
        const {password:pass,...userData} = userExist._doc;

        res.status(200).json({success:true,message:"staff is logged in",data:userData});
        
       
    } catch (error) {
      res.status(500).json({success:false,message:"Internal Server Error"})
    }
}