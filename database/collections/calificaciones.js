const mongoose = require("../connect");
var mon = require('mongoose');
var Schema = mon.Schema;
var calSchema = new Schema({
  _id: Schema.Types.ObjectId,
   Cnombre : String, // materia
   Cci: String, //estudiante
   Clab : Array, // hace referencia a los laboratorios
   CpondLab: Number, //la nota final de labs
   Ccuest : Array, // hace referencia a los cueationario
   CpondCuest: Number, //la nota final de cuest
   alumno: { type: Schema.Types.ObjectId, ref: 'alumn', required: true }, //hace referencia al estudiante
   materia: { type: Schema.Types.ObjectId, ref: 'mater', required: true }, //hace referencia al materia
   practica: { type: Schema.Types.ObjectId, ref: 'pract', required: true },
  fecha: Date
});
var cali = mongoose.model("califi", calSchema);
module.exports = cali;
/*const mongoose = require("../connect");
const mongoos = require('mongoose');
const orderSchema = mongoos.Schema({
    _id: mongoos.Schema.Types.ObjectId,
    product: { type: mongoos.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
})
module.exports = mongoose.model('Order', orderSchema);*/
