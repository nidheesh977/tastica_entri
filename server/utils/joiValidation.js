import Joi from 'joi';


export const userSignupValidation = Joi.object({
    userName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Username is required',
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',   
    }),

    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be 10 digits long',
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

    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be 10 digits long',
    }),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',

    }),
    
})

export const userLoginValidation = Joi.object({
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be 10 digits long',
    }),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
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

    shopName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Shop name is required',
        'string.base': 'Shop name must be a string',
        'string.empty': 'Shop name cannot be empty',
        'string.min': 'Shop name must be at least 3 characters long',
        'string.max': 'Shop name must be at most 30 characters long',   
    }),
 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),

    countryName:Joi.string().pattern(/^[A-Z][a-zA-Z\s]+$/).min(3).max(20).required().messages({
        'string.required': 'Country name is required',
        'string.base': 'Country name must be a string',
        'string.empty': 'Country name cannot be empty',
        'string.min': 'Country name must be at least 3 characters long',
        'string.max': 'Country name must be at most 20 characters long',
        'string.pattern.base': 'Country name must start with an uppercase letter and contain only letters and spaces',
    }),

    currencyCode:Joi.string().length(3).pattern(/^[A-Z]{3}$/).required().messages({
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
})

export const shopUpdateValidtaion = Joi.object({

    shopName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Shop name is required',
        'string.base': 'Shop name must be a string',
        'string.empty': 'Shop name cannot be empty',
        'string.min': 'Shop name must be at least 3 characters long',
        'string.max': 'Shop name must be at most 30 characters long',   
    }),
 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),

    countryName:Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(20).required().messages({
        'string.required': 'Country name is required',
        'string.base': 'Country name must be a string',
        'string.empty': 'Country name cannot be empty',
        'string.min': 'Country name must be at least 3 characters long',
        'string.max': 'Country name must be at most 20 characters long',
        'string.pattern.base':'Country name must contain only letters and spaces'   
    }),

    currencyCode:Joi.string().length(3).pattern(/^[A-Z]{3}$/).required().messages({
        'string.required': 'Currency name is required',
        'string.base': 'Currency code must be a string',
        'string.empty': 'Currency code cannot be empty',
        'string.length': 'Currency code must be exactly 3 uppercase letters',
        'string.pattern.base': 'Currency code must contain only uppercase letters(e.g.,INR, USD',   
    }),

})


export const shopLoginValidation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
    }),
    password:Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
    })
}) 

export const newProductValidation = Joi.object({
    productName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Product name is required',
        'string.base': 'Product name must be a string',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be at most 30 characters long',   
    }),

    quantity: Joi.number().integer().min(0).required().messages({
        'number.required': 'Quanity is required',
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    }),
    
    costPrice:Joi.number().integer().min(0).messages({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),

    sellingPrice: Joi.number().integer().min(0).messages({
        'number.base': 'Selling price must be a number',
        'number.empty': 'Selling price cannot be empty',
    }),

    discount: Joi.number().integer().min(0).messages({
        'number.base': 'Discount must be a number',
        'number.empty': 'Discount cannot be empty',
    }),
    category: Joi.string().min(24).required().messages({
        'string.required': 'Category is required',
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 24 characters long',  
    }),
    discountType:Joi.string().min(3).max(20).messages({
        'string.base': 'Discount type must be a string',
        'string.empty': 'Discount type cannot be empty',
        'string.min': 'Discount type must be at least 3 characters long',
        'string.max': 'Discount type must be at most 20 characters long',   
    })

    
})

export const updateProductValidation = Joi.object({
    productName: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Product name is required',
        'string.base': 'Product name must be a string',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be at most 30 characters long',   
    }),
    quantity: Joi.number().integer().min(0).required().messages({
        'number.required': 'Quanity is required',
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    }),
    costPrice:Joi.number().integer().min(0).messages({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),
    sellingPrice: Joi.number().integer().min(0).messages({
        'number.base': 'Selling price must be a number',
        'number.empty': 'Selling price cannot be empty',
    }),
    discount:Joi.number().integer().min(0).messages({
        'number.base': 'Discount must be a number',
        'number.empty': 'Discount cannot be empty',
    }),
    
    category: Joi.string().min(24).required().messages({
        'string.required': 'Category is required',
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 24 characters long',  
    }),
     discountType:Joi.string().min(3).max(20).messages({
        'string.base': 'Discount type must be a string',
        'string.empty': 'Discount type cannot be empty',
        'string.min': 'Discount type must be at least 3 characters long',
        'string.max': 'Discount type must be at most 20 characters long',   
    })
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
    discountRate: Joi.number().integer().min(0).messages({
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
    customerName: Joi.string().min(3).max(30).messages({
        'string.base': 'Category name must be a string',
        'string.min': 'Category name must be at least 3 characters long',
        'string.max': 'Category name must be at most 30 characters long',   
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.required': 'Phone number is required',
        'string.base': 'Phone number must be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.pattern.base': 'Phone number must be 10 digits long',
    }),
})

