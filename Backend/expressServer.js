const express = require("express");
require("dotenv").config();
require("./src/DB/connect");

const CityRouter = require("./src/Router/City.Router");
const AuthenticationRouter = require("./src/Router/Authentication.User.Router");
const AdventurerRouter = require("./src/Router/Adventure.Router");
const AdventureDetailsRouter = require("./src/Router/AdventureDetails.Router");

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const server = express();

server.use(express.json());

server.use("/adventure/detail", AdventureDetailsRouter);
server.use("/cities", CityRouter);
server.use("/auth", AuthenticationRouter);
server.use("/adventure", AdventurerRouter);

// server.use("*", (request, response) => {
//   response.status(404).json({
//     success: false,
//     message: "API ENDPOINT NOT FOUND",
//   });
// });

server.listen(PORT, () => {
  console.log(`server started succesfully in ${NODE_ENV} in port ${PORT}`);
});
