var express = require('express');
var multer = require('multer');
var router = express.Router();
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const mongoose = require("mongoose");

var DOCE = require("../../../database/collections/../../database/collections/docente");

router.put(/docent\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var profe = {
    Dasignatura : ''
  };
  DOCE.findOneAndUpdate({_id: id}, user, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
router.get(/docent\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idDo = url.split('/')[2];
  DOCE.findOne({_id : idDo}).exec((err, docs) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

router.post("/docent", (req, res) => {
  var profe = {
    Dnombre : req.body.nombre,
    Dasignatura : ''
  };
  var doData = new DOCE(profe);

  doData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "registrado con exito "
    });
  });
});

router.get('/docent', (req, res) => {
  DOCE.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});


/*=========== MATERIA MATERIA MATERIA MATERIA ==========*/
var MAT = require("../../../database/collections/../../database/collections/materia");

router.get(/asignat\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idMa = url.split('/')[2];
  MAT.findOne({_id : idMa}).exec((err, docs) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});
router.post(/asignat\/[a-z0-9]{1,}$/, (req, res) => {
  var URL=req.url;
  var IDdo=URL.split('/')[2];

  var materi = {
    Mnombre : req.body.nombre, //
    Msigla : req.body.sigla, //
    Mdocente: IDdo,
    Mgrupo : req.body.grupo,
    Mlaboratorio: '',
    Mcuestionario : ''
  };
  var maData = new MAT(materi);

  maData.save().then((rrINFO) => {
    var profes={
      Dasignatura:new Array()
    }
    DOCE.findOne({_id:IDdo}).exec((err, docs)=>{
      var matdo=docs.Dasignatura;
      var aux=new Array();
      if(matdo.length==1 && matdo[0]==''){
        profes.Dasignatura.push('/api/v1.0/asignat/'+rrINFO._id)

      }else {
        aux.push('/api/v1.0/asignat/'+rrINFO._id);
        matdo=matdo.concat(aux);
        profes.Dasignatura=matdo;
      }
      DOCE.findOneAndUpdate({_id:IDdo}, profes, (err, params)=>{
        if (err) {
          res.status(500).json({
            msn:'error'
          });
          return;
        }
        //content-type
        res.status(200).json({
          "id" : rrINFO._id,
          "msn" : "registrado con exito "
        });
        return;
      })
    });

  });
});

router.get('/asignat', (req, res) => {
  MAT.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});
/*=========== ESTUDIANTE ESTUDIANTE ESTUDANTE ESTUDIANTE ==========*/
var ALU = require("../../../database/collections/../../database/collections/alumno");

