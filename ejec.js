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
var mydate=new Date();
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
console.log(task_names);
