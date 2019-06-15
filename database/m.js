/* 1 */
{
    "_id" : ObjectId("5d004a721975ee41110c7565"),
    "Mlaboratorio" : [
        "/api/v1.0/practica/5d007f7b0ec9ea4883dbff63",
        "/api/v1.0/practica/5d007f930ec9ea4883dbff64",
        "/api/v1.0/practica/5d007fac0ec9ea4883dbff65",
        "/api/v1.0/practica/5d007fc70ec9ea4883dbff66",
        "/api/v1.0/practica/5d007fe70ec9ea4883dbff67"
    ],
    "Mcuestionario" : [
        ""
    ],
    "Mnombre" : "seguridad",
    "Msigla" : "sis-777",
    "Mdocente" : "5cfbda784c52311fd478fccf",
    "Mgrupo" : "1",
    "__v" : 0
}

/* 2 */
{
    "_id" : ObjectId("5d004abc1975ee41110c7568"),
    "Mlaboratorio" : [
        "/api/v1.0/practica/5d0080a40ec9ea4883dbff68",
        "/api/v1.0/practica/5d0080bf0ec9ea4883dbff69",
        "/api/v1.0/practica/5d0080d90ec9ea4883dbff6a"
    ],
    "Mcuestionario" : [
        ""
    ],
    "Mnombre" : "seminario",
    "Msigla" : "sis-707",
    "Mdocente" : "5cfbda864c52311fd478fcd0",
    "Mgrupo" : "1",
    "__v" : 0
}

/* 3 */
{
    "_id" : ObjectId("5d004ab71975ee41110c7567"),
    "Mlaboratorio" : [
        "/api/v1.0/practica/5d0082a9d4f1d94a226b79d5",
        "/api/v1.0/practica/5d0082b8d4f1d94a226b79d6",
        "/api/v1.0/practica/5d0082edd4f1d94a226b79d7"
    ],
    "Mcuestionario" : [
        ""
    ],
    "Mnombre" : "seminario",
    "Msigla" : "sis-707",
    "Mdocente" : "5cfbda864c52311fd478fcd0",
    "Mgrupo" : "2",
    "__v" : 0
}

/* 4 */
{
    "_id" : ObjectId("5d004a7a1975ee41110c7566"),
    "Mlaboratorio" : [
        "/api/v1.0/practica/5d008336d4f1d94a226b79d8",
        "/api/v1.0/practica/5d00834dd4f1d94a226b79d9",
        "/api/v1.0/practica/5d00836dd4f1d94a226b79da",
        "/api/v1.0/practica/5d0083a7d4f1d94a226b79db",
        "/api/v1.0/practica/5d0083bed4f1d94a226b79dc"
    ],
    "Mcuestionario" : [
        ""
    ],
    "Mnombre" : "seguridad",
    "Msigla" : "sis-777",
    "Mdocente" : "5cfbda784c52311fd478fccf",
    "Mgrupo" : "2",
    "__v" : 0
}

router.post("/asignat", (req, res) => {
  var IDdo=req.body.docente;
  var IDes=req.body.estudiante;

  var materi = {
    Mnombre : req.body.nombre, //
    Msigla : req.body.sigla, //
    Mdocente: IDdo,
    Mestudi : IDes,
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

        return;
      })
    });
    var univ={
      Emateria:new Array()
    }
    ALU.findOne({_id:IDes}).exec((err, docs)=>{
      var mates=docs.Emateria;
      var aux=new Array();
      if(mates.length==1 && mates[0]==''){
        univ.Emateria.push('/api/v1.0/asignat/'+rrINFO._id)

      }else {
        aux.push('/api/v1.0/asignat/'+rrINFO._id);
        mates=mates.concat(aux);
        univ.Emateria=mates;
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
