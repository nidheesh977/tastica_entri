import mongoose from 'mongoose';


 const userSchema = mongoose.Schema({
    username:{
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
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['superadmin','admin','staff'],
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