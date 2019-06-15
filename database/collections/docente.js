const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var docSchema = new Schema({
  Dnombre : String, //
  //Eci : Number, //
  //Egestion: String,
  Dasignatura : Array
  //fecha: Date
});
var doce = mongoose.model("docen", docSchema);
module.exports = doce;
