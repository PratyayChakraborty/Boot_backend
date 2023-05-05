const mongoose = require("mongoose");
require("dotenv").config();

const OrderSchema = new mongoose.Schema({
  category: { type: String, required: true },
  services: { type: String, required: true },
  link: { type: String, required: true },
  quantity: { type: Number, required: true },
  averageTime: { type: String, required: true },
  costval: { type: String, required: true },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//   },
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = { OrderModel };
