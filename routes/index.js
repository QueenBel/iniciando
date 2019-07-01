var express = require('express');
var router = express.Router();

const PDFDocument = require('pdfkit');

router.post("/", (req, res) => {
  const doc = new PDFDocument()
  let filename = req.body.filename
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  const content = req.body.content
  doc.y = 300
  doc.text(content, 50, 50)
  doc.pipe(res)
  doc.end()
});

/*
let personas = [
  {
      id: 1,
      nombre: "MitoCode"
  },
  {
      id: 2,
      nombre: "Mito"
  },
  {
      id: 3,
      nombre: "Code"
  }
]

router.get('/', (req, res) => {
  res.render('index', { titulo: 'pug', mensaje: 'MitoCode | Pug', personas: personas });
});*/
module.exports = router;
