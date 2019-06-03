/*var fechas = [
      {
          "tipo" : "lab1",
          "nombre" : "sis-555",
          "ci" : 789456,
          "notalab" : 55,
          "fecha" : "2019-04-01T06:06:41.956Z",
          "__v" : 0
      },

      {
          //"_id" : ObjectId("5ce0f27aad3de32e919c39f7"),
          "tipo" : "lab2",
          "nombre" : "sis-555",
          "ci" : 789456,
          "notalab" : 45,
          "fecha" : "2018-05-03T06:06:50.220Z",
          "__v" : 0
      },

      {
          //"_id" : ObjectId("5ce0f27fad3de32e919c39f8"),
          "tipo" : "lab3",
          "nombre" : "sis-555",
          "ci" : 789456,
          "notalab" : 15,
          "fecha" : "2019-05-05T06:06:55.728Z",
          "__v" : 0
      },

      {
          //"_id" : ObjectId("5ce0f289ad3de32e919c39f9"),
          "tipo" : "lab3",
          "nombre" : "sis-444",
          "ci" : 789456,
          "notalab" : 45,
          "fecha" : "2019-05-07T06:07:05.016Z",
          "__v" : 0
      },

      {
          //"_id" : ObjectId("5ce0f290ad3de32e919c39fa"),
          "tipo" : "lab6",
          "nombre" : "sis-444",
          "ci" : 789456,
          "notalab" : 65,
          "fecha" : "2019-05-09T06:07:12.084Z",
          "__v" : 0
      },

      {
          //"_id" : ObjectId("5ce0f296ad3de32e919c39fb"),
          "tipo" : "lab6",
          "nombre" : "sis-444",
          "ci" : 789456,
          "notalab" : 45,
          "fecha" : "2019-05-11T06:07:18.029Z",
          "__v" : 0
      },

      {
          //"_id" : ObjectId("5ce0f2c4ad3de32e919c39fc"),
          "tipo" : "lab4",
          "nombre" : "sis-444",
          "ci" : 789478,
          "notalab" : 80,
          "fecha" : "2019-05-13T06:08:04.412Z",
          "__v" : 0
      },

      {
      //    "_id" : ObjectId("5ce235fc39f9275dc73a5be0"),
          "tipo" : "lab4",
          "nombre" : "sis-000",
          "ci" : 14521584,
          "notalab" : 35,
          "__v" : 0
          "fecha" : "2019-05-20T05:07:08.650Z",
      }
];*/
var fechas = [
  {
    'name'     : 'Write for Envato Tuts+',
    'duration' : 120,
    'fecha' : 05
    //"fecha" : "2019-05-05T02:24:00"
  },

  {
    'name'     : 'Work out',
    'duration' : 60,
    'fecha' : 10
    //"fecha" : "2019-05-10T02:24:00"
  },
  {
    'name'     : 'out',
    'duration' : 60,
    'fecha' : 10
    //"fecha" : "2019-05-10T02:24:00"
  },
  {
    'name'     : 'Work ',
    'duration' : 60,
    'fecha' : 15
    //"fecha" : "2019-05-10T02:24:00"
  },

  {
    'name'     : 'Procrastinate on Duolingo',
    'duration' : 120,
    'fecha' : 16
    //"fecha" : "2019-05-15T03:24:00"
  }

];
var fechaInicio = new Date('2019-05-1');
var fechaFin    = new Date('2019-05-15');
//var fechaInicio = new Date('2017-12-20');
//var fechaFin    = new Date('2017-12-28');
var inicio;
var info=[];

  while (fechaFin.getDate() >= fechaInicio.getDate()) {
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    fechas.forEach(function(task){

      if (task.fecha!=fechaInicio.getDate()) {
            //info.push(task);
        return;
      }
    info.push(task.fecha);

  });
  //fechaInicio.setDate(fechaInicio.getDate() + 1);
 console.log(fechaInicio.getDate());
}
console.log(info);

  //return;
  //info.push(task);
  //return;
  //console.log(info);


//console.log(info);
/*
while(fechaFin.getDate() >= fechaInicio.getDate()){
    var info=[];
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    inicio=fechaInicio.getDate();
    fechas.forEach(function (task){
      if (task.tipo=="lab1") {
        return;
        //info.push(task);
      }
      info.push(task);
    });
    console.log(info);
    //console.log(fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate());
}
*/
