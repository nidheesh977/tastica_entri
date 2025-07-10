                                           PROJECT TASTICA - BACKEND-API

## Admin Routes

- 🔐💼admin login<br>
  **method:**`POST`<br>
  **URL:**`/api/v1/admin/login`

- 🚪💼admin logout<br>
  **method:**`POST`<br>
  **URL:**`/api/v1/admin/logout`

- 👨‍⚕️💼admin create employee<br>
  **method:**`POST`<br>
  **URL**`/api/v1/admin/create-employee`

- 🟢💼 check admin is logged<br>
  **method:**`GET`<br>
  **URL**`/api/v1/admin/check-logged`

- 🧑‍💼 Retrieve staff list for admin<br>
  **method:** `GET`<br>
  **URL:** `/api/v1/admin/staff/list`

- 🧑‍💼🗑 "Delete a staff member"
  **method:** `DELETE`<br>
  **URL:** `/api/v1/admin/staff/:id`

- 🧑‍💼🗑 "Update a staff member"
  **method:** `PUT`<br>
  **URL:** `/api/v1/admin/staff/:id`

- 🧑‍💼🗑 "Update staff password"
  **method:** `Patch`<br>
  **URL:** `/api/v1/admin/staff/:id/password`

 -  admin add permission
**method**`PATCH` <br>
**URL**`/api/v1/admin/staff/:id/permissions`


-  admin DELETE permission
**method**`DELETE` <br>
**URL**`/api/v1/admin/staff/:id/permissions`

-  admin get staff
**method**`GET` <br>
**URL**`/api/v1/admin/staff/:id/:shopId`


## The routes for shop

- 🏤💼 create shop<br>
  **method**`POST`<br>
  **URL**`/api/v1/shop/create`

- 🏤 shop login<br>
  **method**`POST`<br>
  **URL**`/api/v1/shop/login`

- 🏤🚪 shop logout<br>
  **method**`POST`<br>
  **URL**`/api/v1/shop/logout`

- 🏤🟢 check shop login<br>
  **method**`GET`<br>
  **URL**`/api/v1/shop/check-login`

- 🏤🏙💼 update shop data<br>
  **method**`PUT`<br>
  **URL**`/api/v1/shop`

- 🏤🗑 delete shop<br>
  **method**`DELETE`
  **URL**`/api/v1/shop`

## The routes for staff

- 🔐👨‍💼staff login <br>
  **method:**`POST`<br>
  **URL:**`/api/v1/staff/login`

- 🟢👨‍💼 check staff is logged<br>
  **method:**`GET`<br>
  **URL:**`/api/v1/staff/check-logged`<br>

- 🚪👨‍💼 staff-logout <br>
  **method:**`POST`<br>
  **URL:**`/api/v1/staff/logout`

## The route for product

- 📦get product with category<br>
  **method:**`GET`<br>
  **URL:**`/api/v1/product/category-search?categoryId=68122b2b884da7193328edbe`

- 📦📦get all products<br>
  **method**`GET`<br>
  **URL**`/api/v1/product/`

- 📦 create product<br>
  **method:**`POST`<br>
  **URL**`/api/v1/product/create`

- 📦🗑 delete product<br>
  **method:**`DELETE`<br>
  **URL:**`/api/v1/product/delete/:id`

- 📦🖋 update product<br>
  **method**`PUT`<br>
  **URL**`/api/v1/product/update/:id/`

  - 📦🖋 add barcode to product<br>
  **method**`PATCH`<br>
  **URL**`/api/v1/product/:id/barcode`


## The routes for categories

- ➕📂 create a new category<br>
  **method:** `POST`<br>
  **URL:** `/api/v1/categories/`

- 🖋📂 update a category  
  **method:** `PUT`<br>
  **URL:**`/api/v1/categories/:id`

- 🗑📂delete a category<br>
  **method:**`DELETE`<br>
  **URL:**`/api/v1/category/delete/:id`

