var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
//var _ = require("underscore");
var LAB = require("../../../database/collections/../../database/collections/laboratorio");
var FEC = require("../../../database/collections/../../database/collections/calendario");



var Img = require("../../../database/collections/img");

var jwt = require("jsonwebtoken");
/*
var task_names = [];

tasks.forEach(function (task) {
    if (task.duration!=120) {
     return;
    }
    task_names.push(task);

});
console.log(task_names);
*/
router.post("/buscar3", (req, res) => {
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  var labo=[];
  LAB.find({}).select("tipo nombre ci notalab fecha").exec().then((docs)=>{
    //var labo=[];
    if (docs != null) {
      //var labo=[];
      docs.forEach((doc)=>{
        var m=doc.fecha.getMonth()+1;
        var d=doc.fecha.getDate();
        var a=doc.fecha.getFullYear();
        if (a==anio && mes=='' && dia=='') {
           labo.push(doc);
        }else if (a==anio && m==mes && dia=='') {
          labo.push(doc);
        }else if (a==anio && mes=='' && d==dia) {
          labo.push(doc);

        }else if (anio=='' && m==mes && d==dia) {
          labo.push(doc);

        }else if (anio=='' && m==mes && dia=='') {
          labo.push(doc);

        }else if (anio=='' && mes=='' && d==dia) {
          labo.push(doc);

        }else if (a==anio && m==mes && d==dia) {
          labo.push(doc);

        }
      });
      res.status(200).json(labo);
      return;
    }
    res.status(204).json({
      "msn" : "No existe el recurso "
    });
  }).catch(err => {
     console.log(err);
     res.status(500).json({
     error: err
  });
});

});

router.post("/buscar1", (req, res) => {
  var dia=req.body.dia;
  var mes=req.body.mes;
  var anio=req.body.anio;
  var lab=req.body.lab;
  LAB.find({}).select("tipo nombre ci notalab fecha").exec().then((docs)=>{
    //  var dg=docs;
    if (docs!=null) {
      //res.status(200).json()
      let d={
        //  cantidad:docs.length,
        resultado: docs.map(doc=>{
          if (doc.fecha.getDate()==dia) {
            var dd=doc;
          }
          return dd;
        })

      };
      return;
      res.status(200).json(d);
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });


});


router.post("/labora", (req, res) => {

  var labor = {
    tipo : req.body.tipo,
   nombre : req.body.nombre,
   ci : req.body.ci,
    notalab: req.body.labo,
    fecha : new Date()
  };
  var labData = new LAB(labor);

  labData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      //"id" : rr._id,
      "msn" : "lab con exito "
    });
  });
});
router.get('/menus', (req, res) => {
  var dia=req.params;

  LAB.find({fecha:dia}).then((docs) =>{
    if (docs != null && docs.fecha.getDate()==dia) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });

  })
});
router.get(/home\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var f=new Date();
  var d=f.getDate();
  var m=f.getMonth();
  var a=f.getFullYear();
  LAB.find({notalab: id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
//console.log("su dia es: "+ docs.fecha.getDate());
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
  //console.log("su dia: "+d+"su mes: "+m+"su anio: "+a);
});

router.post("/fehas", (req, res) => {
var  varible= new Date();
  var d=varible.getDate();
  var m=varible.getMonth();
  var a=varible.getFullYear();
  console.log(d);
//  var f=(d+'/'+m'/'+'/'+a);
  var fech = {
    dia:new Date(d),
    mes:m,
    anio:a,
    fecha:new Date()
  //  dia: varible.getDate(),
    //mes: varible.getMonth(),
    //anio: varible.getFullYear(),
  //  fecha: d + "-" + m + "-" + a

  };
  var fecData = new FEC(fech);
console.log(varible);
  fecData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      //"id" : rr._id,
      "msn" : "lab con exito "
    });
  });
});
router.get('/fehas', (req, res) => {
  FEC.find({}).exec((error, docs) =>{
    res.status(200).json({f:docs.fecha.getDay()});
  })
});

router.post('/buscar', (req, res) => {
  //var consultation = LAB.find({tipo:req.body.dia}, null, { skip: 10 });

  LAB.find({tipo: req.body.tipo}).stream().on('data', function(doc){
    // handle doc
    console.log(doc.tipo);
    res.status(200).json(doc);
  });

});
router.post("/home", (req, res, next) => {
  let t= req.body.tipo;
  //var m=fecha.getDate();
//  console.log(m);
  LAB.find({tipo:t}, function callback(error, a){

    /*if (t!=a.fecha.getDate()) {
      res.status(200).json({"msn":"nada"});
      return;
    }*/
  //console.log(m);
    res.status(200).json({dd: fecha});
  });
});

router.get('/labora', (req, res) => {
  LAB.find({}).exec((error, docs) =>{
    res.status(200).json({
      cantidad:docs.length,
      va:docs
    });
  })
});

var EST = require("../../../database/collections/../../database/collections/estudiante");

router.post("/estu", (req, res) => {
  var hoy= new Date(getDate, getMonth, getFullYear);
  var dd=hoy.getDate();
  var mes=hoy.getMonth();
  var yy= hoy.getFullYear();
  var estud = {
    Emateria : req.body.mat,
   Enombre : req.body.nomb,
   Egestion : req.body.gest,
   Eci : req.body.ci,
   fecha : hoy
  };
  var esData = new EST(estud);

  esData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "estudient con exito "
    });
  });
});

