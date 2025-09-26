const express = require("express");
const app = express();
const connectDb = require("../config/database");
const User = require("../model/user");
const e = require("express");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async(req, res) => {
    const user = new User(req.body)
    try{
        await user.save();
        res.status(200).send("User created");
        console.log("User created");
    } catch(err){
        res.status(500).send("Error creating user: " + err.message);
        console.error("Error creating user: ", err);
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

