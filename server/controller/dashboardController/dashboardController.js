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

        const id = req.query.shop || req.shop?.id ;
        
        const {methods} = req.query; 

        const date =  new Date() 

        const year = date.getFullYear()
        
         const startDate = new Date(parseInt(year) ,0,1);
         const endDate = new Date(parseInt(year + 1),0,1)


         let method;
         let filedName;

        if(methods === "cash"){
        filedName = "paymentMethod"
        method =  "cash"
        }else if(methods === "digital"){
        filedName = "paymentMethod"
        method =  "digital"
        }else if(methods === "internal-device"){
        filedName = "paymentMethod"
        method =  "internal-device"
        }else{
        filedName = "paymentStatus"
        method =  "success"
        }

  

        const result = await invoiceModel.aggregate([
            {$match:{shop:id,invoiceStatus:"paid",[filedName]:method,createdAt:{$gte:startDate,$lt:endDate}}},
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
         
        
       res.status(200).json({success:true,message:"Data fetched successfully",data:result})
    }catch(error){
        console.log(error)
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
        const {month,day,method,year} = req.query;


     

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

              

// 
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
