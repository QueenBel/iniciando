const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var matSchema = new Schema({
  Mnombre : String, //
  Msigla : String, //
  Mdocente: String,
  Mgrupo : String,
  Mlaboratorio: Array,
  Mcuestionario : Array

});
var mate = mongoose.model("mater", matSchema);
module.exports = mate;
