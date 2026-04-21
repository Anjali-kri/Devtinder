const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        max: 50
    },
    lastName:{
        type: String,
        default: "",
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }

    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        validate: {
            validator: function(value) {
                return value === "male" || value === "female" || value === "other";
            },
            message: "Invalid gender"
        }
    }
});

module.exports = mongoose.model("User", userSchema);