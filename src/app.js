const express = require("express");
const app = express();
const connectDb = require("../config/database");
const User = require("../model/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: "Jolly",
        lastName: "Doe",    
        email: "aaaa@gmail.com",
        password: "12345"
    })
    try{
        await user.save();
        res.status(200).send("User created");
        console.log("User created");
    } catch(err){
        res.status(500).send("Error creating user: " + err.message);
        console.error("Error creating user: ", err);
    }
    
});
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

