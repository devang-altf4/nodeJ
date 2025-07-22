const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
require("dotenv").config();
const Url = require("./models/url"); // Ensure the path is correct for your project structure
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const urlRouter = require("./routers/url");
const staticRouter = require("./routers/staticRouter");
const { redirectHandler } = require("./controllers/url");
app.get('/:shortid', redirectHandler);
app.use("/url", urlRouter);
app.use("/", staticRouter);


