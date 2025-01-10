const eventValidationSchema={
    title:{
        exists : {
            errorMessage:'title field is required'
        },
        notEmpty : {
            errorMessage:'title should not be empty'
        },
        trim:true,
        isLength:{
            errorMessage:'title should be minimum 3 characters'
        }
    },
    venue:{
        exists:{
            errorMessage:'venue field is required'
        },
        notEmpty:{
            errorMessage:'venue cannot be empty'
        },
        trim:true,
    },
    address:{
        exists:{
            errorMessage:'address field id required'
        },
        notEmpty:{
            errorMessage:'address cannot be empty'
        },
        trim:true
    },
    eventDate:{
        exists:{
            errorMessage:'date field id required'
        },
        notEmpty:{
            errorMessage:'date cannot be empty'
        },
        trim:true

    },
    price:{
        exists:{
            errorMessage:'price field id required'
        },
        notEmpty:{
            errorMessage:'price cannot be empty'
        },
        trim:true
    },
    time:{
        exists:{
            errorMessage:'time field id required'
        },
        notEmpty:{
            errorMessage:'time cannot be empty'
        },
        trim:true

    }
}

export default eventValidationSchema