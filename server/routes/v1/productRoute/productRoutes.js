import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getCategoryProducts, updateProduct } from '../../../controller/productContollers/index.js';
import { userVerifyToken } from '../../../middleware/cookieTokenVerification.js';
import { checkUserRole } from '../../../middleware/authRoleVerification.js';
import { shopVerifyToken } from '../../../middleware/shopCookieTokenVerification.js';
import { checkPermission } from '../../../middleware/permissonMiddleware.js';
;

const productRouter = express.Router();
 

productRouter.post('/create',shopVerifyToken,userVerifyToken,checkUserRole('admin',"staff"),checkPermission("product_create"),createProduct);
productRouter.delete('/delete/:id',shopVerifyToken,userVerifyToken,checkUserRole('admin',"staff"),checkPermission("product_delete"),deleteProduct);
productRouter.put('/update/:id/',shopVerifyToken,userVerifyToken,checkUserRole('admin',"staff"),checkPermission("product_update"),updateProduct);
productRouter.get('/',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),checkPermission("product_read"),getAllProducts);
productRouter.get('/category-search',shopVerifyToken,userVerifyToken,checkUserRole('admin','staff'),getCategoryProducts);



export default productRouter;
