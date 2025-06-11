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
           
            return res.status(500).json({success:false,message:"Internal server error"})
        }
    }


    export const monthBaseTotal = async (req,res) => {
      try{

        const {id} = req.shop;
        
        const date = new Date()

        const month = date.getMonth()
    

        const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",createdAt:{$gte:new Date(date.getFullYear(),month,1)}}},
            {$group:{
                    _id:{month:{$month:"$createdAt"}},
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    _id:0,
                    month:"$_id.month",
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1
                }},

                {
                    $sort:{month:1}
                }
        ]) 
         
        
       res.status(200).json({success:true,message:"Data fetched successfully",data:result})
    }catch(error){

            return res.status(500).json({success:false,message:"Internal server error"})
    }
    }

    export const yearBaseSale = async (req,res) => {
     try{
        const {id} = req.shop;
         
        const date = new Date()
        const getYear = date.getFullYear()
         const startDate = new Date(new Date().getFullYear() ,0,1);
         const endDate = new Date(new Date().getFullYear() ,0,1)

         console.log(startDate)
         console.log(endDate)
         console.log(getYear)

            const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",createdAt:{$gte:startDate,$lt:endDate}}},
            {$group:{
                    _id:{year:{$year:"$createdAt"}},
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    _id:0,
                    year:"$_id.year",
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1
                }},

                {
                    $sort:{year:1}
                }
        ]) 
         
        
       res.status(200).json({success:true,message:"Data fetched successfully",data:result})

    }catch(error){
     
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}


export const paymentMethodInvoice = async (req,res) =>{
    try{
        const {id} = req.shop;
        const {month,day,method,year} = req.body;

        if(!month || !day || !method || !year){
            return res.status(400).json({success:false,message:"All data required"})
        }
        
        let targetDate;
        let endDate; 
               
        const yearGet = String(year).padStart(2,"0")
        const monthGet = String(month).padStart(2,"0")
        const dayOfMonth = String(day).padStart(2,"0")
        const nextDay = String(day + 1).padStart(2,"0")


         targetDate = new Date(`${yearGet}-${monthGet}-${dayOfMonth}`)
         endDate = new Date(`${yearGet}-${monthGet}-${nextDay}`)
                    
            const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",paymentMethod:method,createdAt:{$gte:targetDate,$lt:endDate}}},
            {$group:{
                    _id:null,
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    _id:0,
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1,
                     method
                }},

                
             
        ])          
     res.status(200).json({success:true,message:"Data fetched successfully",data:result})
    }catch(error){
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}