router.get(/student\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idAl = url.split('/')[2];
  ALU.findOne({_id : idAl}).exec((err, docs) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

router.post("/student", (req, res) => {
    var estudi = {
    Enombre : req.body.nombre, //
    Eci : req.body.ci, //
    Egestion: req.body.gestion,
    Epracticas :''
  };
  var alData = new ALU(estudi);
  alData.save().then((rr) => {
        //content-type
        res.status(200).json({
          "id" : rr._id,
          "msn" : "registrado con exito "
        });
        return;
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});


router.get('/student', (req, res) => {
  ALU.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

/*=========== LABORATORIO LABORATORIO LABORATORIO LABORATORIO ==========*/
var PRA = require("../../../database/collections/../../database/collections/practica");
router.get(/practica\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idPra = url.split('/')[2];
  PRA.findOne({_id : idPra}).exec((err, docs) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

router.post("/practica", (req, res) => {
  var IDma=req.body.materia;
  var IDes=req.body.estudiante;
  var IDdo=req.body.docente;
  var practiqe = {
    Ltipo : req.body.tipo, // lab1 lab2
    Lnombre : req.body.nombre, //nombre de laboratorio
    Lnota: req.body.nota,
    Lalumno: IDes,
    Lmateria:IDma,
    Ldocente:IDdo,
    Lestados:req.body.estado,
    fecha: new Date()
  };
  var praData = new PRA(practiqe);

  praData.save().then((rrINFO) => {
    var materie={
      Mlaboratorio:new Array()
    }
    MAT.findOne({_id:IDma}).exec((err, docs)=>{
      var labmat=docs.Mlaboratorio;
      var aux=new Array();
      if(labmat.length==1 && labmat[0]==''){
        materie.Mlaboratorio.push('/api/v1.0/practica/'+rrINFO._id)

      }else {
        aux.push('/api/v1.0/practica/'+rrINFO._id);
        labmat=labmat.concat(aux);
        materie.Mlaboratorio=labmat;
      }
      MAT.findOneAndUpdate({_id:IDma}, materie, (err, params)=>{
        if (err) {
          res.status(500).json({
            msn:'error'
          });
          return;
        }
        //content-type

        return;
      })
    });
    /*var univ={
      Epracticas:new Array()
    }
    ALU.findOne({_id:IDes}).exec((err, docs)=>{
      var espra=docs.Epracticas;
      var aux=new Array();
      if(espra.length==1 && espra[0]==''){
        univ.Epracticas.push('/api/v1.0/practica/'+rrINFO._id)

      }else {
        aux.push('/api/v1.0/practica/'+rrINFO._id);
        espra=espra.concat(aux);
        univ.Epracticas=espra;
      }
      ALU.findOneAndUpdate({_id:IDes}, univ, (err, params)=>{
        if (err) {
          res.status(500).json({
            msn:'error'
          });
          return;
        }
        //content-type

        return;
      })
    });*/
    res.status(200).json({
      "id" : rrINFO._id,
      "msn" : "registrado con exito "
    });
  });
});

/*router.get('/practica', (req, res) => {
  PRA.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});*/
router.post('/practicaa', (req, res) => {
  var params=req.query;
  console.log(params);
  var materia=params.materia;
  var alumno=params.alumno;
  var a=req.body.a;
  var info=[];
  //if (materia=undefined && alumno==undefined) {
    PRA.find({Lmateria:materia,Lalumno:alumno}).exec((error, docs)=>{
      docs.forEach(doc=>{
        if (doc.Lmateria==materia && doc.Lalumno==alumno) {
          info.push(doc);
        }

      });
      res.status(200).json(info);
    });
    //return;
  //}
  /*if (alumno=="5d002d3489949937186db928") {
    console.log("--------->>>>>>>");
    PRA.find({Lmateria:materia,Lalumno:alumno}).exec((error, docs)=>{
      res.status(200).json({info:docs});
    });
    return;
  }else if (alumno=="true") {
    PRA.find({Lmateria:{$gt:materia}}).exec((error, docs)=>{
      res.status(200).json({info:docs});
    });
  }else if (alumno=="false") {
    PRA.find({Lmateria:{$lt:materia}}).exec((error, docs)=>{
      res.status(200).json({info:docs});
    });
  }*/
});

router.post('/estmat/', (req, res) => {
  var alu=req.body.est;
  var mat=req.body.mat;
  var resultado=[];

  PRA.find({}).select("Ltipo Lnombre Lnota Lalumno Lmateria fecha").exec().then((docs)=>{
    //var labo=[];
    if (docs != null) {
      //var labo=[];
      docs.forEach((doc)=>{
        var m=doc.Lmateria;
        var a=doc.Lalumno;
        if (a==alu && m==mat) {
           resultado.push({
              'tipo':doc.Ltipo,
              'nombre':doc.Lnombre,
              'nota':doc.Lnota,
              'fecha':doc.fecha
           });
        }
      });
      res.status(200).json({
        practicas:resultado,
        ponderacion:25
      });
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

/*=========== CUESTIONARIO CUESTIONARIO CUESTIONARIO CUESTIONARIO==========*/
var CUE = require("../../../database/collections/../../database/collections/cuestionario");
var PRA = require("../../../database/collections/../../database/collections/practica");
router.get(/cuestion\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var idCues = url.split('/')[2];
  CUE.findOne({_id : idCues}).exec((err, docs) =>{
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

router.post("/cuestion", (req, res) => {
  var IDma=req.body.materia;
  var IDes=req.body.estudiante;

  var practiqe = {
    Ltipo : req.body.tipo, // lab1 lab2
    Lnombre : req.body.nombre, //nombre de laboratorio
    Lnota: req.body.nota,
    Lalumno: IDes,
    Lmateria:IDma,
    fecha: new Date()
  };
  var cuesData = new CUE(cuest);

  cuesData.save().then((rrINFO) => {
    var materie={
      Mlaboratorio:new Array()
    }
    MAT.findOne({_id:IDma}).exec((err, docs)=>{
      var labmat=docs.Mlaboratorio;
      var aux=new Array();
      if(labmat.length==1 && labmat[0]==''){
        materie.Mlaboratorio.push('/api/v1.0/practica/'+rrINFO._id)

      }else {
        aux.push('/api/v1.0/practica/'+rrINFO._id);
        labmat=labmat.concat(aux);
        materie.Mlaboratorio=labmat;
      }
      MAT.findOneAndUpdate({_id:IDma}, materie, (err, params)=>{
        if (err) {
          res.status(500).json({
            msn:'error'
          });
          return;
        }
        //content-type

        return;
      })
    });
    var univ={
      Epracticas:new Array()
    }
    ALU.findOne({_id:IDes}).exec((err, docs)=>{
      var espra=docs.Epracticas;
      var aux=new Array();
      if(espra.length==1 && espra[0]==''){
        univ.Epracticas.push('/api/v1.0/practica/'+rrINFO._id)

      }else {
        aux.push('/api/v1.0/practica/'+rrINFO._id);
        espra=espra.concat(aux);
        univ.Epracticas=espra;
      }
      ALU.findOneAndUpdate({_id:IDes}, univ, (err, params)=>{
        if (err) {
          res.status(500).json({
            msn:'error'
          });
          return;
        }
        //content-type

        return;
      })
    });
    res.status(200).json({
      "id" : rrINFO._id,
      "msn" : "registrado con exito "
    });
  });
});

router.get('/cuestion', (req, res) => {
  CUE.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

/*=========== CALIFICACION CALIFICACION CALIFICACION CALIFICACION==========*/
var CAL = require("../../../database/collections/../../database/collections/calificaciones");
router.get('/calific', (req, res) => {
  CAL.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

router.post("/calific", (req, res)=>{
  ALU.findById(req.body.aluid).then((alumno)=>{
    MAT.findById(req.body.matid).then((materia)=>{
      PRA.findById(req.body.praid).then((practica)=>{;
        var calif={
          _id: mongoose.Types.ObjectId(),
           Cnombre : 'String', // materia
           Cci: 45879, //estudiante
           Clab : '', // hace referencia a los laboratorios
           CpondLab: 45, //la nota final de labs
           Ccuest : '', // hace referencia a los cueationario
           CpondCuest: 12, //la nota final de cuest
           alumno: req.body.aluid, //hace referencia al estudiante
           materia: req.body.matid, //hace referencia al materia
           practica: req.body.praid,
          fecha: new Date()
        };
        var caliData = new CAL(calif);

        caliData.save().then( (rr) => {
          //content-type
          res.status(200).json({
            //"id" : rr._id,
            "msn" : "cal con exito "
          });
        })
        return
      })
      return
    })
    return
  }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
