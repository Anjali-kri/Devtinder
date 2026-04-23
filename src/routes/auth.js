const express = require("express");
const authrouter = express.Router();
const jwt = require("jsonwebtoken");
const {validateSignUpData} = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");

authrouter.post("/signup", async(req, res) => {
    try{
        const {firstName, lastName, email, password, gender} = req.body;
        validateSignUpData(req);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender
        });

        await user.save();
        res.status(200).send("User created");
        console.log("User created");
    } catch(err){
        res.status(500).send("Error creating user: " + err.message);
        console.error("Error creating user: ", err);
    }
    
});

authrouter.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send("Invalid credentials");
        }        
        const token = jwt.sign({id: user._id, email: user.email}, "Anjali@123", {expiresIn: "7h"});
        res.cookie("token", token)
        res.status(200).send("Login successful");
        console.log(token);
    } catch(err){
        res.status(500).send("Error logging in: " + err.message);
    }
});

module.exports =  authrouter ;