const express = require("express");

const {
  CreateNewAdvewntureController,
  GetAllAdventuresInACityController,
  DeleteAAAdventureController,
  UpdateAAdventureController,
} = require("./../controller/Adventure.Controller");

const AdventureRouter = express.Router();

AdventureRouter.post("/add", CreateNewAdvewntureController);
AdventureRouter.get("/all", GetAllAdventuresInACityController);
AdventureRouter.delete("/delete", DeleteAAAdventureController);
AdventureRouter.put("/update", UpdateAAdventureController);

module.exports = AdventureRouter;
