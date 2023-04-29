const mongoose = require("mongoose");
require("dotenv").config();

const DiscountSchema = new mongoose.Schema({
  discountName: { type: String, required: true },
  type:[
    {String, required: true}
   ]  
});

const DiscountModel = mongoose.model("Discount", DiscountSchema);

module.exports = { DiscountModel };