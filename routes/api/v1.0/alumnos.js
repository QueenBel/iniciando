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

 router.get("/alu", (req, res) => {
   var aa=[];
   ALU.find().select('_id Enombre').exec((error, docsa)=>{
     docsa.forEach((doca)=>{
       aa.push({'name':doca.Enombre,'id':doca._id});
     });
     res.status(200).json(aa);
     //console.log(aa.length);
   });
 });

 router.get("/mat", (req, res) => {
    var mm=[];
   MAT.find().select('_id Mnombre Mgrupo').exec((error, docsm)=>{
     docsm.forEach((docm)=>{
       mm.push({'id':docm._id, 'name':docm.Mnombre, 'group':docm.Mgrupo});
     });
     res.status(200).json(mm);
     //console.log(mm[0]);
   });
 });

 router.post(/alumAMD\/[a-z0-9]{1,}$/, (req, res) => {
   var dia=req.body.dia;
   var mes=req.body.mes;
   var anio=req.body.anio;
   var url=req.url;
   var ida= url.split("/")[2];
   var labo=[];
   ALU.findOne({_id:ida}).exec((err, doca)=>{
     if (err) {
        res.status(500).json({
            msn: "error"
        });
        return;
      }
     PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria Lestados fecha").exec().then((docs)=>{
       if (docs != null) {

         docs.forEach((doc)=>{
           var m=doc.fecha.getMonth()+1;
           var d=doc.fecha.getDate();
           var a=doc.fecha.getFullYear();
           if (doc.Lalumno==ida) {
             if (a==anio && mes=='' && dia=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  alumno:doca.Enombre,
                  materia:doc.Lmateria,
                  estado:doc.Lestados,
                  fecha:doc.fecha
                });
             }else if (a==anio && m==mes && dia=='') {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }else if (a==anio && mes=='' && d==dia) {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }else if (anio=='' && m==mes && d==dia) {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }else if (anio=='' && m==mes && dia=='') {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }else if (anio=='' && mes=='' && d==dia) {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }else if (a==anio && m==mes && d==dia) {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }else if (anio=='' && mes=='' && dia=='') {
               labo.push({
                 tipo:doc.Ltipo,
                 nombre:doc.Lnombre,
                 nota:doc.Lnota,
                 alumno:doca.Enombre,
                 materia:doc.Lmateria,
                 estado:doc.Lestados,
                 fecha:doc.fecha
               });
             }
           }
         });
         console.log(docs.length);
         var resul={alumno:doca.Enombre, laboratorios:labo};
         res.status(200).json(resul);
         return;
       }
       res.status(204).json({
         "msn" : "No existe el recurso "
       })
     });
   })
  });
  /*alumno unico q mostrara todo los lab de todas sus materias*/
  router.post(/alumRangos\/[a-z0-9]{1,}$/, (req, res) => {
    var url=req.url
    var ida= url.split("/")[2];
    ALU.findOne({_id:ida}).exec((err, doca)=>{
      if (err) {
         res.status(500).json({
             msn: "error"
         });
         return;
       }
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
    PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria Lestados fecha _id").exec().then((docs)=>{
          //for (var i = 0; i < results.length; i++) {
              docs.forEach(function(doc){
                //for (var i = 0; i < results.length; i++) {
                if (doc.Lalumno==ida) {
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
                    return
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
         var resul={alumno:doca.Enombre, laboratorios:info};
         res.status(200).json(resul);
         //res.status(200).json(info);
       })
     })
   });

module.exports = router;
