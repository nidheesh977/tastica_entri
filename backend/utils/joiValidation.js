import Joi from 'joi';


export const userSignupValidation = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Username is required',
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',   
    }),

    phonenumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
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

export const LoginValidation = Joi.object({
    phonenumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
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


export const shopSignupValidtaion = Joi.object({

    shopname: Joi.string().min(3).max(30).required().messages({
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

    password: Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must contain only letters, numbers or characters',
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
    productname: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Product name is required',
        'string.base': 'Product name must be a string',
        'string.empty': 'Product name cannot be empty',
        'string.min': 'Product name must be at least 3 characters long',
        'string.max': 'Product name must be at most 30 characters long',   
    }),

    quantity: Joi.number().integer().min(1).required().messages({
        'number.required': 'Quanity is required',
        'number.base': 'Quanity must be a number',
        'number.empty': 'Quanity cannot be empty',
    }),
    
    costprice:Joi.number().integer().min(0).messages({
        'number.base': 'Cost price must be a number',
        'number.empty': 'Cost price cannot be empty',
    }),

    sellingprice: Joi.number().integer().min(0).messages({
        'number.base': 'Selling price must be a number',
        'number.empty': 'Selling price cannot be empty',
    }),

    discount: Joi.number().integer().min(0).messages({
        'number.base': 'Discount must be a number',
        'number.empty': 'Discount cannot be empty',
    }),

    category:Joi.string().min(3).max(30).required().messages({
        'string.required': 'Category is required',
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'string.min': 'Category must be at least 3 characters long',
        'string.max': 'Category must be at most 30 characters long',   
    })

    
})


export const newCategoryValidation = Joi.object({
    categoryname: Joi.string().min(3).max(30).required().messages({
        'string.required': 'Category name is required',
        'string.base': 'Category name must be a string',
        'string.empty': 'Category name cannot be empty',
        'string.min': 'Category name must be at least 3 characters long',
        'string.max': 'Category name must be at most 30 characters long',   
    }),
    description: Joi.string().min(3).max(100).required().messages({
        'string.required': 'Description is required',
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'string.min': 'Description must be at least 3 characters long',
        'string.max': 'Description must be at most 100 characters long',   
    }),
    discountrate: Joi.number().integer().min(0).messages({
        'number.base': 'Discount rate must be a number',
        'number.empty': 'Discount rate cannot be empty',
    }),
    
})