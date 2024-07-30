const express = require("express");
require("dotenv").config();
require("./src/DB/connect");

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const server = express();

server.listen(PORT, () => {
  console.log(`server started succesfully in ${NODE_ENV} in port ${PORT}`);
});
