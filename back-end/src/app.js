const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const recipeRoute = require("./routes/recipeRoutes");
const recipeCategoryRoute = require("./routes/recipeCategoryRoutes");
const stepsRoute = require("./routes/stepsRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("SERVER IS RUNNING HEALTHY 💊");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/recipe", recipeRoute);
app.use("/recipe-category", recipeCategoryRoute);
app.use("/steps", stepsRoute);

module.exports = app;
