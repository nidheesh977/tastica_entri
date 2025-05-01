                                                      PROJECT TASTICA


 routes for staff\

 staff-login              method:POST         /api/v1/staff/login \
 staff-logged             method:GET          /api/v1/staff/check-logged \


 routes for admin\

 admin-login              method:POST         /api/v1/admin/login \
 create-employee          method:POST         /api/v1/admin/create-employee \
 admin-logged             method:GET          /api/v1/admin/check-logged
 shop-create              method:POST         /api/v1/shop/create-shop \

 routes for shop\

 shop-login               method:POST         /api/v1/shop/login-shop \
 shop-logged              method:GET          /api/v1/shop/check-logged 


 routes for category\

 category-create           method:POST          /api/v1/category/create
 category-delete           method:DELETE        /api/v1/category/delete/:id  
 category-discount-add     method:PUT           /api/v1/category/discount-add/:id 
 category-discount-remove  method:PUT           /api/v1/category/discount-remove/:id 
 
 routes for product \
 
 product-create            method:POST         /api/v1/product/create/:category
 product-delete            method:DELETE       /api/v1/product/delete/:id
 product-update            method:PUT          /api/v1/product/update/:id/category/:category

 tested \
 staff-signup test passed\
 staff login test passed\



