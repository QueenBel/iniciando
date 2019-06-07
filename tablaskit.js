/*====================PDF KIT ====================*/
/*
const PDF =require('pdfkit');
const fs =require('fs');

router.get('/pdf', (req, res) => {
//  var doc = new PDF();
//  doc.pipe(fs.createWriteStream('./public/probando.pdf'));
//function example(){
var doc = new PDF();

var writeStream = fs.createWriteStream('./public/probando.pdf');
doc.pipe(writeStream);
//line to the middle
doc.lineCap('butt')
  .moveTo(270, 90)
  .lineTo(270, 230)
  .stroke()

row(doc, 90);
row(doc, 110);
row(doc, 130);
row(doc, 150);
row(doc, 170);
row(doc, 190);
row(doc, 210);

textInRowFirst(doc, 'Nombre o razón social', 100);
textInRowFirst(doc, 'RUT', 120);
textInRowFirst(doc, 'Dirección', 140);
textInRowFirst(doc, 'Comuna', 160);
textInRowFirst(doc, 'Ciudad', 180);
textInRowFirst(doc, 'Telefono', 200);
textInRowFirst(doc, 'e-mail', 220);
doc.end();

writeStream.on('finish', function () {
  // do stuff with the PDF file
  return res.status(200).json({
    ok: "ok"
  });

});
//}

function textInRowFirst(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 30;
  doc.fillColor('black')
  doc.text(text, {
    paragraphGap: 5,
    indent: 5,
    align: 'justify',
    columns: 1,
  });
  return doc
}


function row(doc, heigth) {
  doc.lineJoin('miter')
    .rect(30, heigth, 500, 20)
    .stroke()
  return doc
}

  //doc.pipe( res ); //descargar pdf
  //doc.end();
//res.status(200).json("listo");
});
//=======================================================
router.get('/imprimir', (req, res) => {
  var pdf = new PDF({
    size: 'LEGAL', // See other page sizes here: https://github.com/devongovett/pdfkit/blob/d95b826475dd325fb29ef007a9c1bf7a527e9808/lib/page.coffee#L69
    info: {
      Title: 'Tile of File Here',
      Author: 'Some Author',
    }
  });

  // Write stuff into PDF
  pdf.text('Hello World');

  // Stream contents to a file
  pdf.pipe(
    fs.createWriteStream('./public/file.pdf')
  )
    .on('finish', function () {
      console.log('PDF closed');
    });

  // Close PDF and write file.
  pdf.end();

});

*/
