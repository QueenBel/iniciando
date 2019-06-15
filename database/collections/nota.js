const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var notSchema = new Schema({
   Canombre : String, // materia
   Caci: String, //estudiante
   Calab : Array, // hace referencia a los laboratorios
   CapondLab: Number, //la nota final de labs
   Cacuest : Array, // hace referencia a los cueationario
   CapondCuest: Number,
   fecha: Date
});
var nnn = mongoose.model("notanota", notSchema);
module.exports = nnn;