- 📈📂add discount to category<br>
  **method:**`PATCH`<br>
  **URL:**`/api/v1/categories/:id/discount/add`

- 🗑📈📂remove discount from category <br>
  **method:**`PATCH`<br>
  **URL:**`/api/v1/categories/:id/discount/remove`

- 📂📂 get full categories<br>
  **method:**`GET`<br>
  **URL:**`/api/v1/categories`

## invoice routes

- 📃 create invoice<br>
  **method:**`POST`<br>
  **URL:**`/api/v1/invoice/:customerId`

- 📃📦 add products to invoice<br>
  **method:**`POST`<br>
  **URL:**`/api/v1/invoice/:invoiceId/products`

- 📃📦🗑 remove product from invoice<br>
  **method:**`PUT`<br>
  **URL:**`/api/v1/invoice/:invoiceId/product/:productsId`

- 📃📦🗑 get invoice with id<br>
  **method:**`GET`<br>
  **URL:**`/api/v1/invoice/:invoiceId`

- 📃 invoice save <br>  
  **method**`PATCH`<br>
  **URL**`/api/v1/invoice/:id`

- 📃 get invoice saved <br>  
  **method**`GET`<br>
  **URL**`/api/v1/invoice/save/status-saved`

  - 📃 clear invoice  <br>  
  **method**`PUT`<br>
  **URL**`/api/v1/invoice/:id/clear`

  - 📃🗑 Delete open order <br>  
  **method**`Delete`<br>
  **URL**`/api/v1/invoice/status-saved/:id`


- 📃 get invoice With id <br>  
  **method**`POST`<br>
  **URL**`/api/v1/invoice/` id pass through req.body

## This route for admin

- 🧑‍💼 "Get full invoice"<br>
  **method:** `GET`<br>
  **URL:** `/api/v1/invoice`

## customer routes

- create new customer👩<br>
  **method**`POST`<br>
  **URL**`/api/v1/customer/create`

- update customer<br>
  **method**`PUT`<br>
  **URL**`/api/v1/customer/:id`

- delete customer<br>
  **method**`DELETE`<br>
  **URL**`/api/v1/customer/:id`

- get customer<br>
  **method**`GET`<br>
  **URL**`/api/v1/customer`

## This route for admin

- 🧑‍💼 "Get customer invoice"<br>
  **method:** `GET`<br>
  **URL:** `/api/v1/customer/:id`

## Search Routes<br>

- Search route dynamic route<br>
  **method**`GET`<br>
  **URL**`/api/v1/search/product?productId=PROD`
- or <br>
  **URL**`/api/v1/search/product?productName=eastern`

## Product filter for admin<br>

- Get all product
  **method**`GET` <br>
  **URL**`http://localhost:5001/api/v1/search/product/filter`

- Get Product Name<br>
  **method**`GET`<br>
  **URL**`http://localhost:5001/api/v1/search/product/filter?productName=colgate ma`

## payment Routes<br>

- cash payment

**method**`POST` <br>
**URL**`/api/v1/payment/cash/invoice/invoiceId`

- internal-device payment

**method**`POST` <br>
**URL**`/api/v1/payment/internal-device/invoice/invoiceId`


- card payment
**method**`POST` <br>
**URL**`/api/v1/payment/card/invoice/invoiceId`

- card payment success
**method**`PUT` <br>
**URL**`/api/v1/payment/card/success/invoice/invoiceId`

- card payment failed
**method**`PUT` <br>
**URL**`/api/v1/payment/card/failed/invoice/invoiceId`



## point redeem routes <br>

-  add redeem to invoice
**method**`PUT` <br>
**URL**`/api/v1/redeem/:invoiceId`


## File Upload <br>

-  product csv upload
**method**`POST` <br>
**URL**`/api/v1/file/upload`

-  category csv upload
**method**`POST` <br>
**URL**`/api/v1/file/upload/category`


