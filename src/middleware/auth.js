const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send("Access denied. No token provided.");
    }
    try{
        const decoded = jwt.verify(token, "Anjali@123");
        req.user = decoded;
        next();
    } catch(err){
        res.status(400).send("Invalid token.");
        console.log("Invalid token: ", err);
    }
}

module.exports = userAuth;