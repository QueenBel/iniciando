const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var estSchema = new Schema({
  Enombre : String, //
  Eci : Number, //
  Egestion: String,
  Emateria : String,
  fecha: Date
});
var estu = mongoose.model("estud", estSchema);
module.exports = estu;
