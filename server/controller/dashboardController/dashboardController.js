import invoiceModel from "../../model/invoiceModel.js"
import { paymentMethods } from "../../utils/aggregatePaymentMethod.js";



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

        const id = req.query.shop || req.shop?.id ;
        
        const {methods} = req.query; 

        const date =  new Date() 

        const year = date.getFullYear()
        
         const startDate = new Date(parseInt(year) ,0,1);
         const endDate = new Date(parseInt(year + 1),0,1)


        const {method,fieldName} = paymentMethods(methods)

        const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
   

        const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",[fieldName]:method,createdAt:{$gte:startDate,$lt:endDate}}},
            {$group:{
                    _id:{month:{$month:"$createdAt"}},
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    _id:0,
                    month:"$_id.month",
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1,
                     methodType:method,
                }},

                {
                    $sort:{month:1}
                }
        ]) 
         
        const addMonths = result.map(item => ({
            count:item.count,
            month:months[item.month],
            roundedTotalAmount:item.roundedTotalAmount,
            methodType:item.methodType
        }))

        
        
       res.status(200).json({success:true,message:"Data fetched successfully",data:addMonths})
    }catch(error){
       return res.status(500).json({success:false,message:"Internal server error"})
    }
    }


    export const weeklySale = async (req,res) => {
        try{

            const id = req.query.shop || req.shop?.id;

            const {methods} =req.query;

            console.log(id)

            const now = new Date()

            const startOfWeek = new Date(now)
                  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7))
                  startOfWeek.setHours(0, 0, 0, 0)

                  
            const endOfWeek = new Date(startOfWeek)
                  endOfWeek.setDate(startOfWeek.getDate() + 6)
                  endOfWeek.setHours(23,59,59,999)

            const {method,fieldName} = paymentMethods(methods);

            

            const days = ["" , "Sunday" ,  "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"]
                  
                  const result = await invoiceModel.aggregate([
                    {$match:{shop:id,invoiceStatus:"paid",[fieldName]:method,createdAt:{$gte:startOfWeek,$lt:endOfWeek}}},

                    {$group:{
                    _id:{day:{$dayOfWeek:"$createdAt"}},
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                     }},

                       {$project:{
                    _id:0,
                    day:"$_id.day",
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1
                }},

                {$sort:{day:1}}
                  ])



                  const addDays = result.map(item => ({
                        count:item.count,
                        roundedTotalAmount:item.roundedTotalAmount,
                        day:days[item.day]
                  }))

                  res.status(200).json({success:true,message:"Data fetched successfully",data:addDays})
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false,message:"Internal server error"})
        }
    }

    export const yearBaseSale = async (req,res) => {
     try{
        
        
        const id = req.query.shop || req.shop?.id;
         
        const {methods} =req.query;
        

        const startDate = new Date(new Date().getFullYear() ,0,1);
 
        const {method,fieldName} = paymentMethods(methods);
   

            const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",[fieldName]:method,createdAt:{$gte:startDate,}}},
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

         const id = req.query.shop || req.shop?.id;
        const {month,day,year} = req.query;


     

        const y = parseInt(year)
        const m = parseInt(month)
        const d = parseInt(day)
        
        let startDate;
        let endDate; 
        if(y && m && d ){
            startDate = new Date(y,  m - 1, d)
            endDate = new Date(y , m - 1 , d + 1)
        }else if(y && m){
            startDate = new Date(y, m - 1, 1)
            endDate = new Date(y , m, 1)
        }
        else if(y){
            startDate = new Date(y,  0, 1)
            endDate = new Date(y + 1,  0, 1)
        }else{
            startDate = new Date( new Date.getFullYear(), 0 , 1)
            endDate = new Date( new Date.getFullYear() + 1, 0 , 1)
         
        }



       const groupId = {
        paymentMethod:"$paymentMethod"
       }

       if(!day && !month){
        groupId.year = {$year:"$createdAt"}
       }else if(!day && month){
        groupId.year = {$year:"$createdAt"}
        groupId.month = {$month:"$createdAt"}
       }else if(day){
        groupId.year = {$year:"$createdAt"}
        groupId.month = {$month:"$createdAt"}
        groupId.day = {$dayOfMonth:"$createdAt"}

       }
    
                    
        const result = await invoiceModel.aggregate([
          {$match:{shop:id,invoiceStatus:"paid",paymentMethod:{$in:["cash","internal-device","digital"]},createdAt:{$gte:startDate,$lt:endDate}}},
           
          {$facet:{
            paymentMethod:[{
                    $group:{
                    _id:groupId,
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    _id:0,
                    paymentType:"$_id",
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1,
                },
            }],
            grandTotal:[{
                  $group:{
                    _id:"$_id.year",
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }},

                {$project:{
                    _id:0,
                    roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1
                },
          }],

          }}
       
        ])   
        
        const data = {
          date:{  paymentMethod:result[0].paymentMethod,
            grandTotal:result[0].grandTotal[0] || {roundedTotalAmount:0,count:0}
            },
        }
   
        
     res.status(200).json({success:true,message:"Data fetched successfully",data:data})
     
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}


export const categorySale = async (req,res) => {
    try{

           const id = req.query.shop || req.shop?.id;

        const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid"}},
            {$unwind:"$products"},

            {
                $group:{
                    _id:"$products.category",       
                    totalAmount:{$sum:"$totalAmount"},
                    count:{$sum:1}
                }
            },

            {
                $project:{
                    _id:0,
                    category:"$_id",
                     roundedTotalAmount:{$round:["$totalAmount",2]},
                     count:1
                }
            },

            {$sort:{roundedTotalAmount:-1}},

            {$limit:5}

        ])

         res.status(200).json({success:true,message:"Data fetched successfully",data:result})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}