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

    shopName: Joi.string().pattern(/^[a-zA-Z_()\- ]+$/).min(3).max(30).required().messages({
        'string.required': 'Shop name is required',
        'string.base': 'Shop name must be a string',
        'string.empty': 'Shop name cannot be empty',
        'string.min': 'Shop name must be at least 3 characters long',
        'string.max': 'Shop name must be at most 30 characters long',
        'string.pattern.base': 'Shop name Only letters and [ - ( ) _ ] allowed.'
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),

    countryName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(20).required().messages({
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

    shopName: Joi.string().pattern(/^[a-zA-Z_()\- ]+$/).min(3).max(30).required().messages({
        'string.required': 'Shop name is required',
        'string.base': 'Shop name must be a string',
        'string.empty': 'Shop name cannot be empty',
        'string.min': 'Shop name must be at least 3 characters long',
        'string.max': 'Shop name must be at most 30 characters long',
        'string.pattern.base': 'Shop name Only letters and [ - ( ) _ ] allowed.'
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
    customerName: Joi.string().pattern(/^[a-zA-Z_()\- ]+$/).min(3).max(30).messages({
        'string.base': 'Customer name must be a string',
        'string.empty': 'Customer number cannot be empty',
        'string.min': 'Customer name must be at least 3 characters long',
        'string.max': 'Customer name must be at most 30 characters long',
        'string.pattern.base': 'Customer name Only letters and [ - ( ) _ ] allowed.'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits ',
    }),
})


export const customerUpdateValidation = Joi.object({
    customerName: Joi.string().pattern(/^[a-zA-Z_()\- ]+$/).min(3).max(30).messages({
        'string.base': 'Customer name must be a string',
        'string.empty': 'Customer number cannot be empty',
        'string.min': 'Customer name must be at least 3 characters long',
        'string.max': 'Customer name must be at most 30 characters long',
        'string.pattern.base': 'Customer name can contain only letters',
        'string.pattern.base': 'Customer name Only letters and [ - ( ) _ ] allowed.'
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
    permission: Joi.string().valid("product_read", "product_update", "product_delete", "product_create", "category_read", "category_update", "category_delete", "category_create", "customer_read", "customer_update", "customer_delete", "customer_create", "credit_read", "credit_pay", "credit_give", "credit_create").messages({
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

export const creditRegistrationValidation = Joi.object({
    customerName: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(30).required().messages({
        'string.required': 'Username is required',
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
        'string.pattern.base': 'Username can contain only letters',
    }),
    registeredCustomer: Joi.boolean().required(),

    customerPhoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        "string.pattern.base": "Phone number must contain only numbers and be between 7 to 14 digits",
    }),
})

export const creditGiveValidation = Joi.object({

    creditAmount: Joi.number().positive().precision(2).required().messages({
        "number.base": "Amount must be a number",
        "any.required": "Amount is required",
        "number.positive": "Amount must be greater than 0",
        "number.precision": "Amount can have maximum 2 decimal places"
    }),
    creditBookId: Joi.string().uppercase().pattern(/^[A-Z0-9]{8}$/).max(8).required().messages({
        "string.pattern.base": "Book ID must be contain only  uppercase letters and numbers",
        "string.max": "Book ID must not exceed 8 characters",
        "string.empty": "Book ID is required",
        "any.required": "Book ID is required"
    }),
    paymentMethod: Joi.string().allow(null, "").valid("cash", "internal-device", "digital").optional().messages({
        "any.only": "Payment method must be cash, card, or stripe"
    })

})


export const creditPaymentValidation = Joi.object({
    creditBookId: Joi.string().uppercase().pattern(/^[A-Z0-9]{8}$/).max(8).required().messages({
        "string.pattern.base": "Book ID must be contain only  uppercase letters and numbers",
        "string.max": "Book ID must not exceed 8 characters",
        "string.empty": "Book ID is required",
        "any.required": "Book ID is required"
    }),
    paidAmount: Joi.number().positive().precision(2).required().messages({
        "number.base": "Amount must be a number",
        "any.required": "Amount is required",
        "number.positive": "Amount must be greater than 0",
        "number.precision": "Amount can have maximum 2 decimal places"
    }),
    paymentMethod: Joi.string().allow(null, "").valid("cash", "internal-device", "digital").optional().messages({
        "any.only": "Payment method must be cash, card, or stripe"
    }),
    singleCreditPay: Joi.boolean().required(),
    creditInvoiceId: Joi.string().allow(null, "").optional().length(24).hex().required()
})




//------------------------------------------- expense validation ----------------------------------------------------------------

export const createExpenseAccountValidation = Joi.object({
    expenseTitle: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Title is required',
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must be at most 30 characters long',
    }),
    description: Joi.string().min(3).max(200).required().messages({
        'string.required': 'Description is required',
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 3 characters long',
        'string.max': 'Description must be at most 200 characters long',
    })

})

export const addExpenseValidation = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Expense Title is required',
        'string.base': 'Expense Title must be a string',
        'string.empty': 'Expense Title cannot be empty',
        'string.min': 'Expense Title must be at least 3 characters long',
        'string.max': 'Expense Title must be at most 30 characters long',
    }),
})




// -----------------------------------------------payment account validation-----------------------------------------------------



export const createPaymentAccountValidation = Joi.object({
    accountTitle: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Account Title is required',
        'string.base': 'Account Title must be a string',
        'string.empty': 'Account Title cannot be empty',
        'string.min': 'Account Title must be at least 3 characters long',
        'string.max': 'Account Title must be at most 30 characters long',
    }),
    accountNumber: Joi.string().optional().messages({
        'string.base': 'Account Number must be a string',
        'string.empty': 'Account Number cannot be empty',
        'string.min': 'Account Number must be at least 3 characters long',
        'string.max': 'Account Number must be at most 30 characters long',
    }),
    accountType: Joi.string().required().valid("bank", "cash").messages({
        'string.base': 'Account Type must be a string.',
        'string.empty': 'Account Type cannot be empty.',
        'any.only': 'Account Type must be either Bank or Cash.',
        'any.required': 'Account Type is a required field.'
    }),
})

