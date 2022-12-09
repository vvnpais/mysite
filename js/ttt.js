function clr(){
  let a=[" "," "," "];
  let b=[" "," "," "];
  let c=[" "," "," "];
}
clr();

function prnt(){
  document.getElementById("a1").value=a[0];
  document.getElementById("a2").value=a[1];
  document.getElementById("a3").value=a[2];
  document.getElementById("a4").value=b[0];
  document.getElementById("a5").value=b[1];
  document.getElementById("a6").value=b[2];
  document.getElementById("a7").value=c[0];
  document.getElementById("a8").value=c[1];
  document.getElementById("a9").value=c[2];
}
var x=0;
function b1(){
  if(a[0]==" "){
    if(x%2==0){
      a[0]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      a[0]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b2(){
  if(a[1]==" "){
    if(x%2==0){
      a[1]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      a[1]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b3(){
  if(a[2]==" "){
    if(x%2==0){
      a[2]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      a[2]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b4(){
  if(b[0]==" "){
    if(x%2==0){
      b[0]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      b[0]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b5(){
  if(b[1]==" "){
    if(x%2==0){
      b[1]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      b[1]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b6(){
  if(b[2]==" "){
    if(x%2==0){
      b[2]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      b[2]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b7(){
  if(c[0]==" "){
    if(x%2==0){
      c[0]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      c[0]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b8(){
  if(c[1]==" "){
    if(x%2==0){
      c[1]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      c[1]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
function b9(){
  if(c[2]==" "){
    if(x%2==0){
      c[2]="X";
      document.getElementById("t").value="Turn of O."
    }
    else{
      c[2]="O";
      document.getElementById("t").value="Turn of X."
    }
    x++;
    prnt();
  }
  return;
}
