const mongoose = require("mongoose");
require("dotenv").config();

const TicketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true},
  orderId: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const TicketModel = mongoose.model("Tickects", TicketSchema);

module.exports = { TicketModel };