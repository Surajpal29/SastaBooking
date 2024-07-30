const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MONGODB connected succesfully");
  })
  .catch((err) => {
    console.error(err);
  });
