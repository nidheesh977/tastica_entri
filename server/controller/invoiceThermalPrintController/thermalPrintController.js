

export const thermalPrint = async (req,res) => {
    try{

        res.status(200).json({success:true,message:"Print successfully completed"})

    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}