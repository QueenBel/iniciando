const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var alumSchema = new Schema({
  Enombre : String, //
  Eci : Number, //
  Egestion: String,
  Epracticas: Array
//  Emateria : [{ type: Schema.Types.ObjectId, ref: 'mater', required: true }]
});
var alum = mongoose.model("alumn", alumSchema);
module.exports = alum;
