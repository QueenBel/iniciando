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
/*============BUSCADOR POR DIMENSIONES + materia DE UN DETERMINADO ESTUDIANTE==============*/
router.post(/estuDimenMat\/[a-z0-9]{1,}$/, (req, res) => {
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
  //var params=req.query;
  var fechaDesde = moment(req.body.desde);
  var fechaHasta = moment(req.body.hasta);
  /*var fechaDesde = moment(params.desde);
  var fechaHasta = moment(params.hasta);*/

  var results=diasEntreFechas(fechaDesde, fechaHasta);
  /*=================*/
  /*var dia=params.dia;
  var mes=params.mes;
  var anio=params.anio;
  var lab=params.lab;*/
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  var url=req.url;
  var ida= url.split("/")[2];
  //let idm=params.idma;
  let idm=req.body.idma;
  var labo=[];
  ALU.findOne({_id:ida}).exec((err, doca)=>{
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
       PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Ldocente Lmateria Lestados fecha _id").exec().then((docs)=>{
      if (docs != null) {
        docs.forEach(doc=>{
          var m=doc.fecha.getMonth()+1;
          var d=doc.fecha.getDate();
          var a=doc.fecha.getFullYear();
          var l=doc.Ltipo;
          if (doc.Lalumno==ida && doc.Lmateria==idm) {
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
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
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
                           //alumno:doc.Lalumno,
                           //materia:doc.Lmateria,
                           //docente:doc.Ldocente,
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
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && mes=='' && dia=='' && lab==''){
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && dia=='' && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && dia=='' && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && mes=='' && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && mes=='' && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && dia=='' && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && dia=='' && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && dia=='' && lab==''){
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && dia=='' && l==lab){
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  //materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }
          }
        });
        var result={Estudiante:doca.Enombre, Ci:doca.Eci, Gestion:doca.Egestion, cant:labo.length, Laboratorios:labo};
        res.status(200).json(result);
        return;
      }
      res.status(204).json({
        "msn" : "No existe el recurso "
      })
    });
     });
   });
 });

