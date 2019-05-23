const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var labSchema = new Schema({
   tipo : String, // lab1 lab2
  nombre : String, //nombre de laboratorio
  ci : Number, // hace referencia al ci del estudiante
   notalab: Number,
  //notacuest : Number,
  fecha: Date
});
var labo = mongoose.model("lab", labSchema);
module.exports = labo;
