const express = require("express");

const {
  createAdventureDetailController,
} = require("./../controller/AdventureDetails.Controller");

const AdventureDetailsRouter = express.Router();

AdventureDetailsRouter.post("/add", createAdventureDetailController);

module.exports = AdventureDetailsRouter;
