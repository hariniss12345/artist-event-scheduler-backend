import Artist from '../models/Artist-model.js'
export const userRegisterSchema={
    username:{
        exists : {
            errorMessage:'username field is required'
        },
        notEmpty : {
            errorMessage:'username should not be empty'
        },
        trim:true,
        isLength:{
            errorMessage:'username should be minimum 3 characters'
        }
    },
    email:{
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        isEmail:{
            errorMessage:'email should be valid format'
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function(value){
                try{
                    const user =await Artist.findOne({email:value})
                    if(user){
                        throw new Error('Email is already taken')
                    }
                }catch(err){
                    throw new Error(err.message)

                }
            return true
            }
        }
    },
    password:{
        exists:{
            errorMessage:'password field id required'
        },
        notEmpty:{
            errorMessage:'password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password must contain atleast one lowerCase,upperCase,number and symbol and it must be minimum 8 characters long'
        },
        trim:true
    }
}

export const userLoginSchema={
    username:{
        exists : {
            errorMessage:'username field is required'
        },
        notEmpty : {
            errorMessage:'username should not be empty'
        },
        trim:true,
        isLength:{
            errorMessage:'username should be minimum 3 characters'
        }
    },
    email:{
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        isEmail:{
            errorMessage:'email should be valid format'
        },
        trim:true,
        normalizeEmail:true,
    },
    password:{
        exists:{
            errorMessage:'password field id required'
        },
        notEmpty:{
            errorMessage:'password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minUpperCase:1,
                minLowerCase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:'password must contain atleast one lowerCase,upperCase,number and symbol and it must be minimum 8 characters long'
        },
        trim:true
    }

}