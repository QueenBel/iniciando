var express = require('express');
var router = express.Router();
var PDFDocument = require('pdfkit');
const fs =require('fs');
var LAB = require("./../database/collections/laboratorio");

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  LAB.find({}).exec((error, docs) =>{
    res.status(200).json(docs);
  })
});*/

router.get('/', function(req, res, next) {
  var result = LAB.find({
  }, function(error, news){
      if(error) throw error;
      res.render('usuario', { news:news, title: 'laboratiroos' });
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
  var result = LAB.find({_id: id}, function(error, newspost){
      if(error) throw error;

      var Id        = newspost[0]['_id'];
      var Tipo      = newspost[0]['tipo'];
      var Nombre    = newspost[0]['nombre'];
      var Ci        = newspost[0]['ci'];
      var NotaLab   = newspost[0]['notalab'];
      var Fecha     = newspost[0]['fecha'];

      var filename = encodeURIComponent(Ci) + '.pdf';
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');



      doc.font('Times-Roman', 18)
        .fontSize(25)
        .text(Tipo, 100, 50);

      doc.moveDown()
         .fillColor('red')
         .text("lab: "+Nombre);
      /*doc
         .moveDown()
         .fillColor('black')
         .fontSize(15)
         .text(Ci, {
           align: 'justify',
           indent: 30,
           height: 300,
           ellipsis: true
         });
      doc.fontSize(15)
         .fillColor('blue')
         .text('Read Full Article', 100, 100)
         .link(100, 100, 160, 27, NotaLab);

      doc.font('Times-Roman', 18)
         .fontSize(25)
         .text(Fecha, 100, 50);*/

    doc.pipe(res);
      doc.end();
  });
  //console.log(result);

});
module.exports = router;
