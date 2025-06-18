
export const logOutStaff = async (req,res) => {
  try{
    res.clearCookie("staffToken")
    res.status(200).json({success:true,message:"staff logged out successfully"})
  }catch(error){
     return res.status(500).json({success:false,message:"internal server error"})
  }
}
