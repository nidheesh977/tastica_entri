import invoiceModel from "../../model/invoiceModel.js"



export const invoiceTotal = async (req,res) => {
        try{
           
            const {id} = req.shop;

            const result = await invoiceModel.aggregate([
                {$match:{shop:id,invoiceStatus:"paid"}},
                {$group:{
                    _id:null,
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                    count:1
                }}


            ]) 

            res.status(200).json({success:true,message:"Data fetched successfully",data:result})

        }catch(error){
            console.log(error)
            return res.status(500).json({success:false,message:"Internal server error"})
        }
}


export const monthBaseTotal = async (req,res) => {
    try{

        const {id} = req.shop;
        const startYear = 2005;

    

         const startDate = new Date(Date.UTC(startYear, 0, 1));      // Jan 1
    const endDate = new Date(Date.UTC(startYear + 1, 0, 1)); 
    console.log(startDate)
    console.log(endDate)

        const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",createdAt:{$gte:startDate,$lt:endDate}}}
        ]) 
        
        
       res.status(200).json({success:true,message:"Data fetched successfully",data:result})
    }catch(error){
        console.log(error)
            return res.status(500).json({success:false,message:"Internal server error"})
    }
}