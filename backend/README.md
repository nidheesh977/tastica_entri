                                                      PROJECT TASTICA


 routes for staff\

 staff-login &nbsp;&nbsp; method:POST&nbsp;&nbsp;/api/v1/staff/login \
 staff-logged &nbsp;&nbsp;method:GET &nbsp;&nbsp;/api/v1/staff/check-logged \
 staff-logout&nbsp;&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/staff/logout \
 getproduct-withCategory&nbsp;&nbsp;&nbsp;method:GET&nbsp;&nbsp;/api/v1/staff/products/category-search?categoryId=68122b2b884da7193328edbe \
 getCategories&nbsp;&nbsp;&nbsp;method:GET&nbsp;&nbsp;/api/v1/user/products/categories\
 
 routes for admin\

 admin-login&nbsp;&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/admin/login \
 admin-logout&nbsp;&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/admin/logout \
 create-employee&nbsp;&nbsp;  method:POST&nbsp;&nbsp;/api/v1/admin/create-employee \
 admin-logged&nbsp;&nbsp;&nbsp;method:GET&nbsp;&nbsp;/api/v1/admin/check-logged\
 shop-create&nbsp;&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/shop/create-shop \
 getproduct-withCategory&nbsp;&nbsp;&nbsp;method:GET&nbsp;&nbsp;/api/v1/admin/products/category-search?categoryId=68122b2b884da7193328edbe \
 getCategories&nbsp;&nbsp;&nbsp;method:GET&nbsp;&nbsp;/api/v1/admin/products/categories\

 routes for shop\

 shop-login&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/shop/login-shop \
 shop-logged&nbsp;&nbsp;method:GET&nbsp;&nbsp;/api/v1/shop/check-logged \
 shop-logout&nbsp;&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/shop/logout \


 routes for category\

 category-create&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/category/create\
 category-delete&nbsp;&nbsp;method:DELET&nbsp;&nbsp;/api/v1/category/delete/:id  \
 category-discount-add&nbsp;method:PUT&nbsp;&nbsp;/api/v1/category/discount-add/:id \ 
 category-discount-remove&nbsp;method:PUT&nbsp;&nbsp;/api/v1/category/discount-remove/:id \
 
 routes for product \
 
 product-create&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/product/create\
 product-delete&nbsp;&nbsp;method:DELETE&nbsp;&nbsp;/api/v1/product/delete/:id\
 product-update&nbsp;&nbsp;method:PUT&nbsp;&nbsp;/api/v1/product/update/:id/category/:category\

 routes for testing endpoints 

 create-employee&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/super-admin/create-employee\
 create-shop&nbsp;&nbsp;&nbsp;method:POST&nbsp;&nbsp;/api/v1/super-admin/create-shop\

 tested \
 staff-signup test passed\
 staff login test passed\