## shop loyality Rate <br>

-  create loyality Rate
**method**`POST` <br>
**URL**`/api/v1/loyality`

-  update loyality Rate
**method**`PUT` <br>
**URL**`/api/v1/loyality/:id`

-  delete loyality Rate
**method**`DELETE` <br>
**URL**`/api/v1/loyality/:id`

-  get loyality Rate
**method**`GET` <br>
**URL**`/api/v1/loyality`
 

 ## Admin dashboard 💼 <br>

-  get payment method total admin
**method**`GET` <br>
**URL**`/api/v1/admin/dashboard/invoices/payment-method?year=2025` 
**URL**`/api/v1/admin/dashboard/invoices/payment-method?year=2025&month=6`
**URL**`/api/v1/admin/dashboard/invoices/payment-method?year=2025&month=6&day=10`

-  get payment month total admin
**method**`GET` <br>
**URL**`/api/v1/admin/dashboard/invoices/month?methods=cash` 
**URL**`/api/v1/admin/dashboard/invoices/month?methods=internal-device` 
**URL**`/api/v1/admin/dashboard/invoices/month?methods=digital`

use methods (all) get all the methods  
**URL**`/api/v1/admin/dashboard/invoices/month?methods=all` 


-  get payment week total admin
**method**`GET` <br>
**URL**`/api/v1/admin/dashboard/invoices/week?methods=cash` 
**URL**`/api/v1/admin/dashboard/invoices/week?methods=internal-device` 
**URL**`/api/v1/admin/dashboard/invoices/week?methods=digital`

- use methods (all) get all the methods  
**URL**`/api/v1/admin/dashboard/invoices/week?methods=all` 


-  get payment year total admin
**method**`GET` <br>
**URL**`/api/v1/admin/dashboard/invoices/year?methods=cash` 
**URL**`/api/v1/admin/dashboard/invoices/year?methods=internal-device` 
**URL**`/api/v1/admin/dashboard/invoices/year?methods=digital`

- use methods (all) get all the methods  
**URL**`/api/v1/admin/dashboard/invoices/year?methods=all` 

-  get total in categories
**method**`GET` <br>
**URL**`/api/v1/admin/dashboard/invoices/categories` 
 
-  get total in days for line chart
**method**`GET` <br>
**URL**`/api/v1/admin/dashboard/invoices/days` 
 


 ## super Admin  💼💼 <br>

-  Login super admin
**method**`POST` <br>
**URL**`/api/v1/super-admin/login`

-  check super admin Logged
**method**`get` <br>
**URL**`/api/v1/super-admin/check-logged`

- super admin Log-out
**method**`POST` <br>
**URL**`/api/v1/super-admin/logout`

- super admin account update
**method**`PUT` <br>
**URL**`/api/v1/super-admin/:id`


- super admin shop create
**method**`POST` <br>
**URL**`/api/v1/super-admin/shops`

- super admin get all shop
**method**`GET` <br>
**URL**`/api/v1/super-admin/shops`

- super admin update shop
**method**`PUT` <br>
**URL**`/api/v1/super-admin/shops/:id`

- super admin update shop
**method**`PATCH` <br>
**URL**`/api/v1/super-admin/shops/:id`

- super admin create employee
**method**`POST` <br>
**URL**`/api/v1/super-admin/employees`

- super admin delete employee
**method**`DELETE` <br>
**URL**`/api/v1/super-admin/employees/:id`

- super admin add permission
**method**`PATCH` <br>
**URL**`/api/v1/super-admin/staff/:id/permissions`


- super admin DELETE permission
**method**`DELETE` <br>
**URL**`/api/v1/super-admin/staff/:id/permissions`


- super admin update employee
**method**`PUT` <br>
**URL**`/api/v1/super-admin/employees/:id`

- super admin list employee
**method**`GET` <br>
**URL**`/api/v1/super-admin/employees?shop=id`

