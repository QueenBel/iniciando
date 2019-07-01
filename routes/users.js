var express = require('express');
var router = express.Router();
var PDFDocument = require('pdfkit');
const fs =require('fs');
var PRA = require("./../database/collections/practica");

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  LAB.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});*/

router.get('/', function(req, res, next) {
  var result = PRA.find({
  }, function(error, news){
      if(error) throw error;
      res.render('usuario', { news:news, title: 'calificaciones' });
  });
});

//router.get(/pdf\/[a-z0-9]{1,}$/, function(req, res, next) {
router.get('/pdf', function(req, res, next) {
  /*var url = req.url;
 var id = url.split("/")[2];
 LAB.findOne({_id : id}).exec((err, docs) =>{
   if (docs != null) {
       res.status(200).json(docs);
       return;
   }

   res.status(200).json({
     "msn" : "no existe recursos"
   });
 })*/
  var id  = req.query.id;
  const doc = new PDFDocument();
  var result = PRA.find({_id: id}, function(error, newspost){
      if(error) throw error;
      var Id        = newspost[0]['_id'];
      var Tipo    = newspost[0]['Ltipo'];
      var Nombre    = newspost[0]['Lnombre'];
      var Nota        = newspost[0]['Lnota'];
      var Estudiante        = newspost[0]['Lalumno'];
      var Mataria        = newspost[0]['Lmateria'];
      var Docente        = newspost[0]['Ldocente'];
      var Estado        = newspost[0]['Lestados'];
      var Fecha     = newspost[0]['fecha'];

      var filename = encodeURIComponent(Estudiante) + '.pdf';
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');

               doc.font('Times-Roman', 18)
                 .fontSize(25)
                 .text(Tipo, 100, 50);

               doc.moveDown()
                  .fillColor('red')
                  .text("Nombre: "+Nombre);

    doc.pipe(res);
      doc.end();
  });
  //console.log(result);

});
module.exports = router;
