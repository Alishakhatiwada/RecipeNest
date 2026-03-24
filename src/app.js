const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// static folder
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/recipe", require("./routes/recipe.routes"));

module.exports = app;