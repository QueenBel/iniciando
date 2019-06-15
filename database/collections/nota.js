const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var notSchema = new Schema({
   Canombre : String, // materia
   Caci: String, //estudiante
   Calab : Array, // hace referencia a los laboratorios
   Cacuest : Array, // hace referencia a los cueationario
   fecha: Date
});
var nnn = mongoose.model("notanota", notSchema);
module.exports = nnn;
