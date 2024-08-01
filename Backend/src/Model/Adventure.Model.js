const mongoose = require("mongoose");

const AdventureSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "cities",
    required: true,
  },
  category: {
    type: [String],
  },
  images: {
    type: [String],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  pricePerHead: {
    type: Number,
    required: true,
  },
  Currency: {
    type: String,
    default: "INR",
  },
  name: {
    type: String,
    required: true,
  },
});

const AdventureModel = new mongoose.model("Adventures", AdventureSchema);

module.exports = AdventureModel;
