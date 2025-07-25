import Joi from 'joi';


export const userSignupValidation = Joi.object({
    userName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).required().messages({
        'string.required': 'Username is required',
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
        'string.pattern.base': 'Username can contain only letters',
    }),

    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits ',
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',

    }),

    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must contain only letters, numbers or characters',
    }),
})

export const userUpdateValidation = Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Username is required',
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
    }),

    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits',
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',

    }),

})

export const adminAndSuperAdminLoginValidation = Joi.object({
    phoneNumber: Joi.string().required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',

    }),
    password: Joi.string().required().messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
    }),
})

export const staffLoginValidation = Joi.object({
    staffId: Joi.string().required().messages({
        'string.required': 'Staff ID is required',
        'string.base': 'Staff ID must be a string',
        'string.empty': 'Staff ID cannot be empty',

    }),
    password: Joi.string().required().messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
    }),
})

export const userPasswordValidation = Joi.object({
    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must contain only letters, numbers or characters',
    }),
})



export const shopSignupValidtaion = Joi.object({

    shopName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).required().messages({
        'string.required': 'Shop name is required',
        'string.base': 'Shop name must be a string',
        'string.empty': 'Shop name cannot be empty',
        'string.min': 'Shop name must be at least 3 characters long',
        'string.max': 'Shop name must be at most 30 characters long',
        'string.pattern.base': 'Shop name can contain only letters',
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),

    countryName: Joi.string().pattern(/^[A-Z][a-zA-Z\s]+$/).min(3).max(20).required().messages({
        'string.required': 'Country name is required',
        'string.base': 'Country name must be a string',
        'string.empty': 'Country name cannot be empty',
        'string.min': 'Country name must be at least 3 characters long',
        'string.max': 'Country name must be at most 20 characters long',
        'string.pattern.base': 'Country name must start with an uppercase letter and contain only letters and spaces',
    }),

    currencyCode: Joi.string().length(3).pattern(/^[A-Z]{3}$/).required().messages({
        'string.required': 'Currency name is required',
        'string.base': 'Currency code must be a string',
        'string.empty': 'Currency code cannot be empty',
        'string.length': 'Currency code must be exactly 3 uppercase letters',
        'string.pattern.base': 'Currency code must contain only uppercase letters(e.g.,INR, USD',
    }),

    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must contain only letters, numbers or characters',
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits ',
    }),
})

export const shopUpdateValidtaion = Joi.object({

    shopName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).required().messages({
        'string.required': 'Shop name is required',
        'string.base': 'Shop name must be a string',
        'string.empty': 'Shop name cannot be empty',
        'string.min': 'Shop name must be at least 3 characters long',
        'string.max': 'Shop name must be at most 30 characters long',
        'string.pattern.base': 'Shop name can contain only letters',
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),

    countryName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(20).required().messages({
        'string.required': 'Country name is required',
        'string.base': 'Country name must be a string',
        'string.empty': 'Country name cannot be empty',
        'string.min': 'Country name must be at least 3 characters long',
        'string.max': 'Country name must be at most 20 characters long',
        'string.pattern.base': 'Country name must contain only letters and spaces'
    }),

    currencyCode: Joi.string().length(3).pattern(/^[A-Z]{3}$/).required().messages({
        'string.required': 'Currency name is required',
        'string.base': 'Currency code must be a string',
        'string.empty': 'Currency code cannot be empty',
        'string.length': 'Currency code must be exactly 3 uppercase letters',
        'string.pattern.base': 'Currency code must contain only uppercase letters(e.g.MVR,INR, USD)',
    }),

})

export const shopPasswordValidation = Joi.object({
    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must contain only letters, numbers or characters',
    }),
})


export const shopLoginValidation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().required().messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
    })
})



