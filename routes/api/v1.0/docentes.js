const express = require("express");
const router = express.Router();
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
/*--============BUSCAR POR DIAS MESES ANIOS=================*/
router.post(/doceAMD\/[a-z0-9]{1,}$/, (req, res) => {
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var url=req.url;
  var iddo= url.split("/")[2];
  var info=[];
  var info1=[];
  var info2=[];
  let idm=req.body.idma;
  DOCE.findOne({_id:iddo}).exec((err, docd)=>{
    if (err) {
       res.status(500).json({
           msn: "error"
       });
       return;
     }MAT.findOne({_id:idm}).exec((err, docm)=>{
       if (err) {
         res.status(500).json({
             msn: "error"
         });
         return;
       }
      PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Ldocente Lmateria Lestados fecha").exec().then((docs)=>{
        if (docs != null) {
          docs.forEach((doc)=>{
            var m=doc.fecha.getMonth()+1;
            var d=doc.fecha.getDate();
            var a=doc.fecha.getFullYear();
            if (doc.Ldocente==iddo) {
              if (a==anio && mes=='' && dia=='') {
                 info.push({
                   tipo:doc.Ltipo,
                   nombre:doc.Lnombre,
                   nota:doc.Lnota,
                   alumno:doc.Lalumno,
                   materia:doc.Lmateria,
                   estado:doc.Lestados,
                   fecha:doc.fecha
                 });
              }else if (a==anio && m==mes && dia=='') {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }else if (a==anio && mes=='' && d==dia) {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }else if (anio=='' && m==mes && d==dia) {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  alumno:doc.Lalumno,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }else if (anio=='' && m==mes && dia=='') {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }else if (anio=='' && mes=='' && d==dia) {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }else if (a==anio && m==mes && d==dia) {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }else if (anio=='' && mes=='' && dia=='') {
                info.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
              }
            }
          });
          console.log(docs.length);
          var resul={docente:docd.Dnombre, laboratorios:info};
          res.status(200).json(resul);
          return;
        }
        res.status(204).json({
          "msn" : "No existe el recurso "
        })
      });
    });
  })
});
/*===============BUSCAR POR RANGOS========================*/
  router.post(/doceRangos\/[a-z0-9]{1,}$/, (req, res) => {
    var url=req.url
    var iddo= url.split("/")[2];
    let idm=req.body.idma;
    var mm=new Array;
    var mm1=new Array;
    var mm2=new Array;
    DOCE.findOne({_id:iddo}).exec((err, docd)=>{
      if (err) {
         res.status(500).json({
             msn: "error"
         });
         return;
       }
       MAT.findOne({_id:idm}).exec((err, docm)=>{
         if (err) {
           res.status(500).json({
               msn: "error"
           });
           return;
         }
         var info=[];
         var info1=[];
         var info2=[];
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
          PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria Ldocente Lestados fecha _id").exec().then((docs)=>{
                   docs.forEach(function(doc){
                      if (doc.Ldocente==iddo) {
                        if (results!='') {
                          for (var i = 0; i < results.length; i++) {
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
                        info.push({
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
                      //return;
                    });
               //}
               console.log(docs.length);
               var resul={docente:docd.Dnombre, laboratorios:info};
               res.status(200).json(resul);
               //res.status(200).json(info);
         })
       });
     });
   });
module.exports = router;
