var lab=[
    {
        "tipo": "lab1",
        "nombre": "ubuntu",
        "nota": 60,
        "alumno": "5d002d3489949937186db928",
        "materia": "5d004a721975ee41110c7565",
        "estado": "terminado",
        "fecha": "2019-05-12T04:28:43.231Z"
    },
    {
        "tipo": "lab2",
        "nombre": "sistemas",
        "nota": 0,
        "alumno": "5d002d3489949937186db928",
        "materia": "5d004a721975ee41110c7565",
        "estado": "falta",
        "fecha": "2019-05-19T04:29:07.464Z"
    },
    {
        "tipo": "lab3",
        "nombre": "windiws",
        "nota": 0,
        "alumno": "5d002d3489949937186db928",
        "materia": "5d004a721975ee41110c7565",
        "estado": "pendiente",
        "fecha": "2019-05-26T04:29:32.335Z"
    },
    {
        "tipo": "lab1",
        "nombre": "rest",
        "nota": 0,
        "alumno": "5d002d3489949937186db928",
        "materia": "5d004abc1975ee41110c7568",
        "estado": "pendiente",
        "fecha": "2019-05-15T04:33:40.257Z"
    },
    {
        "tipo": "lab2",
        "nombre": "meteor",
        "nota": 50,
        "alumno": "5d002d3489949937186db928",
        "materia": "5d004abc1975ee41110c7568",
        "estado": "terminado",
        "fecha": "2019-05-22T04:34:07.905Z"
    },
    {
        "tipo": "lab1",
        "nombre": "rest",
        "nota": 0,
        "alumno": "5d003e690c52823b1cbac0d8",
        "materia": "5d004ab71975ee41110c7567",
        "estado": "pendiente",
        "fecha": "2019-05-17T04:42:17.426Z"
    },
    {
        "tipo": "lab2",
        "nombre": "meteor",
        "nota": 59,
        "alumno": "5d003e690c52823b1cbac0d8",
        "materia": "5d004ab71975ee41110c7567",
        "estado": "terminado",
        "fecha": "2019-05-24T04:42:32.925Z"
    },
    {
        "tipo": "lab1",
        "nombre": "ubuntu",
        "nota": 14,
        "alumno": "5d003e690c52823b1cbac0d8",
        "materia": "5d004a7a1975ee41110c7566",
        "estado": "pendiente",
        "fecha": "2019-05-05T04:44:38.717Z"
    },
    {
        "tipo": "lab2",
        "nombre": "sistemas",
        "nota": 44,
        "alumno": "5d003e690c52823b1cbac0d8",
        "materia": "5d004a7a1975ee41110c7566",
        "estado": "terminado",
        "fecha": "2019-05-20T04:45:01.701Z"
    },
    {
        "tipo": "lab3",
        "nombre": "windiws",
        "nota": 100,
        "alumno": "5d003e690c52823b1cbac0d8",
        "materia": "5d004a7a1975ee41110c7566",
        "estado": "terminado",
        "fecha": "2019-05-30T04:45:33.770Z"
    }
];
alu=[
    {
        "name": "isabel",
        "id": "5d002d3489949937186db928"
    },
    {
        "name": "belisa",
        "id": "5d003e690c52823b1cbac0d8"
    }
];
mat=[
    {
        "id": "5d004a721975ee41110c7565",
        "name": "seguridad",
        "group": "1"
    },
    {
        "id": "5d004abc1975ee41110c7568",
        "name": "seminario",
        "group": "1"
    },
    {
        "id": "5d004ab71975ee41110c7567",
        "name": "seminario",
        "group": "2"
    },
    {
        "id": "5d004a7a1975ee41110c7566",
        "name": "seguridad",
        "group": "2"
    }
];


var cont=0;
    var t=[];
    var f=[];
    var p=[];
for (var i = 0; i < alu.length; i++) {
  for (var j = 0; i < lab.length; j++) {
    var  ll=lab[j]
    var comp=  alu[i];
    var name=alu[i].name;
    var id=alu[i].id;
    if (lab!=null) {

      lab.forEach(doc=>{
        alum=doc.alumno;
        if (id==alum && doc.estado=="terminado") {
          var tfp={
              "tipo1": doc.tipo,
              "nombre1": doc.nombre,
              "nota1": doc.nota,
              "alumno1": doc.alumno,
              "materia1": doc.materia,
              "estado1": doc.estado
            };
          t.push(tfp);
        }else if (id==alum && doc.estado=="falta") {
          var tfp={
            "tipo1": doc.tipo,
            "nombre1": doc.nombre,
            "nota1": doc.nota,
            "alumno1": doc.alumno,
            "materia1": doc.materia,
            "estado1": doc.estado
          };
          f.push(tfp);
        }else if (id==alum && doc.estado=="pendiente") {
          var tfp={
            "tipo1": doc.tipo,
            "nombre1": doc.nombre,
            "nota1": doc.nota,
            "alumno1": doc.alumno,
            "materia1": doc.materia,
            "estado1": doc.estado
          };
          p.push(tfp);
        }
      });
    }
    var tt={prac:t, cantid:t.length};
    var ff={prac:f, cantid:f.length};
    var pp={prac:p, cantid:p.length};
    var labs={term:tt,falta:ff,pendie:pp};
    var result={
      estudiante:alu[i].name,
      laorstorio:labs
    };
    console.log(result);
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    return;
  }
}


/*  while (cont<alu.length) {
    cont++;
    if (alu!=null) {
      alu.forEach(doc1=>{
        f.push(doc1);
      })
      console.log(f);
      return
    }
    return
  }
*/
//console.log(t);
//console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
//console.log(alu.length);
/*console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
console.log(lab[i]);
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
console.log(alu[j]);
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
console.log(mat[k]);*/

/*
var obj = {a: 1, b: 2, c: 3};

for (const prop in obj) {
  console.log(obj[prop]);
  //console.log(obj.length);
}*/
