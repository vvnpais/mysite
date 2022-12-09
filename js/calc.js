var x=document.getElementById("txt");
function dis(val){
  document.getElementById("txt").value+=val;
}
function solve(){
  var y=document.getElementById("txt").value;
  document.getElementById("txt").value=eval(y);
}
function clr(){
  document.getElementById("txt").value="";
}
function bck(){
  var k=document.getElementById("txt").value;
  k=k.slice(0,-1);
  document.getElementById("txt").value=k;
}
