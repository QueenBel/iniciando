const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var pracSchema = new Schema({
   Ltipo : String, // lab1 lab2
   Lnombre : String, //nombre de laboratorio
   Lnota: Number,
   Lalumno: String,
   Lmateria:String,
   Ldocente:String,
   Lestados:String,
   fecha: Date
});
var prac = mongoose.model("pract", pracSchema);
module.exports = prac;