/*============BUSCADOR POR DIMENSIONES + materia+TERMINADOS+FALTANTES+PENDIENTEDE UN DETERMINADO ESTUDIANTE==============*/
router.post(/estuDimenMatTFP\/[a-z0-9]{1,}$/, (req, res) => {
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
  //var params=req.query;
  var fechaDesde = moment(req.body.desde);
  var fechaHasta = moment(req.body.hasta);
  /*var fechaDesde = moment(params.desde);
  var fechaHasta = moment(params.hasta);*/

  var results=diasEntreFechas(fechaDesde, fechaHasta);
  /*=================*/
  /*var dia=params.dia;
  var mes=params.mes;
  var anio=params.anio;
  var lab=params.lab;*/
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  var url=req.url;
  var ida= url.split("/")[2];
  //let idm=params.idma;
  let idm=req.body.idma;
  var info=[];
  var info1=[];
  var info2=[];

  ALU.findOne({_id:ida}).exec((err, doca)=>{
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
       PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Ldocente Lmateria Lestados fecha _id").exec().then((docs)=>{
         if (docs != null) {
           docs.forEach(doc=>{
             var m=doc.fecha.getMonth()+1;
             var d=doc.fecha.getDate();
             var a=doc.fecha.getFullYear();
             var l=doc.Ltipo;
             if (doc.Lalumno==ida && doc.Lmateria==idm) {
               if (results!='') {
                 for (var i = 0; i < results.length; i++) {
                   if (doc.fecha.getFullYear()==results[i].anio) {
                      var m=doc.fecha.getMonth()+1;
                      if (m==results[i].mes) {
                        var d=doc.fecha.getDate();
                       if (d==results[i].dia && lab==l) {
                              if (doc.Lestados=="terminado") {
                                info.push({
                                  tipo:doc.Ltipo,
                                  nombre:doc.Lnombre,
                                  nota:doc.Lnota,
                                  //alumno:doc.Lalumno,
                                  //materia:doc.Lmateria,
                                  //docente:doc.Ldocente,
                                  estado:doc.Lestados,
                                  fecha:doc.fecha,
                                  estudiante:{
                                    url:'/api/v1.0/student/'+doc.Lalumno
                                  },
                                  idlab:doc._id
                                });
                              }else if (doc.Lestados=="falta") {
                                info1.push({
                                  tipo:doc.Ltipo,
                                  nombre:doc.Lnombre,
                                  nota:doc.Lnota,
                                  //alumno:doc.Lalumno,
                                  //materia:doc.Lmateria,
                                  //docente:doc.Ldocente,
                                  estado:doc.Lestados,
                                  fecha:doc.fecha,
                                  estudiante:{
                                    url:'/api/v1.0/student/'+doc.Lalumno
                                  },
                                  idlab:doc._id
                                });
                              }else if (doc.Lestados=="pendiente") {
                                info2.push({
                                  tipo:doc.Ltipo,
                                  nombre:doc.Lnombre,
                                  nota:doc.Lnota,
                                  //alumno:doc.Lalumno,
                                  //materia:doc.Lmateria,
                                  //docente:doc.Ldocente,
                                  estado:doc.Lestados,
                                  fecha:doc.fecha,
                                  estudiante:{
                                    url:'/api/v1.0/student/'+doc.Lalumno
                                  },
                                  idlab:doc._id
                                });
                              }
                        }else if (d==results[i].dia && lab=='') {
                               if (doc.Lestados=="terminado") {
                                 info.push({
                                   tipo:doc.Ltipo,
                                   nombre:doc.Lnombre,
                                   nota:doc.Lnota,
                                   //alumno:doc.Lalumno,
                                   //materia:doc.Lmateria,
                                   //docente:doc.Ldocente,
                                   estado:doc.Lestados,
                                   fecha:doc.fecha,
                                   estudiante:{
                                     url:'/api/v1.0/student/'+doc.Lalumno
                                   },
                                   idlab:doc._id
                                 });
                               }else if (doc.Lestados=="falta") {
                                 info1.push({
                                   tipo:doc.Ltipo,
                                   nombre:doc.Lnombre,
                                   nota:doc.Lnota,
                                   //alumno:doc.Lalumno,
                                   //materia:doc.Lmateria,
                                   //docente:doc.Ldocente,
                                   estado:doc.Lestados,
                                   fecha:doc.fecha,
                                   estudiante:{
                                     url:'/api/v1.0/student/'+doc.Lalumno
                                   },
                                   idlab:doc._id
                                 });
                               }else if (doc.Lestados=="pendiente") {
                                 info2.push({
                                   tipo:doc.Ltipo,
                                   nombre:doc.Lnombre,
                                   nota:doc.Lnota,
                                   //alumno:doc.Lalumno,
                                   //materia:doc.Lmateria,
                                   //docente:doc.Ldocente,
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
                 }
                 return;
               }
               if (l==lab && a==anio && mes=='' && dia=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && mes=='' && dia=='' && lab==''){
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && m==mes && dia=='' && lab=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && m==mes && dia=='' && l==lab) {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && mes=='' && d==dia && lab=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && mes=='' && d==dia && l==lab) {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && m==mes && d==dia && lab=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && m==mes && d==dia && l==lab) {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && m==mes && dia=='' && lab=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && m==mes && dia=='' && l==lab) {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && mes=='' && d==dia && lab=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && mes=='' && d==dia && l==lab) {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && m==mes && d==dia && lab=='') {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (a==anio && m==mes && d==dia && l==lab) {
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && mes=='' && dia=='' && lab==''){
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }
               }else if (anio=='' && mes=='' && dia=='' && l==lab){
                      if (doc.Lestados=="terminado") {
                        info.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="falta") {
                        info1.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
                          estado:doc.Lestados,
                          fecha:doc.fecha,
                          estudiante:{
                            url:'/api/v1.0/student/'+doc.Lalumno
                          },
                          idlab:doc._id
                        });
                      }else if (doc.Lestados=="pendiente") {
                        info2.push({
                          tipo:doc.Ltipo,
                          nombre:doc.Lnombre,
                          nota:doc.Lnota,
                          //alumno:doc.Lalumno,
                          //materia:doc.Lmateria,
                          //docente:doc.Ldocente,
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
           });
           console.log(docs.length);
           var r={
              labo: info,
              cantidad: info.length
           };
           var r1={
              labo: info1,
              cantidad: info1.length
           };
           var r2={
              labo: info2,
              cantidad: info2.length
           };
           var labs={Terminado:r, Faltan:r1, Pendientes:r2};
           var result={Estudiante:doca.Enombre, Ci:doca.Eci, Gestion:doca.Egestion, Materia:docm.Mnombre, Grupo:docm.Mgrupo, Laboratorios:labs};
           res.status(200).json(result);
           return;
         }
         res.status(204).json({
           "msn" : "No existe el recurso "
         })
       })
     });
   });
 });

/*============BUSCADOR POR DIMENSIONES DE UN DETERMINADO ESTUDIANTE==============*/
router.post(/estuDimen\/[a-z0-9]{1,}$/, (req, res) => {
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
  //var params=req.query;
  var fechaDesde = moment(req.body.desde);
  var fechaHasta = moment(req.body.hasta);
  /*var fechaDesde = moment(params.desde);
  var fechaHasta = moment(params.hasta);*/

  var results=diasEntreFechas(fechaDesde, fechaHasta);
  /*=================*/
  /*var dia=params.dia;
  var mes=params.mes;
  var anio=params.anio;
  var lab=params.lab;*/
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
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
        docs.forEach(doc=>{
          var m=doc.fecha.getMonth()+1;
          var d=doc.fecha.getDate();
          var a=doc.fecha.getFullYear();
          var l=doc.Ltipo;
          if (doc.Lalumno==ida) {
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
                          //alumno:doc.Lalumno,
                          materia:doc.Lmateria,
                          //docente:doc.Ldocente,
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
                           //alumno:doc.Lalumno,
                           materia:doc.Lmateria,
                           //docente:doc.Ldocente,
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
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && mes=='' && dia=='' && lab==''){
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && dia=='' && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && dia=='' && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && mes=='' && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && mes=='' && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && dia=='' && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && m==mes && dia=='' && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && d==dia && lab=='') {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (a==anio && m==mes && d==dia && l==lab) {
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && dia=='' && lab==''){
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }else if (anio=='' && mes=='' && dia=='' && l==lab){
                labo.push({
                  tipo:doc.Ltipo,
                  nombre:doc.Lnombre,
                  nota:doc.Lnota,
                  //alumno:doc.Lalumno,
                  materia:doc.Lmateria,
                  //docente:doc.Ldocente,
                  estado:doc.Lestados,
                  fecha:doc.fecha,
                  estudiante:{
                    url:'/api/v1.0/student/'+doc.Lalumno
                  },
                  idlab:doc._id
                });
            }
          }
        });
        var result={Estudiante:doca.Enombre, Ci:doca.Eci, Gestion:doca.Egestion, cant:labo.length, Laboratorios:labo};
        res.status(200).json(result);
        return;
      }
      res.status(204).json({
        "msn" : "No existe el recurso "
      })
    });
  })
 });

/*=*=***=*=*=*=*=*==*=*=**=*=**=*=*=**=*=*=**=*=*=*=*=*===*==*=*=**==*=*=**=*=*=*==*=*=*/
router.get(/estudiante\/[a-z0-9]{1,}$/, (req, res) => {
  var info=[];
  var url = req.url;
  var idAl = url.split('/')[2];
  ALU.findOne({_id : idAl}).exec((err, docA) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Ldocente Lmateria Lestados fecha _id").exec().then((docs)=>{
      docs.forEach(doc=>{
        if (doc.Lalumno==idAl) {
          info.push({
            tipo:doc.Ltipo,
            nombre:doc.Lnombre,
            nota:doc.Lnota,
            alumno:doc.Lalumno,
            materia:doc.Lmateria,
            estado:doc.Lestados,
            fecha:doc.fecha,
            idlab:doc._id
          });
        }
      });
      res.status(200).json({estudent:docA.Enombre, cant:info.length, LABS:info});
    });
  });
});

module.exports = router;
