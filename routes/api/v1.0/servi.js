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


router.post("/estados", (req, res) => {
  var resultado=[];
  var resultado1=[];
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
            }
          });
          var suma=0;
          for (var i = 0; i < resultado.length; i++) {
            suma=resultado[i].nota+suma;
          }
          var div=suma/resultado.length;
        //  console.log(resultado.length);
          var r={
             laboratorios: resultado,
             ponderacion: div,
             cantidad: resultado.length
          };
          var r1={
             laboratorios: resultado1,
             cantidad: resultado1.length
          };
          var notin = {
            Canombre : docm.Mnombre, // materia
            Caci: doca.Enombre, //estudiante
            CalabRe : r,
            CalabFa : r1
        };
        res.status(200).json(notin)
      });
    });
  });
});

module.exports = router;
