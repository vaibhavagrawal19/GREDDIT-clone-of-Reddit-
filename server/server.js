require("dotenv").config({ path: "config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const dbo = require("./db/conn");
const mongoose = require("mongoose");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/greds", require("./routes/greds"));
app.use("/posts", require("./routes/posts"));

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } 
    else {
        res.type("txt").send("404 Not Found");
    }
})

// listen on the port, 
app.listen(PORT, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
    console.log("Server is running on port: " + PORT);
});

// on a database error log it to the console
mongoose.connection.on("error", err => {
    console.log(err);
})
