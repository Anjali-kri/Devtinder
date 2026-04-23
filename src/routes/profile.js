const express = require('express');
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");

profileRouter.get("/profile", async(req, res) => {
    const toket = req.cookies.token;
    if(!toket){
        return res.status(401).send("Access denied. No token provided.");
    }
    try{
        const decoded = jwt.verify(toket, "Anjali@123");
        const user = await User.findById(decoded.id);
        console.log(user);
        if(!user){
            return res.status(404).send("User not found");
        }
        res.status(200).send(user);
    } catch(err){
        res.status(400).send("Invalid token.");
    }
});

module.exports = profileRouter;