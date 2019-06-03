/*git init
git add .
git commit -m "first commit"

git push -u origin master*/

/*var a=2
let dwars=[{"name":"waaly", "type":"dog", "edad":"5"},{"name":"taxi", "type":"cat", "edad":"1"},
{"name":"bob", "type":"cat", "edad":"1"},{"name":"red", "type":"cat", "edad":"1"}];

dwars.forEach(function(doc,num){
 var d;
  if (doc.edad==a) {
     d=doc;

  }else {
    d="n";
    return d;
  }

  console.log(d);
});
*/
/*var mydate=new Date();
console.log(mydate.toString());
console.log((mydate.getMonth()+1));
var tasks = [

  {

    'name'     : 'Write for Envato Tuts+',

    'duration' : 120

  },

  {

    'name'     : 'Work out',

    'duration' : 60

  },

  {

    'name'     : 'Procrastinate on Duolingo',

    'duration' : 120

  }

];

var task_names = [];

tasks.forEach(function (task) {
    if (task.duration!=120) {
     return;
    }
    task_names.push(task);

});
console.log(task_names);*/



//const moment = require('moment');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
//const MomentRange = require('moment-range');

//const moment = MomentRange.extendMoment(Moment);

/*var diasEntreFechas = function(desde, hasta) {
  	var dia_actual = desde;
    var fechas = [];
  	while (dia_actual.isSameOrBefore(hasta)) {
    	fechas.push(dia_actual.format('DD-MM-YYYY'));
   		dia_actual.add(1, 'days');
  	}
  	return fechas;
};

var desde = moment("2017-11-29");
var hasta = moment("2017-12-05");
var results = diasEntreFechas(desde, hasta);
console.log(results);
*/
var fechaInicio = new Date('2017-11-20');
var fechaFin    = new Date('2017-12-28');

while(fechaFin.getTime() >= fechaInicio.getTime()){
    fechaInicio.setDate(fechaInicio.getDate() + 1);

    console.log(fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate());
}
