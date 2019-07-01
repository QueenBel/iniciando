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
router.get(/notas\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idno = url.split('/')[2];
  NO.findOne({_id : idno}).exec((err, docs) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

router.post("/notas", (req, res) => {
  var resultado=[];
  var resultado1=[];
  var resultado2=[];
  let idm=req.body.idma;
  let ida=req.body.idal;
  let idd=req.body.iddo;
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
      DOCE.findOne({_id:idd}).exec((err, docd)=>{
        if (err) {
          res.status(500).json({
            msn: "error"
          });
          return;
        }
        PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria Lestados fecha").exec().then((docs)=>{
            docs.forEach((doc)=>{
              var m=doc.Lmateria;
              var a=doc.Lalumno;
              if (a==ida && m==idm && doc.Lestados=="terminado") {
                 resultado.push({
                    'tipo':doc.Ltipo,
                    'nombre':doc.Lnombre,
                    'nota':doc.Lnota,
                    'estado':doc.Lestados,
                    'fecha':doc.fecha
                 });
              }else if (a==ida && m==idm && doc.Lestados=="falta") {
               resultado1.push({
                 'tipo':doc.Ltipo,
                 'nombre':doc.Lnombre,
                 'nota':doc.Lnota,
                 'estado':doc.Lestados,
                 'fecha':doc.fecha
               });
             }else if (a==ida && m==idm && doc.Lestados=="pendiente") {
               resultado2.push({
                 'tipo':doc.Ltipo,
                 'nombre':doc.Lnombre,
                 'nota':doc.Lnota,
                 'estado':doc.Lestados,
                 'fecha':doc.fecha
              });
            }
          });
         /*============== LAB TERMINADOS=============*/
            var suma=0;
            for (var i = 0; i < resultado.length; i++) {
              suma=resultado[i].nota+suma;
            }
            var div=suma/resultado.length;
            console.log(resultado.length);
            var r={
               laboratorios: resultado,
               cantidad: resultado.length,
               ponderacion: div
            };
        /*============== LAB QUE FALTAN=============*/
            var r1={
             laboratorios: resultado1,
             cantidad: resultado1.length
            };
        /*============== LAB PENDIENTES=============*/
            var r2={
             laboratorios: resultado2,
             cantidad: resultado2.length
            };
       /*=============*****************************/
           var lab ={
             Revisados : r,
             Faltantes : r1,
             Pendientes : r2
           };
      /*=============*****************************/
            var notin = {
              Canombre : docm.Mnombre, // materia
              Caidmat : docm._id,
              CaGrumat : docm.Mgrupo,
              Cadocente : docd.Dnombre, //docente
              Caiddoc : docd._id,
              Caci: doca.Eci, //estudiante
              Caestu : doca.Enombre, //nombre de estudiante
              Caidalu : doca._id,
              Calab : lab,
              Cacuest : '',
              fecha: new Date()

          };
          var alData = new NO(notin);
          alData.save().then((rrINFO) => {
            var univ={
              Epracticas:new Array()
            }
            ALU.findOne({_id:ida}).exec((err, docs)=>{
              var espra=docs.Epracticas;
              var aux=new Array();
              if(espra.length==1 && espra[0]==''){
                univ.Epracticas.push('/api/v1.0/notas/'+rrINFO._id)

              }else {
                aux.push('/api/v1.0/notas/'+rrINFO._id);
                espra=espra.concat(aux);
                univ.Epracticas=espra;
              }
              ALU.findOneAndUpdate({_id:ida}, univ, (err, params)=>{
                if (err) {
                  res.status(500).json({
                    msn:'error'
                  });
                  return;
                }
                return;
              })
            });
            res.status(200).json(rrINFO);
            return;
          })
        });
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
