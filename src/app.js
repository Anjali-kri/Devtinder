const express = require("express");
const app = express();

app.use((req, res) => {
    res.send("hey, finally i started the node journey");
})

app.listen(3000, () => {
    console.log("app is running")
});