router.get('/estu', (req, res) => {
  EST.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

var CAL = require("../../../database/collections/../../database/collections/calificaciones");

router.post("/calif", (req, res) => {

  var cali = {
    materia : req.body.mat, // materia
    labor : '', // hace referencia a los laboratorios
    //cantidad : req.body.can,
    ponderacion: req.body.pon,
    estud: '', //hace referencia al estudiante
    fecha : new Date()
  };
  var calData = new CAL(cali);

  calData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "calificaciones con exito "
    });
  });
});

router.get('/calif', (req, res) => {
  CAL.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});

/* GET home page. */
router.post("/kcal", function(req, res, next) {
  var information = [
  "Albóndigas	100g	202 kcal	848 kJ",
  "Arroz frito	100g	186 kcal	781 kJ",
  "Arroz integral	100g	362 kcal	1520 kJ",
  "Barbacoa de borrego	100g	170 kcal	714 kJ",
  "Burrito	100g	163 kcal	685 kJ",
  "Canelones	100g	153 kcal	643 kJ",
  "Carne con tomate	100g	240 kcal	1008 kJ",
  "Carne mechada	100g	254 kcal	1067 kJ",
  "Chili con Carne	100g	105 kcal	441 kJ",
  "Chuleta / Costeleta de cerdo	100g	225 kcal	945 kJ",
  "Codillo de cerdo asado	100g	164 kcal	689 kJ",
  "Costillas a la barbacoa / barbecue	100g	292 kcal	1226 kJ",
  "Dal	100g	330 kcal	1386 kJ",
  "Empanada de atún	100g	251 kcal	1054 kJ",
  "Empanada de carne	100g	293 kcal	1231 kJ",
  "Empanada de jamón y queso	100g	234 kcal	983 kJ",
  "Enchiladas	100g	168 kcal	706 kJ",
  "Ensalada César	100g	127 kcal	533 kJ",
  "Ensalada de patata / papa	100g	143 kcal	601 kJ",
  "Espaguetis a la boloñesa	100g	132 kcal	554 kJ",
  "Estofado de ternera / Guisado de carne	100g	95 kcal	399 kJ",
  "Fajita	100g	117 kcal	491 kJ",
  "Fish and Chips / Pescado con papas	100g	195 kcal	819 kJ",
  "Gazpacho	100g	80 kcal	336 kJ",
  "Guiso de arroz	100g	243 kcal	1021 kJ",
  "Guiso de fideos con carne	100g	400 kcal	1680 kJ",
  "Guiso de lentejas	100g	336 kcal	1411 kJ",
  "Guiso de porotos	100g	358 kcal	1504 kJ",
  "Hummus / Puré de garbanzo	100g	177 kcal	743 kJ",
  "Judías estofadas / Frijoles cocidos	100g	94 kcal	395 kJ",
  "Kebab	100g	215 kcal	903 kJ",
  "Lasaña	100g	132 kcal	554 kJ",
  "Lasaña vegetal	100g	177 kcal	743 kJ",
  "Locro	100g	191 kcal	802 kJ",
  "Lomo de cerdo asado	100g	247 kcal	1037 kJ",
  "Lomo en salsa	100g	108 kcal	454 kJ",
  "Macarrones / Fideos a la boloñesa	100g	107 kcal	449 kJ",
  "Macarrones / Fideos con queso	100g	370 kcal	1554 kJ",
  "Milanesa de pescado	100g	275 kcal	1155 kJ",
  "Milanesa de pollo	100g	115 kcal	483 kJ",
  "Milanesa de ternera	100g	215 kcal	903 kJ",
  "Mole poblano	100g	0 kcal	0 kJ",
  "Moussaka	100g	120 kcal	504 kJ",
  "Naan	100g	310 kcal	1302 kJ",
  "Paella	100g	156 kcal	655 kJ",
  "Patatas / Papas alioli	100g	250 kcal	1050 kJ",
  "Patatas / Papas bravas	100g	130 kcal	546 kJ",
  "Pato a la pekinesa	100g	225 kcal	945 kJ",
  "Pizza	100g	267 kcal	1121 kJ",
  "Polenta	100g	85 kcal	357 kJ",
  "Pollo al horno	100g	164 kcal	689 kJ",
  "Pollo asado / rostizado	100g	144 kcal	605 kJ",
  "Pollo relleno	100g	220 kcal	924 kJ",
  "Pozole	100g	0 kcal	0 kJ",
  "Puré de patatas / papas	100g	83 kcal	349 kJ",
  "Raviolis / Ravioles	100g	203 kcal	853 kJ",
  "Rollito de primavera	100g	250 kcal	1050 kJ",
  "Rosbif	100g	111 kcal	466 kJ",
  "Salmorejo	100g	87 kcal	365 kJ",
  "Sopa de guisantes / arvejas / chícharo	100g	75 kcal	315 kJ",
  "Taco	100g	217 kcal	911 kJ",
  "Tamales	100g	200 kcal	840 kJ",
  "Tortilla de patatas / papas	100g	126 kcal	529 kJ"
  ];
  var wordkey = req.body.wordkey;
  var expreg = new RegExp(wordkey);
  var result = information.filter((key) =>{
    if (key.search(expreg) > -1) {
    return true
  }
  return false;
  });
  res.send(
  {
    "wordkey" : wordkey,
    "result" : result
  });
  //res.render('index', { title: 'Express' });
});
module.exports = router;
