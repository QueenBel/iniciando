const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var feSchema = new Schema({
   dia: Date,
   mes: Date,
   anio: Date,
   fecha: Date
   //fecha: String
});
var fec = mongoose.model("calendar", feSchema);
module.exports = fec;
