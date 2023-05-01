const mongoose = require("mongoose");
require("dotenv").config();

const OrderSchema = new mongoose.Schema({
  category: { type: String, required: true },
  service: { type: String, required: true },
  link: { type: String, required: true },
  quantity: { type: nymber, required: true },
  averageTime: { type: String, required: true },
  charge:{ type: String, required: true },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = { OrderModel };
