const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");
const {validateSignUpData} = require("./utils/validation");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const e = require("express");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signup", async(req, res) => {
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

app.post("/login", async(req, res) => {
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

app.get("/profile", async(req, res) => {
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
app.get("/users", async(req, res) => {
    const userEmail = req.query.email;
    try{
        const users = await User.find({email: userEmail});
        if(users.length === 0){
            return res.status(404).send("No users found with the provided email.");
        }else{
            res.status(200).send(users);
        }
    } catch(err){
        res.status(400).send("Error fetching users: " + err.message);
    }
});

app.get("/feed", async(req, res) => {
    try {
        const users = await User.find({});
        if(users.length === 0){
            return res.status(404).send("No users found in the database.");
        } else {
            res.status(200).send(users);
        }
    } catch(err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
})
app.get("/", (req, res) => {
    res.send("Welcome to Devtinder!");
});

connectDb().
then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("app is running")
    })
})
.catch((err) => {
    console.error("Database connection failed", err);
});

