const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const start = moment("2018-10-14", 'YYYY-MM-DD');
const end = moment("2018-10-20", 'YYYY-MM-DD');

const current = start.clone();
const result = [];

while (current.isBefore(end)) {
  result.push(current.format("YYYY-MM-DD"));
  current.add(1, "day");
}

//console.log(result);

//var mmm=moment.preciseDiff("2014-01-01 12:00:00", "2014-04-20 12:00:00");
// 3 months 19 days
//console.log(mmm)
/*var fechas = [
  {
    'name'     : 'Write for Envato Tuts+',
    'duration' : 120,
  //  'fecha' : 05
  //  'fecha' : '2019-04-01'
    "fecha" : "2019-05-05T02:24:00"
  },

  {
    'name'     : 'Work out',
    'duration' : 60,
    //'fecha' : 10
    'fecha' : '2019-05-10'
    //"fecha" : "2019-05-10T02:24:00"
  },
  {
    'name'     : 'out',
    'duration' : 60,
    //'fecha' : 10
    'fecha' : '2019-05-10'
    //"fecha" : "2019-05-10T02:24:00"
  },
  {
    'name'     : 'Work ',
    'duration' : 60,
    // 'fecha' : 15
    'fecha' : '2019-05-16'
    //"fecha" : "2019-05-10T02:24:00"
  },

  {
    'name'     : 'Procrastinate on Duolingo',
    'duration' : 120,
    //'fecha' : 15
    'fecha' : '2019-05-20'
    //"fecha" : "2019-05-15T03:24:00"
  }

];*/

var fechaInicio = new Date('2019-04-29');
var fechaFin    = new Date('2019-05-06');
var a=[];
while(fechaFin.getDate() >= fechaInicio.getDate()){
    fechaInicio.setDate(fechaInicio.getDate() + 1);
    var aa=fechaInicio.getFullYear() + '-' + (fechaInicio.getMonth() + 1) + '-' + fechaInicio.getDate();
    fechas.forEach((doc)=>{
      var bb=doc.fecha.getFullYear() + '-' + (doc.fecha.getMonth() + 1) + '-' + doc.fecha.getDate();

      if (bb!=aa) {
        return;
      }
      a.push(doc);
    })

}
//console.log(a.length)
//console.log("===========================");
//console.log(a);
//var mydate2  =  moment(fechas[0].fecha).format(' YYYY-MM-DD ');

//console.log(info);
//console.log(mydate2);
//console.log(mydate2.getFullYear()+'-'+ mydate2.getMonth()+'-'+mydate2.getDate());
var info=[];
var diasEntreFechas = function(desde, hasta) {
  var dia_actual = desde;
  var fechas = [];
  var date, date1, date2;
  while (dia_actual.isSameOrBefore(hasta)) {
     date=dia_actual.format('YYYY');
     date1=dia_actual.format('MM');
     date2=dia_actual.format('DD');
     fechas.push({'anio': date, 'mes': date1, 'dia': date2});
     dia_actual.add(1, 'days');
  }
  return fechas;
};

//var desde = moment("2019-05-25");
//var hasta = moment("2019-06-01");
var desde = moment("");
var hasta = moment("");
var results = diasEntreFechas(desde, hasta);
if (results=='') {
  console.log('results');
}
//console.log(results[0]);

console.log("=========================================");
console.log(results.length);
/*console.log(fechas.length);
for (var i = 0; i < results.length; i++) {
var df;
//  results[i];
for (var j = 0; j < fechas.length; j++) {
  console.log(fechas[j].fecha);
//}
  fechas.forEach(function(task, index){
     //(task.fecha.getFullYear()+'-'+ task.fecha.getMonth()+'-'+task.fecha.getDate()

    //df=moment(task.fecha).format(' YYYY-MM-DD ');

    if ( task.fecha!=results[i].fecha) {
      return;
    }
    info.push(task);
  });
}
  //console.log(results[i].fecha);
}
console.log(info);
console.log("=========================================");
*/
/*for (var j = 0;  j< fechas.length; j++){
  console.log(fechas[j])
}
var  mydate2  =  new Date()
console.log(mydate2);
console.log("=========================================");

*/
/*
console.log(results[4]);




console.log('===========================')
if (results[4].fecha==fechas[0].fecha) {
  console.log(fechas[0]);
}else {
  console.log('nop');
}
console.log('===========================')
*/

/*
const start = moment("2019-05-01", 'YYYY-MM-DD');
const end = moment("2019-05-20", 'YYYY-MM-DD');

const current = start.clone();
const result = [];

while (current.isBefore((end+1))) {
  result.push(current.format("YYYY-MM-DD"));
  current.add(1, "day");
}
console.log(result.length);
console.log('===========================')
if (result[4]==fechas[0].fecha) {
  console.log('perfecto');
}else {
  console.log('nop');
}
var cant;
for (var i = 0; i < result.length; i++) {
  result[i];
  console.log(result[i]);
}
*/
