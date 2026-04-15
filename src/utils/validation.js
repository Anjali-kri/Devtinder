const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, email, password, gender} = req.body;
    if(!firstName || !email || !password){
        throw new Error("First name, email and password are required");
    } else if(!validator.isEmail(email)){
        throw new Error("Please provide a valid email");
    } else if(!validator.isLength(password, { min: 6 })){
        throw new Error("Password must be at least 6 characters long");
    }

}

module.exports = {
    validateSignUpData
}