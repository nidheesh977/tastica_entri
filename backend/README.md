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

<!-- - 🏤💼 create shop<br>
**method**`POST`<br>
**URL**`/api/v1/shop/create-shop` -->


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
**URL:**`/api/v1/invoice`

- 📃📦 add products to invoice<br>
**method:**`PUT`<br>
**URL:**`/api/v1/invoice/:id/products`

- 📃📦🗑 remove product from invoice<br>
**method:**`PATCH`<br>
**URL:**`/api/v1/invoice/:id/products/:productId`

- 📃 invoice save <br>
**method**`PATCH`<br>
**URL**`/api/v1/invoice/:id`