- 🧑‍💼🗑 "super admin Update staff password"
  **method:** `Patch`<br>
  **URL:** `/api/v1/super-admin/employees/:id/password`

- super admin get staff
**method**`GET` <br>
**URL**`/api/v1/super-admin/staff/:id`

- super admin profile
**method**`GET` <br>
**URL**`/api/v1/super-admin/`

 ## super admin dashboard  💼💼 <br>

-  get payment month total
**method**`GET` <br>
**URL**`/api/v1/super-admin/dashboard/invoices/month?shop=shopId&methods=cash` 
**URL**`/api/v1/super-admin/dashboard/invoices/month?shop=shopId&methods=internal-device` 
**URL**`/api/v1/super-admin/dashboard/invoices/month?shop=shopId&methods=digital`

- use methods (all) get all the methods  
**URL**`/api/v1/super-admin/dashboard/invoices/month?shop=shopId&methods=all` 


-  get payment week total
**method**`GET` <br>
**URL**`/api/v1/super-admin/dashboard/invoices/week?shop=shopId&methods=cash` 
**URL**`/api/v1/super-admin/dashboard/invoices/week?shop=shopId&methods=internal-device` 
**URL**`/api/v1/super-admin/dashboard/invoices/week?shop=shopId&methods=digital`

- use methods (all) get all the methods  
**URL**`/api/v1/super-admin/dashboard/invoices/week?shop=shopId&methods=all` 


-  get payment year total
**method**`GET` <br>
**URL**`/api/v1/super-admin/dashboard/invoices/year?shop=shopId&methods=cash` 
**URL**`/api/v1/super-admin/dashboard/invoices/year?shop=shopId&methods=internal-device` 
**URL**`/api/v1/super-admin/dashboard/invoices/year?shop=shopId&methods=digital`

- use methods (all) get all the methods  
**URL**`/api/v1/super-admin/dashboard/invoices/year?shop=shopId&methods=all` 

- start

-  get payment methods total
**method**`GET` <br>
**URL**`/api/v1/super-admin/dashboard/invoices/payment-method?shop=shopId&year=2025` 
**URL**`/api/v1/super-admin/dashboard/invoices/payment-method?shop=shopId&year=2025&month=6`
**URL**`/api/v1/super-admin/dashboard/invoices/payment-method?shop=shopId&year=2025&month=6&day=10`

-end

-  get total in categories
**method**`GET` <br>
**URL**`/api/v1/super-admin/dashboard/invoices/categories?shop=shopId` 
 
-  get total in days for line chart
**method**`GET` <br>
**URL**`/api/v1/super-admin/dashboard/invoices/days?shop=shopId` 
 


 ## password reset  💼💼 <br>

-  send reset link
**method**`POST` <br>
**URL**`/api/v1/password/reset-link`

-  reset password
**method**`POST` <br>
**URL**`/api/v1/password/reset/:token`


 ## Custom invoice  💼💼 <br>

- Create custom invoice
**method**`POST` <br>
**URL**`/api/v1/invoice/custom/create`

- Delete custom invoice
**method**`DELETE` <br>
**URL**`/api/v1/invoice/custom/:id`


- add product to custom invoice
**method**`POST` <br>
**URL**`/api/v1/invoice/custom/:id`


- Remove product from custom invoice
**method**`PUT` <br>
**URL**`/api/v1/invoice/custom/:invoiceId/product/:productsId`

-  custom invoice pay
**method**`PUT` <br>
**URL**`/api/v1/invoice/custom/:id/customer`


 ## wallet  💰💰 <br>

 - Wallet login 
**method**`POST` <br>
**URL**`/api/v1/wallet/login`


 - Wallet recharge 
**method**`PUT` <br>
**URL**`/api/v1/wallet/recharge`
 
 - Wallet barcode image generate 
**method**`PUT` <br>
**URL**`/api/v1/customer/barcode/:customerId/image`

