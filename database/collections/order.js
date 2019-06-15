const mongoose = require("../connect");
const mongoos = require('mongoose');
const orderSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    product: { type: mongoos.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: String
});

module.exports = mongoose.model('Order', orderSchema);
