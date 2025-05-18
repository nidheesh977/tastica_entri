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
**URL**`/api/v1/product/update/:id/category/:category`

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

- 📃📦🗑 get  invoice with id<br>
**method:**`GET`<br>
**URL:**`/api/v1/invoice/:invoiceId`

- 📃 invoice save <br>  
**method**`PATCH`<br>
**URL**`/api/v1/invoice/:id`

- 📃 get invoice saved <br>  
**method**`GET`<br>
**URL**`/api/v1/invoice/saved`


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
**URL**`http://localhost:5001/api/v1/payment/cash/invoice/invoiceId`

- card payment
**method**`POST` <br>
**URL**`http://localhost:5001/api/v1/payment/card/invoice/invoiceId`
