document.addEventListener('DOMContentLoaded',()=>{
  const inputNumber=document.querySelector('#inputNumber');
  const inputBase=document.querySelector('#inputBase');
  const outputBase=document.querySelector('#outputBase');
  const outputNumber=document.querySelector('#outputNumber');
  const convertButton=document.querySelector('#convertButton');
  const clearButton=document.querySelector('#clearButton');
  const warning=document.querySelector('#warning');

function isNumeric(abc){
  return /\d/.test(abc);
}

function warn(check){
  if(check===0){
    clearScreen();
    warning.textContent="Invalid number";
  }
  else if(check===1){
    warning.textContent="";
  }
}

function checkInput(abc,d,e){
  let decimalp=0;
  let check1=0;
  let check2=0;
  let check3=0;
  for(let i=0;i<abc.length;i++){

    if(isNumeric(abc[i])){
      check1=1;
    }
    if(abc[i].charCodeAt(0)>64 && abc[i].charCodeAt(0)<91){
      if(abc[i].charCodeAt(0)-55<inputBase.value){
        check1=1;
      }
      else{check1=0;
      break;}
    }
    if(abc[i].charCodeAt(0)>96 && abc[i].charCodeAt(0)<123){
      if(abc[i].charCodeAt(0)-87<inputBase.value){
        check1=1;
      }
      else{check1=0;
      break;}
    }
    if(abc[i]==="." && decimalp<1){
      decimalp++;
      check1=1;
    }
    if(decimalp===2){check1=0;
    break;}
  }
  for(let i=0;i<d.length;i++){
    if(!isNumeric(d[i])){
      check2=1;
    }
  }
  for(let i=0;i<e.length;i++){
    if(!isNumeric(e[i])){
      check3=1;
    }
  }
  if(check1===1 && check2===0 && check3===0){
    warn(1);
  }
  else{warn(0);}

}
function clearScreen(){
    inputNumber.value="";
    inputBase.value="";
    outputNumber.value="";
    outputBase.value="";
    warning.textContent="";
}
function withoutDecimal(abc,a,b){
  let arr1=[];
  let decconversion=0;
  for(let i=0;i<abc.length;i++){
    let c=abc[i];
    if(c.charCodeAt(0)>64 && c.charCodeAt(0)<91){
      c=c.charCodeAt(0)-55;
    }
    else if(c.charCodeAt(0)>96 && c.charCodeAt(0)<123){
      c=c.charCodeAt(0)-87;
    }
    decconversion=decconversion+c*Math.pow(a,abc.length-i-1);
  }
  while(decconversion>0){
    let c=decconversion%b;
    if(c>9 && c<36){
      c=String.fromCharCode(c+55);
    }
    arr1.push(c);
    decconversion=(decconversion-(decconversion%b))/b;
  }
  let outputString="";
  for(let i=0;i<arr1.length;i++){
    outputString=outputString+arr1[arr1.length-i-1];
  }
  outputNumber.value=outputString;
}

function withDecimal(abc,j,a,b){
  let arr1=[];
  let r1=Math.pow(a,j-1);
  let r2=1/b;
  let decconv=0;
  for(let i=0;i<abc.length;i++){
    if(abc[i]==="."){continue;}
    let c=abc[i];
    if(c.charCodeAt(0)>64 && c.charCodeAt(0)<91){
      c=c.charCodeAt(0)-55;
    }
    if(c.charCodeAt(0)>96 && c.charCodeAt(0)<123){
      c=c.charCodeAt(0)-87;
    }
    decconv=decconv+c*r1;
    r1=r1/a;
  }
  let e=decconv%1;
  let d=decconv-decconv%1;

  while(d>0){
    let c=d%b;
    if(c<b){
    if(c>9 && c<36){
      c=String.fromCharCode(c+55);
    }}
    arr1.push(c);
    d=(d-(d%b))/b;
  }
  let outputString="";
  for(let i=0;i<arr1.length;i++){
    outputString=outputString+arr1[arr1.length-i-1];
  }
  outputString=outputString+".";
  let f=5;
  while(e>0 && f>0){
    let g=e*b;
    g=g-g%1;
    if(g>9 && g<35){
      g=String.fromCharCode(g+55);
    }
    outputString=outputString+g;
    e=(e*b)%1;
    f--;
  }
  outputNumber.value=outputString;
}

convertButton.addEventListener('click',()=>{
  checkInput(inputNumber.value,inputBase.value,outputBase.value);
  let decimalIndex=-1;
  for(let i=0;i<inputNumber.value.length;i++){
    if(inputNumber.value[i]==="."){
      decimalIndex=i;
    }
  }
  if(decimalIndex===-1){
    withoutDecimal(inputNumber.value,inputBase.value,outputBase.value);
  }else{withDecimal(inputNumber.value,decimalIndex,inputBase.value,outputBase.value);}

});
clearButton.addEventListener('click',clearScreen);

})
