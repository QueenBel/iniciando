const express = require("express");
const router = express.Router();
var Product = require("../../../database/collections/../../database/collections/product");
var Order = require("../../../database/collections/../../database/collections/order");
const mongoose = require("mongoose");

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

var DOCE = require("../../../database/collections/../../database/collections/docente");

/*=========== MATERIA MATERIA MATERIA MATERIA ==========*/
var MAT = require("../../../database/collections/../../database/collections/materia");

/*=========== ESTUDIANTE ESTUDIANTE ESTUDANTE ESTUDIANTE ==========*/
var ALU = require("../../../database/collections/../../database/collections/alumno");

/*=========== LABORATORIO LABORATORIO LABORATORIO LABORATORIO ==========*/
var PRA = require("../../../database/collections/../../database/collections/practica");

/*=========== CUESTIONARIO CUESTIONARIO CUESTIONARIO CUESTIONARIO==========*/
var CUE = require("../../../database/collections/../../database/collections/cuestionario");

/*=========== CALIFICACION CALIFICACION CALIFICACION CALIFICACION==========*/
var NO = require("../../../database/collections/../../database/collections/nota");

router.post("/notas", (req, res) => {
  var resultado=[];
  let idm=req.body.idma;
  let ida=req.body.idal;
  MAT.findOne({_id:idm}).exec((err, docm)=>{
    if (err) {
      res.status(500).json({
          msn: "error "
      });
      return;
    }
    ALU.findOne({_id:ida}).exec((err, doca)=>{
      if (err) {
        res.status(500).json({
            msn: "error"
        });
        return;
      }
      PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria fecha").exec().then((docs)=>{
          docs.forEach((doc)=>{
            var m=doc.Lmateria;
            var a=doc.Lalumno;
            if (a==ida && m==idm) {
               resultado.push({
                  'tipo':doc.Ltipo,
                  'nombre':doc.Lnombre,
                  'nota':doc.Lnota,
                  'fecha':doc.fecha
               });
            }
          });
          var suma=0;
          for (var i = 0; i < resultado.length; i++) {
            suma=resultado[i].nota+suma;
          }
          var div=suma/resultado.length;
          console.log(resultado.length);
          var r={
             laboratorios: resultado,
             ponderacion: div
          };
          var notin = {
            Canombre : docm.Mnombre, // materia
            Caci: doca.Eci, //estudiante
            Calab : r,
            Cacuest : '',
            fecha: new Date()
        };
        var alData = new NO(notin);
        alData.save().then((rr) => {
              //content-type
              res.status(200).json(rr);
              return;
        })
      });
    });
  });
});

router.get('/notas', (req, res) => {
  NO.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

// Handle incoming GET requests to /orders
router.get("/orden", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/orden", (req, res) => {
  var id=req.body.productId;
  //var n;
  Product.findOne({_id: id }).exec((err,docs)=>{

    var profe = {
      _id: mongoose.Types.ObjectId(),
      quantity: docs.name,
      product: id
    };
    var doData = new Order(profe);

    doData.save().then( (rr) => {
      //content-type
      res.status(200).json(rr);
      return;
    });

  });
  //console.log(n);

});

router.get("/orden/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/orden/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
