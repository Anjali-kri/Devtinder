const express = require('express');
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = require('../middleware/auth');

profileRouter.get("/profile/view", userAuth, async(req, res) => {
    console.log("req.user: ", req);
    const decoded = req.user;
    try{
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