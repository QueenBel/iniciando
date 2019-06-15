const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var cuesSchema = new Schema({
   Ctipo : String, // lab1 lab2
   Cnombre : String, //nombre de laboratorio
   Cnota: Number,
   Calumno: String,
   Cmateria:String,
   fecha: Date
});
var cues = mongoose.model("cuest", cuesSchema);
module.exports = cues;
