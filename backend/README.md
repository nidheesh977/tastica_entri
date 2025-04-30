                                                      PROJECT TASTICA


 routes for staff\
 staff-login method:POST  /api/v1/staff/login \

 <!-- protected route -->
 staff-logged  method:GET  /api/v1/staff/check-logged \


 routes for admin\
 admin-login  method:POST /api/v1/admin/login \

  <!-- protected route -->
 create-employee method:POST /api/v1/admin/create-employee \
 admin-logged method:GET  /api/v1/admin/check-logged

 routes for shop\

 shop-login method:POST  /api/v1/shop/login-shop \

  <!-- protected route -->
 shop-signup method:POST /api/v1/shop/create-shop \
 shop-logged method:GET /api/v1/shop/check-logged 


 routes for category\

 category-create method:POST /api/v1/category/create
 category-delete method:DELETE /api/v1/category/delete/:id  
 category-discount-add method:PUT /api/v1/category/discount-add/:id 
 category-discount-remove method:PUT /api/v1/category/discount-remove/:id 
 

 tested \
 staff-signup test passed\
 staff login test passed\



