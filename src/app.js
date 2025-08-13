const express = require("express");
const app = express();


app.use("/hello/abc/123", (req, res) => {
    res.send( "hello abc 123");
});
app.use("/hello/abc", (req, res) => {
    res.send( " hello abc");
});
app.use("/hello", (req, res) => {
    res.send( "abc");
});
app.use("/home", (req, res) => {
    res.send("home page");
});
app.use((req, res) => {
    res.send("hey, finally i started the node journey");
})

app.listen(3000, () => {
    console.log("app is running")
});