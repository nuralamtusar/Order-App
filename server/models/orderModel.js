const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  orderNo: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
