document.addEventListener('DOMContentLoaded',()=>{
  const inputNumber=document.querySelector('#inputNumber');
  const inputBase=document.querySelector('#inputBase');
  const outputBase=document.querySelector('#outputBase');
  const outputNumber=document.querySelector('#outputNumber');
  const convertButton=document.querySelector('#convertButton');
  const clearButton=document.querySelector('#clearButton');
  const warning=document.querySelector('#warning');

function is_numeric(abc){
  return /\d/.test(abc);
}

function checkInput(abc){
  let decimalp=0;
  for(let i=0;i<abc.length;i++){
    let check=0;
    if(is_numeric(abc[i])){
      check=1;
    }
    if(abc[i]==="." && decimalp<1){
      decimalp++;
      check=1;
    }
    if(decimalp===2){check==0;}
    if(check===0){
      clearScreen();
      warning.textContent="Invalid number";
      break;
    }
    else{
      warning.textContent="";
    }
  }
}
function clearScreen(){
    inputNumber.value="";
    inputBase.value="";
    outputNumber.value="";
    outputBase.value="";
    warning.textContent="";
}
function withDecimal(abc,a,b){
  let arr1=[];
  let decconversion=0;
  for(let i=0;i<abc.length;i++){
    decconversion=decconversion+abc[i]*Math.pow(a,abc.length-i-1);
  }
  while(decconversion>0){
    let c=decconversion%b;
    switch(c){
      case 10:
        c="A";
        break;
      case 11:
        c="B";
        break;
      case 12:
        c="C";
        break;
      case 13:
        c="D";
        break;
      case 14:
        c="E";
        break;
      case 15:
        c="F";
        break;
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
function tillDecimal(abc,a,b){
  let arr1=[];
  let decconversion=0;
  for(let i=0;i<abc.length;i++){
    decconversion=decconversion+abc[i]*Math.pow(a,abc.length-i-1);
  }
  while(decconversion>0){
    let c=decconversion%b;
    switch(c){
      case 10:
        c="A";
        break;
      case 11:
        c="B";
        break;
      case 12:
        c="C";
        break;
      case 13:
        c="D";
        break;
      case 14:
        c="E";
        break;
      case 15:
        c="F";
        break;
    }
    arr1.push(c);
    decconversion=(decconversion-(decconversion%b))/b;
  }
  let outputString="";
  for(let i=0;i<arr1.length;i++){
    outputString=outputString+arr1[arr1.length-i-1];
  }
  return outputString;
}

function withoutDecimal(abc,i,a,b){
  let arr1=[];
  let r1=1/a;
  let r2=1/b;
  let part1=tillDecimal(abc.slice(0,i),a,b);
  let afterPoint1=abc.slice(i+1,abc.length);

}

convertButton.addEventListener('click',()=>{
  checkInput(inputNumber.value);
  checkInput(inputBase.value);
  checkInput(outputBase.value);
  let decimalIndex=-1;
  for(let i=0;i<inputNumber.value.length;i++){
    if(inputNumber.value[i]==="."){
      decimalIndex=i;
    }
  }
  if(decimalIndex===-1){
    withDecimal(inputNumber.value,inputBase.value,outputBase.value);
  }else{withoutDecimal(inputNumber.value,decimalIndex,inputBase.value,outputBase.value);}

});
clearButton.addEventListener('click',clearScreen);

})
