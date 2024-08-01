const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  numberOfPerson: {
    type: Number,
    required: true,
    default: 20,
  },
});

const AdventureDetailsSchema = new mongoose.Schema({
  adventureId: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "adventures",
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  openingHrs: {
    type: String,
    required: true,
    default: "10:00",
  },
  closingHrs: {
    type: String,
    required: true,
    default: "18:00",
  },
  onlineBooking: {
    type: Boolean,
    required: true,
    default: true,
  },
  slots: {
    type: [SlotSchema],
    required: true,
  },
});

const AdventureDetailModel = new mongoose.model(
  "adventure_details",
  AdventureDetailsSchema
);

module.exports = AdventureDetailModel;
