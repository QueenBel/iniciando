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
/*router.post("/buses", (req, res) => {
  var aa=[];
  ALU.find().select('_id Enombre').exec((error, docsa)=>{
    docsa.forEach((doca)=>{
      aa.push({'name':doca.Enombre,'id':doca._id});
    });
    //res.status(200).json(a);
    //console.log(aa.length);
  });

  var mm=[];
  MAT.find().select('_id Mnombre Mgrupo').exec((error, docsm)=>{
    docsm.forEach((docm)=>{
      mm.push({'id':docm._id, 'name':docm.Mnombre, 'group':docm.Mgrupo});
    });
    //res.status(200).json(m);
    //console.log(mm[0]);
  });


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
      for
      //labo.find().exec((error, docsl)=>{
        for (var i = 0; i < aa.length; i++) {
          labo.forEach(docl=>{
            var f=docl.alumno;
            var f1=docl.materia;
            //var ff=labo[i];
            var f2=docl.estado;
            if (f==a1 && f2=='terminado') {
            //if (f==a1 && f1==m1 && f2=='terminado') {
                var fff={
                      alu: f,
                      tipof:docl.tipo,
                      nombref:docl.nombre,
                      notaf:docl.nota,
                      estadof:docl.estado,
                      fecha:docl.fecha,
                      mat: f1
                    };
                    j.push(fff);
            }else if (f==a1 && f2=='falta') {
              var fff={
                    alu: f,
                    tipof:docl.tipo,
                    nombref:docl.nombre,
                    notaf:docl.nota,
                    estadof:docl.estado,
                    fecha:docl.fecha,
                    mat: f1
                  };
                  j1.push(fff);
            }else if (f==a1 && f2=='pendiente') {
              var fff={
                    alu: f,
                    tipof:docl.tipo,
                    nombref:docl.nombre,
                    notaf:docl.nota,
                    estadof:docl.estado,
                    fecha:docl.fecha,
                    mat: f1
                  };
                  j2.push(fff);
            }
          })
        }
        var jj={labor:j, cant: j.length};
        var jj1={labor:j1, cant:j1.length};
        var jj2={labor:j2, cant:j2.length};

        var labor1={
          revisado:jj, falta:jj1, pendiente:jj2
        };
        res.status(200).json(labor1);
           return;
      //})
   });
 });
*/
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
     var rrr={cantidad:mm.length, materias:mm}
     res.status(200).json(rrr);
     //console.log(mm[0]);
   });
 });

 router.post("/buses", (req, res) => {
   var dia=req.body.dia;
   var mes=req.body.mes;
   var anio=req.body.anio;
   var ida=req.body.idal;
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

module.exports = router;
