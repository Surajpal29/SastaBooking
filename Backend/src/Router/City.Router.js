const express = require("express");
const {
  CreateNewCityController,
  GetAllCityController,
  UpdateACityControler,
  DeleteACityController,
  GetACityController,
} = require("./../controller/City.Controller");

const CityRouter = express.Router();

CityRouter.post("/add", CreateNewCityController);
CityRouter.get("/all", GetAllCityController);
CityRouter.put("/update", UpdateACityControler);
CityRouter.delete("/remove", DeleteACityController);
CityRouter.get("/get", GetACityController);

module.exports = CityRouter;
