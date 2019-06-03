/*var dog={"name":"woody", "type":"dog"};
var cat={"name":"bob", "type":"cat"};
console.log(dog);
console.log("==================================");
var petNames = ["woody", "bob"];
console.log(petNames);
console.log("==================================");
var pets =[dog, cat];
console.log(pets);
console.log("==================================");
//=============
var pts1=[{"name":"woody", "type":"dog"},cat]
console.log(pts1);
console.log("==================================");
//push

pts1.push({"name":"roxy", "type":"dog"});
console.log(pts1);
console.log("==================================");
//pts1.push({"name":"roxy", "type":"dog"});
console.log(pts1[2]);
console.log("==================================");
cat.age=2;
dog["age"]=14;
console.log(pts1);
console.log("==================================");
pts1[0].age=14;
pts1[2]["age"]=6;
console.log(pts1);
console.log("==================================");
pts1[1].age=3;
pts1[1].hungry=true;
console.log(pts1);
console.log(cat);*/

///foreach/////
/*let dwars=['bifur','bofur','bombur','fili','kili','din','gloin','thorin','balin','dwalin','nori','dori'];
dwars.forEach(output);

function output(item, index, array){
  console.log(index, item);
}

console.log("==================================");

dwars.forEach(function(item, index, array){
  console.log(index, item);
});


console.log("==================================");
dwars.forEach(function(item, index, array){
  if (item==='thorin') {
    item= item.toUpperCase();
  }else {
    item=item.toLowerCase();
  }
  console.log(index, item);
});*/
console.log("==================================");
///map
let dwars=['bifur','bofur','bombur','fili','kili','din','gloin','thorin','balin','dwalin','nori','dori'];
let nameLengths=dwars.map(function(item, index, array){
  return 12;
});
console.log(nameLengths);
console.log("================ARRAY==================");
nameLengths=dwars.map(function(item, index, array){
  return index;
});
console.log(nameLengths);
console.log("==================================");
 nameLengths=dwars.map(function(item, index, array){
  return item;
});
console.log(nameLengths);
console.log("==================================");
/*nameLengths=dwars.map(function(item, index, array){
 return array;
});
console.log(nameLengths);*/
console.log("==================================");
nameLengths=dwars.map(function(item, index, array){
  let len=item.length;
 return len;
});
console.log(nameLengths);
console.log("==================================");
nameLengths=dwars.map(function(item, index, array){
  //let len=item.length;
 return item.length;
});
console.log(nameLengths);
console.log("==================================");

console.log("==================================");

console.log("==================================");
