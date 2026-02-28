import mongoose from 'mongoose';

const staffPermissions = ["product_read", "product_update", "product_delete", "product_create", "category_read", "category_update", "category_delete", "category_create", "customer_read", "customer_update", "customer_delete", "customer_create", "credit_read", "credit_pay", "credit_give", "credit_create", "view_expense", "create_expense", "view_expense_account", "create_expense_account", "status_expense_account", "vendor_view", "vendor_create", "vendor_change_status", "payment_acc_view", "payment_acc_create", "payment_acc_change_status", "tax_rate_view", "tax_create", "tax_change_status"]

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'staff'],
        default: 'staff'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: [String],
        enum: staffPermissions,
        default: []
    },
    staffId: {
        type: String,
        required: true,
        unique: true
    }


}, { timestamps: true })

const AdminStaffModel = mongoose.model('User', userSchema);

export default AdminStaffModel;