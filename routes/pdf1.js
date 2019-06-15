const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');


router.get("/pp", (req, res) => {
  function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

  const doc = new PDFDocument({  margin :  50  })
  var name=numeroAleatorio(1, 100);
  console.log(name);
  /*var filename = encodeURIComponent("ee")+'.pdf';
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');*/
  //doc.pipe(fs.createWriteStream('./public/en.pdf'));
  var writeStream = fs.createWriteStream('./public/pro.pdf');
  doc.pipe(writeStream);

  cabezera(doc);

  writeStream.on('finish', function () {
    // do stuff with the PDF file
    return res.status(200).json({
      ok: "ok"
    });

  });

  //doc.pipe(res);
  doc.end();


  function cabezera(doc) {
  doc
    .image("./public/avatars/sis.jpg", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Ing Sistemas.", 110, 57)
    .fontSize(10)
    .text("ESTUDIANTE: "+"Nombre del estuidiante", 200, 65, { align: "right" })
    .text("CEDULA: "+"Cedula de Identidad", 200, 80, { align: "right" })
    .text("GESTION: "+"gestion/anio", 200, 95, { align: "right" })
    .text("FECHA: "+"DD-MM-AAAA de descarga de inscripcion", 200, 110, { align: "right" })
    .moveDown();
    return doc
}


});

module.exports = router;
