const express = require("express");
const router = express.Router();
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
var DOCE = require("../../../database/collections/../../database/collections/docente");
var MAT = require("../../../database/collections/../../database/collections/materia");
var ALU = require("../../../database/collections/../../database/collections/alumno");
var PRA = require("../../../database/collections/../../database/collections/practica");
var CUE = require("../../../database/collections/../../database/collections/cuestionario");
var NO = require("../../../database/collections/../../database/collections/nota");

router.post("/dimensionesPra", (req, res) => {
  /*funcion de rangos*/
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
  /*=================*/
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  var labo=[];
  PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Ldocente Lmateria Lestados fecha _id").exec().then((docs)=>{
    if (docs != null) {
      docs.forEach((doc)=>{
        var m=doc.fecha.getMonth()+1;
        var d=doc.fecha.getDate();
        var a=doc.fecha.getFullYear();
        var l=doc.Ltipo;
        if (results!='') {
          for (var i = 0; i < results.length; i++) {
            if (doc.fecha.getFullYear()==results[i].anio) {
               var m=doc.fecha.getMonth()+1;
               if (m==results[i].mes) {
                 var d=doc.fecha.getDate();
                if (d==results[i].dia && lab==l) {
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
                      },
                      idlab:doc._id
                    });
                 }else if (d==results[i].dia && lab=='') {
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
                       },
                       idlab:doc._id
                     });
                 }
               }
            }
         }
          return;
        }
        if (l==lab && a==anio && mes=='' && dia=='') {
           labo.push({
             tipo:doc.Ltipo,
             nombre:doc.Lnombre,
             nota:doc.Lnota,
             alumno:doc.Lalumno,
             materia:doc.Lmateria,
             estado:doc.Lestados,
             fecha:doc.fecha,
             idlab:doc._id,
             estudiante:{
               url:'/api/v1.0/student/'+doc.Lalumno
             }
           });
        }else if (a==anio && mes=='' && dia=='' && lab==''){
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && m==mes && dia=='' && lab=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && m==mes && dia=='' && l==lab) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && mes=='' && d==dia && lab=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && mes=='' && d==dia && l==lab) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && m==mes && d==dia && lab=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && m==mes && d==dia && l==lab) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && m==mes && dia=='' && lab=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && m==mes && dia=='' && l==lab) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && mes=='' && d==dia && lab=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && mes=='' && d==dia && l==lab) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && m==mes && d==dia && lab=='') {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (a==anio && m==mes && d==dia && l==lab) {
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && mes=='' && dia=='' && lab==''){
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }else if (anio=='' && mes=='' && dia=='' && l==lab){
          labo.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id,
            estudiante:{
              url:'/api/v1.0/student/'+doc.Lalumno
            }
          });
        }
      });
      res.status(200).json({cant:labo.length, Info:labo});
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

module.exports = router;
