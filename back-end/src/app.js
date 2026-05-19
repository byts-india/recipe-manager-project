const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cors({ origin: "*" })); 
app.use(express.json());

app.get("/health", (req,res) => {
    res.send("SERVER IS RUNNING HEALTHY 💊")
});

module.exports = app;