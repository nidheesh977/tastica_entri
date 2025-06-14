import mongoose from 'mongoose';


 const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    shopId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shop", 
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['super-admin','admin','staff'],
        default:'staff'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    
   
 },{timestamps:true})

 const AdminStaffModel = mongoose.model('User',userSchema);

 export default AdminStaffModel;