export const newProductValidation = Joi.object({
    productName: Joi.string().min(3).max(100).required().messages({
        'string.required': 'Product name is required',
        'string.base': 'Product name must be a string',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be at most 100 characters long',
    }),

    quantity: Joi.number().precision(2).min(0).required().messages({
        'number.required': 'Quanity is required',
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    }),

    costPrice: Joi.number().precision(2).min(0).messages({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),

    sellingPrice: Joi.number().precision(2).min(0).messages({
        'number.base': 'Selling price must be a number',
        'number.empty': 'Selling price cannot be empty',
    }),

    discount: Joi.number().precision(2).min(0).messages({
        'number.base': 'Discount must be a number',
        'number.empty': 'Discount cannot be empty',
    }),
    category: Joi.string().min(24).required().messages({
        'string.required': 'Category is required',
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 24 characters long',
    }),
    discountType: Joi.string().min(3).max(20).messages({
        'string.base': 'Discount type must be a string',
        'string.empty': 'Discount type cannot be empty',
        'string.min': 'Discount type must be at least 3 characters long',
        'string.max': 'Discount type must be at most 20 characters long',
    }),
    costPriceProfit: Joi.number().precision(2).min(0).message({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),
    unit: Joi.string().valid('no', 'kg', 'lt', 'm').messages({
        'string.base': 'Unit must be a string',
        'string.empty': 'Unit cannot be empty',
        'any.only': 'Unit must be one of the following values: no, kg, lt, m',
    }),

    barcodeNumber: Joi.string().empty('').allow(null).default(null).messages({
        'string.base': 'Barcode must be a string',
    }),


})

export const updateProductValidation = Joi.object({
    productName: Joi.string().min(3).max(100).required().messages({
        'string.required': 'Product name is required',
        'string.base': 'Product name must be a string',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be at most 100 characters long',
    }),

    quantity: Joi.number().precision(2).min(0).required().messages({
        'number.required': 'Quanity is required',
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    }),

    costPrice: Joi.number().precision(2).min(0).messages({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),

    sellingPrice: Joi.number().precision(2).min(0).messages({
        'number.base': 'Selling price must be a number',
        'number.empty': 'Selling price cannot be empty',
    }),

    discount: Joi.number().precision(2).min(0).messages({
        'number.base': 'Discount must be a number',
        'number.empty': 'Discount cannot be empty',
    }),

    category: Joi.string().min(24).required().messages({
        'string.required': 'Category is required',
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 24 characters long',
    }),

    costPriceProfit: Joi.number().precision(2).min(0).message({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),

    productTax: Joi.number().precision(2).min(0).message({
        'number.base': 'Product tax must be a number',
        'number.empty': 'Product tax cannot be empty',
    }),

    loyaltyRate: Joi.number().precision(2).min(0).message({
        'number.base': 'Product loyality rate must be a number',
        'number.empty': 'Product loyality rate cannot be empty',

    }),

    barcodeNumber: Joi.string().empty('').allow(null).default(null).messages({
        'string.base': 'Barcode must be a string',
    }),

})




export const newCategoryValidation = Joi.object({
    categoryName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Category name is required',
        'string.base': 'Category name must be a string',
        'string.empty': 'Category name cannot be empty',
        'string.min': 'Category name must be at least 3 characters long',
        'string.max': 'Category name must be at most 30 characters long',
    }),
    description: Joi.string().min(3).max(200).required().messages({
        'string.required': 'Description is required',
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 3 characters long',
        'string.max': 'Description must be at most 200 characters long',
    }),
    discountRate: Joi.number().precision(2).min(0).messages({
        'number.base': 'Discount rate must be a number',
        'number.empty': 'Discount rate cannot be empty',
    }),

})

export const updateCategoryValidation = Joi.object({
    categoryName: Joi.string().min(3).max(30).messages({
        'string.base': 'Category name must be a string',
        'string.min': 'Category name must be at least 3 characters long',
        'string.max': 'Category name must be at most 30 characters long',
    }),
    description: Joi.string().min(3).max(200).messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least 3 characters long',
        'string.max': 'Description must be at most 200 characters long',
    })
})


export const customerValidation = Joi.object({
    customerName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).messages({
        'string.base': 'User name must be a string',
        'string.empty': 'User number cannot be empty',
        'string.min': 'User name must be at least 3 characters long',
        'string.max': 'User name must be at most 30 characters long',
        'string.pattern.base': 'User name can contain only letters',
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits ',
    }),
})


export const customerUpdateValidation = Joi.object({
    customerName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).messages({
        'string.base': 'User name must be a string',
        'string.empty': 'User number cannot be empty',
        'string.min': 'User name must be at least 3 characters long',
        'string.max': 'User name must be at most 30 characters long',
        'string.pattern.base': 'User name can contain only letters',
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits ',
    }),
    loyalityPoint: Joi.number().precision(2).min(0).messages({
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    })
})

export const newCustomProductValidation = Joi.object({
    productName: Joi.string().min(3).max(100).required().messages({
        'string.required': 'Product name is required',
        'string.base': 'Product name must be a string',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be at most 100 characters long',
    }),

    quantity: Joi.number().precision(2).min(0).required().messages({
        'number.required': 'Quanity is required',
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    }),


    sellingPrice: Joi.number().precision(2).min(0).messages({
        'number.base': 'Selling price must be a number',
        'number.empty': 'Selling price cannot be empty',
    }),


    unit: Joi.string().valid('no', 'kg', 'lt', 'm').messages({
        'string.base': 'Unit must be a string',
        'string.empty': 'Unit cannot be empty',
        'any.only': 'Unit must be one of the following values: no, kg, lt, m',
    }),

});


export const resetSendEmailValidation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',

    }),
    role: Joi.string().required().messages({
        'string.required': 'Password is required',
        'string.base': 'Password must be a string',
    })
})


export const resetPasswordValidation = Joi.object({

    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must contain only letters, numbers or characters',
    }),

})


export const addPermissionValidation = Joi.object({
    permission: Joi.string().valid("product_read", "product_update", "product_delete", "product_create", "category_read", "category_update", "category_delete", "category_create", "customer_read", "customer_update", "customer_delete", "customer_create").messages({
        'string.base': 'Permission must be a string',
        'string.empty': 'Permission cannot be empty',
        'any.only': 'This permission is not Valid',
    }),
})


export const barcodeValidation = Joi.object({
    barcode: Joi.string().required().messages({
        'string.required': 'Barcode is required',
        'string.base': 'Barcode must be a string',
        'string.empty': 'Barcode cannot be empty',
    }),
})


export const customInvoiceCustomerValidation = Joi.object({
    customerName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).required().messages({
        'string.required': 'Username is required',
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
        'string.pattern.base': 'Username can contain only letters',
    }),

    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits ',
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',

    }),
    address: Joi.string().min(3).max(100).required().messages({
        'string.required': 'Address is required',
        'string.min': 'Address must be at least 3 characters long',
        'string.max': 'Address must be at most 100 characters long',
        'string.empty': 'Address cannot be empty',
    }),
});


export const invoiceSoftDeleteValidation = Joi.object({
    actions: Joi.string().valid("archive", "restore").messages({
        'any.only': 'Actions must be one of the following values: archive or restore',
        'string.empty': 'Actions cannot be empty',
    }),

    archiveReason: Joi.string().empty('').max(50).allow(null).default(null).messages({
        'string.base': 'reason must be a string',
        'string.max': 'reason must be at most 50 characters long',
    }),
})