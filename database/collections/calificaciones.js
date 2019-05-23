const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var calSchema = new Schema({
   materia : String, // materia
  labor : Array, // hace referencia a los laboratorios
//  cantidad : Number,
  ponderacion: Number,
   estud: String, //hace referencia al estudiante
  fecha: Date
});
var cali = mongoose.model("califi", calSchema);
module.exports = cali;
