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
router.post("/buses", (req, res) => {

  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  var labo=[];
  PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria Lestados fecha").exec().then((docs)=>{
//    if (docs != null) {
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
             estado:doc.Lestados,
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
            estado:doc.Lestados,
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
            estado:doc.Lestados,
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
            estado:doc.Lestados,
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
            estado:doc.Lestados,
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
            estado:doc.Lestados,
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
            estado:doc.Lestados,
            fecha:doc.fecha,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }
      });
      var j=[];
      var j1=[];
      var j2=[];
      for (var i = 0; i < labo.length; i++) {
        var f=labo[i].alumno;
        var f1=labo[i].materia;
        var ff=labo[i];
        var f2=labo[i].estado;
        if (f=='5d002d3489949937186db928' && f1=='5d004abc1975ee41110c7568' && f2=='terminado') {
            var fff={
                  tipof:ff.tipo,
                  nombref:ff.nombre,
                  notaf:ff.nota,
                  estadof:ff.estado,
                  fecha:ff.fecha
                };
                j.push(fff);
        }else if (f=='5d002d3489949937186db928' && f1=='5d004abc1975ee41110c7568' && f2=='falta') {
          var fff={
                tipof:ff.tipo,
                nombref:ff.nombre,
                notaf:ff.nota,
                estadof:ff.estado,
                fecha:ff.fecha
              };
              j1.push(fff);
        }else if (f=='5d002d3489949937186db928' && f1=='5d004abc1975ee41110c7568' && f2=='pendiente') {
          var fff={
                tipof:ff.tipo,
                nombref:ff.nombre,
                notaf:ff.nota,
                estadof:ff.estado,
                fecha:ff.fecha
              };
              j2.push(fff);
        }
      }
      var jj={labor:j, cant: j.length};
      var jj1={term:j1, cant:j1.length};
      var jj2={term:j2, cant:j2.length};
  console.log(j);
 console.log(jj1);
 console.log(jj2);
      var labor={
        rev:jj, fal:jj1, pend:jj2
      };

      var resultado={
        estudiante:"isabel",
        materia:"seguridad",
        practicas:labor
      };
      res.status(200).json(resultado);
      return;
  });
 });

module.exports = router;
