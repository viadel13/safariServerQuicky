const mongoose = require('mongoose');

const sendOrdersSchema = mongoose.Schema({
  send: Object,
  receive: Object,
  features: Object,
  code: Number,
  },
  {
    timestamps: true
  }
);

const sendOrders = mongoose.model("sendOrders", sendOrdersSchema);

module.exports = sendOrders;