// ---------------------------------------------------Tax validation--------------------------------------------------------------


export const addTaxRatesValidation = Joi.object({
    taxCodeName: Joi.string().trim().uppercase().min(2).max(15).required().messages({
        'string.base': 'Tax Code Name must be a string.',
        'string.empty': 'Tax Code Name cannot be empty.',
        'string.min': 'Tax Code Name must be at least 2 characters.',
        'string.max': 'Tax Code Name is too long (max 15 chars).',
        'any.required': 'Tax Code Name is required.'
    }),
    rate: Joi.number().min(0).required().messages({
        'number.base': 'Rate must be a number.',
        'number.min': 'Rate cannot be less than 0.',
        'number.empty': 'Rate cannot be empty.',
        'any.required': 'Rate is a required field.'
    })
})


// --------------------------------------------------Vendor validation---------------------------------------------------------

export const createVendorValidation = Joi.object({
    vendorName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Vendor Name is required',
        'string.base': 'Vendor Name must be a string',
        'string.empty': 'Vendor Name cannot be empty',
        'string.min': 'Vendor Name must be at least 3 characters long',
        'string.max': 'Vendor Name must be at most 30 characters long',
    }),
    vendorEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Vendor email is required',
        'string.base': 'Vendor email must be a string',
        'string.empty': 'Vendor email cannot be empty',
        'string.email': 'Vendor email must be a valid email address',
    }),
    vendorPhoneNumber: Joi.string().pattern(/^[0-9]{7,14}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be between 7 to 14 digits',
    }),
})


export const createExpenseFormValidation = Joi.object({


    date: Joi.date().not(null).required().messages({
        "any.required": "Date is required",
        "any.invalid": "Date is required",
        "date.base": "Date must be a valid date",
    }),
    expenseAccount: Joi.string().length(24).hex().required().messages({
        "any.required": "Expense Account is required",
        "string.hex": "Invalid ID format",
        "string.length": "Invalid ID format",
    }),
    expenseSubTitle: Joi.string().length(24).hex().required().messages({
        "any.required": "Expense Sub Title  is required",
        "string.hex": "Invalid ID format",
        "string.length": "Invalid ID format",
    }),
    amountIs: Joi.string().valid("inclusive", "exclusive").required().messages({
        "any.only": "Type must be Inclusive or Exclusive",
        "any.required": "Please select a Tax type"
    }),

    expenseAmount: Joi.number().positive().precision(2)
        .when("amountIs", {
            is: "inclusive",
            then: Joi.number().min(0).messages({
                "number.min": "Amount must be 0 or greater for Inclusive tax",
            }),
            otherwise: Joi.number().greater(0).messages({
                "number.greater": "Amount must be greater than 0 for Exclusive tax",
            }),
        })
        .required().invalid(null).empty("").messages({
            "any.required": "Expense amount is required",
            "any.invalid": "Expense amount is required",
            "number.base": "Please enter a valid Expense amount",
            "number.positive": "Expense amount must be greater than zero",
            "number.precision": "Only 2 decimal places are allowed"
        }),
    paidThrough: Joi.string().length(24).hex().required().messages({
        "any.required": "paidThrough  is required",
        "string.hex": "paid Through Invalid ID format",
        "string.length": "paid ThroughInvalid ID format",
    }),

    shopTaxAccount: Joi.string().length(24).hex().required().messages({
        "any.required": "Tax rate  is required",
        "string.hex": "shop Tax Account Invalid ID format",
        "string.length": "shop Tax Account Invalid ID format",
    }),
    taxRate: Joi.string().length(24).hex().required().messages({
        "any.required": "Tax rate  is required",
        "string.hex": "Tax rate Invalid ID format",
        "string.length": "Tax rate Invalid ID format",
    }),
    vendor: Joi.string().length(24).hex().allow(null).empty("").messages({
        "string.hex": "vendor Invalid ID format",
        "string.length": "vendor Invalid ID format",
    }),

    customer: Joi.string().length(24).hex().allow(null).empty("").messages({
        "string.hex": "customer Invalid ID format",
        "string.length": "customer Invalid ID format",
    }),
    referenceId: Joi.string().optional().empty("").messages({
        "string.base": "Reference ID must be a string"
    }),
    notes: Joi.string().required().empty('').max(500).messages({
        "any.required": "Notes are required",
        "string.base": "Notes must be a string",
        "string.max": "Notes cannot exceed 500 characters"
    }),
    image_doc: Joi.string().meta({ swaggerType: 'file' }).optional().allow(null, "").label("image")
})
