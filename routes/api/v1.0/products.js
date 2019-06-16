const express = require("express");
const router = express.Router();
var Product = require("../../../database/collections/../../database/collections/product");
var Order = require("../../../database/collections/../../database/collections/order");
const mongoose = require("mongoose");
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
var DOCE = require("../../../database/collections/../../database/collections/docente");
var MAT = require("../../../database/collections/../../database/collections/materia");
var ALU = require("../../../database/collections/../../database/collections/alumno");
var PRA = require("../../../database/collections/../../database/collections/practica");
var CUE = require("../../../database/collections/../../database/collections/cuestionario");
var NO = require("../../../database/collections/../../database/collections/nota");
router.post("/rangos", (req, res) => {
  var info=[];

  var diasEntreFechas = function(fechaDesde, fechaHasta) {
  	var dia_actual = fechaDesde;
    var fechas = [];
    var date, date1, date2;
  	while (dia_actual.isSameOrBefore(fechaHasta)) {
       date=dia_actual.format('YYYY');
       date1=dia_actual.format('MM');
       date2=dia_actual.format('DD');
       fechas.push({'anio': date, 'mes': date1, 'dia': date2});
    	 dia_actual.add(1, 'days');
  	}
  	return fechas;
  };
  var fechaDesde = moment(req.body.desde);
  var fechaHasta = moment(req.body.hasta);

  var results=diasEntreFechas(fechaDesde, fechaHasta);
    PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria fecha").exec().then((docs)=>{
          for (var i = 0; i < results.length; i++) {
              docs.forEach(function(doc){
                if (doc.fecha.getFullYear()==results[i].anio) {
                   var m=doc.fecha.getMonth()+1;
                   if (m==results[i].mes) {
                     var d=doc.fecha.getDate();
                    if (d==results[i].dia) {
                      info.push({
                        tipo:doc.Ltipo,
                        nombre:doc.Lnombre,
                        nota:doc.Lnota,
                        alumno:doc.Lalumno,
                        materia:doc.Lmateria,
                        fecha:doc.fecha,
                        estudiante:{
                          url:'/api/v1.0/student/'+doc.Lalumno
                        }
                      });
                     }
                   }
                }
                return;
              });
         }
         res.status(200).json(info);
  }).catch(err => {
       console.log(err);
       res.status(500).json({
       error: err
       });
    });
});

router.post("/anmedi", (req, res) => {
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  var labo=[];
  PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria fecha").exec().then((docs)=>{
    if (docs != null) {
      docs.forEach((doc)=>{
        var m=doc.fecha.getMonth()+1;
        var d=doc.fecha.getDate();
        var a=doc.fecha.getFullYear();
        if (a==anio && mes=='' && dia=='') {
           labo.push({
             tipo:doc.Ltipo,
             nombre:doc.Lnombre,
             nota:doc.Lnota,
             alumno:doc.Lalumno,
             materia:doc.Lmateria,
             fecha:doc.fecha,
             estudiante:{
               url:'/api/v1.0/student/'+doc.Lalumno
             }
           });
        }else if (a==anio && m==mes && dia=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && mes=='' && d==dia) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && m==mes && d==dia) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && m==mes && dia=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && mes=='' && d==dia) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && m==mes && d==dia) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }
      });
      res.status(200).json(labo);
      return;
    }
    res.status(204).json({
      "msn" : "No existe el recurso "
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });
 });
/*=*=*=**=*=*=*=*=*=**=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=**/
router.get("/producto", (req, res, next) => {
  var r=[];
  Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      var suma=0;
      //var r=[];
      docs.forEach((doc)=>{
        r.push(doc.price);
      })
      console.log(r);
      for (var i = 0; i < r.length; i++) {
//        r[i];
        suma=r[i]+suma
      }
      const response = {
        products: docs.map((doc, i)=> {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id
          };
        }),
        total:suma
      };
      const response1 = {
        count: 'docs.price',
        products: docs.map((doc, i)=> {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id
          };
        }),
        total:8
      };
      res.status(200).json({lab:response,
      cuest:response1});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/producto", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/pruducto/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/producto/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("producto/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/products',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
