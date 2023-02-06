document.addEventListener('DOMContentLoaded',()=>{
  const squares=document.querySelectorAll('.grid div');
  const pbpawn=document.querySelector('#pbpawn');
  const pbrook=document.querySelector('#pbrook');
  const pbknight=document.querySelector('#pbknight');
  const pbbishop=document.querySelector('#pbbishop');
  const pbqueen=document.querySelector('#pbqueen');
  const pbking=document.querySelector('#pbking');
  const pwpawn=document.querySelector('#pwpawn');
  const pwrook=document.querySelector('#pwrook');
  const pwknight=document.querySelector('#pwknight');
  const pwbishop=document.querySelector('#pwbishop');
  const pwqueen=document.querySelector('#pwqueen');
  const pwking=document.querySelector('#pwking');
  const width=8;
  let validArray=[];
  let turn="w";
  let currentHighlightIndex=null;
  let firstClickIndex=null;
  let secondClickIndex=null;
  let tempForClassList=null;
  const whiteArray=[];
  const blackArray=[];


  for(let i=0;i<squares.length;i++){
    if(i%16>7){
      if(i%2===0){
        squares[i].classList.add('purple');
      }else{
        squares[i].classList.add('white');
      }
    }else{
      if(i%2===1){
        squares[i].classList.add('purple');
      }else{
        squares[i].classList.add('white');
      }
    }
  }

function indexToCartesian(i){
    let x=i%width+1;
    let y=8-((i-i%width)/width);
    return [x,y];
}

function cartesianToIndex([a,b]){
    let answer=(8-b)*width+a-1;
    return answer;
}

function isValid([a,b]){
  if(a>0 && a<9 && b>0 && b<9){
    return true;
  }else{return false;}
}

function stripArray(arrayInput){
  let arrayReturn=[]
  let array=[]
  for(let i=0; i<arrayInput.length; i++){
    array.push(indexToCartesian(arrayInput[i]));
  }
  for(let i=0;i<array.length;i++){
    if(array[i][0]>0 && array[i][0]<9 && array[i][0]>0 && array[i][1]<9){
      arrayReturn.push(cartesianToIndex(array[i]));
    }
  }
  return arrayReturn;
}

function highlight(a){
    if(squares[a].classList.contains('bb')){
      squares[a].classList.remove('bb');
      squares[a].classList.add('yy');
    }else if(squares[a].classList.contains('yy')){
      squares[a].classList.remove('yy');
      squares[a].classList.add('bb');
    }
}

function highlightValidArray(chck){
    if(chck===0){
      for(let i=0;i<squares.length;i++){
        squares[i].classList.remove('green');
      }
    }
    else if(chck===1){
      for(let i=0;i<validArray.length;i++){
        squares[validArray[i]].classList.add('green');
      }
    }
}

function addImage(i,abc){
  if(abc[0]==='w'){
    whiteArray.push(i);
  }
  else if(abc[0]==='b'){
    blackArray.push(i);
  }
  if(squares[i].classList.contains(abc)){
    squares[i].classList.remove(abc);
  }else{
  squares[i].classList.add(abc);
  }
}

function black(index){
  if(blackArray.includes(index)){return true;}
else{return false;}
}
function white(index){
  if(whiteArray.includes(index)){return true;}
else{return false;}
}

function empty(index){
  if( black(index) || white(index) ){
    return false;
  }
  else{return true;}
}

function whichImage(index){
  switch(true){
    case squares[index].classList.contains('bpawn'):
    return 'bpawn';
    break;
    case squares[index].classList.contains('brook'):
    return 'brook';
    break;
    case squares[index].classList.contains('bknight'):
    return 'bknight';
    break;
    case squares[index].classList.contains('bbishop'):
    return 'bbishop';
    break;
    case squares[index].classList.contains('bqueen'):
    return 'bqueen';
    break;
    case squares[index].classList.contains('bking'):
    return 'bking';
    break;
    case squares[index].classList.contains('wpawn'):
    return 'wpawn';
    break;
    case squares[index].classList.contains('wrook'):
    return 'wrook';
    break;
    case squares[index].classList.contains('wknight'):
    return 'wknight';
    break;
    case squares[index].classList.contains('wbishop'):
    return 'wbishop';
    break;
    case squares[index].classList.contains('wqueen'):
    return 'wqueen';
    break;
    case squares[index].classList.contains('wking'):
    return 'wking';
    break;
  }
}

function startPositions(){
addImage(0,'brook');
addImage(1,'bknight');
addImage(2,'bbishop');
addImage(3,'bqueen');
addImage(4,'bking');
addImage(5,'bbishop');
addImage(6,'bknight');
addImage(7,'brook');
addImage(8,'bpawn');
addImage(9,'bpawn');
addImage(10,'bpawn');
addImage(11,'bpawn');
addImage(12,'bpawn');
addImage(13,'bpawn');
addImage(14,'bpawn');
addImage(15,'bpawn');
addImage(48,'wpawn');
addImage(49,'wpawn');
addImage(50,'wpawn');
addImage(51,'wpawn');
addImage(52,'wpawn');
addImage(53,'wpawn');
addImage(54,'wpawn');
addImage(55,'wpawn');
addImage(56,'wrook');
addImage(57,'wknight');
addImage(58,'wbishop');
addImage(59,'wqueen');
addImage(60,'wking');
addImage(61,'wbishop');
addImage(62,'wknight');
addImage(63,'wrook');
}

startPositions();

function rotateBoard(){
  let prevIndex=[]
  for(let i=0; i<squares.length; i++){
    prevIndex[i]=squares[i].classList.value;
  }
  for(let i=0; i<squares.length; i++){
    squares[i].classList=prevIndex[squares.length-1-i];
  }
  for(let i=0 ; i<16; i++){
    whiteArray[i]=63-whiteArray[i];
    blackArray[i]=63-blackArray[i];
  }
  validArray=[]
  highlightValidArray(0);
}



for(let i=0; i<squares.length; i++){
  squares[i].addEventListener('click',()=>{
    if(firstClickIndex==null){
    firstClickIndex=i;
    firstClick();}

    else{
      secondClickIndex=i;
      secondClick();}
  })
}

let castling=0;

// function underAttack(index,abc){
//       let result=false;
//   if(abc==="w"){
//     whiteArray.push(index);
//     for(let i=0;i<blackArray.length;i++){
//       let card1=whichImage(blackArray[i]);
//       if(card1==="bpawn"){
//         if(pawnValidArray(blackArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       else if(card1==="brook"){
//         if(rookValidArray(blackArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="bknight"){
//         if(knightValidArray(blackArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="bbishop"){
//         if(bishopValidArray(blackArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="bqueen"){
//         if(queenValidArray(blackArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="bking"){
//         if(kingValidArray(blackArray[i]).includes(index)){
//           result=true;
//         }
//       }
//     }
//     let temp=whiteArray.indexOf(index);
//     whiteArray.splice(temp,1);
//   }
//   if(abc==="b"){
//     blackArray.push(index);
//     for(let i=0;i<whiteArray.length;i++){
//       let card1=whichImage(whiteArray[i]);
//       if(card1==="wpawn"){
//         if(pawnValidArray(whiteArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       else if(card1==="wrook"){
//         if(rookValidArray(whiteArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="wknight"){
//         if(knightValidArray(whiteArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="wbishop"){
//         if(bishopValidArray(whiteArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="wqueen"){
//         if(queenValidArray(whiteArray[i]).includes(index)){
//           result=true;
//         }
//       }
//       if(card1==="wking"){
//         if(kingValidArray(whiteArray[i]).includes(index)){
//           result=true;
//         }
//       }
//     }
//     let temp=blackArray.indexOf(index);
//     blackArray.splice(temp,1);
//   }
//   return result;
// }


function firstClick(){
  if(turn==="w"){
    if(whiteArray.includes(firstClickIndex)){
      turn="b";
      if(currentHighlightIndex!=null){
       highlight(currentHighlightIndex);
       currentHighlightIndex=null;}
      highlight(firstClickIndex);
      currentHighlightIndex=firstClickIndex;
      updateValidArray(currentHighlightIndex);
    }
  }else if(turn==="b"){
    if(blackArray.includes(firstClickIndex)){
    turn="w";
    if(currentHighlightIndex!=null){
       highlight(currentHighlightIndex);
       currentHighlightIndex=null;}
      highlight(firstClickIndex);
      currentHighlightIndex=firstClickIndex;
      updateValidArray(currentHighlightIndex);
  }
}
// console.log(validArray);
highlightValidArray(1);
}

function updateValidArray(index){
  validArray=[];
      switch(true){
        case squares[index].classList.contains('bpawn'):
          validArray=pawnValidArray(index,"b",null);
          break;
        case squares[index].classList.contains('brook'):
          validArray=rookValidArray(index,"b",null);
          break;
        case squares[index].classList.contains('bknight'):
          validArray=knightValidArray(index,"b",null);
          break;
        case squares[index].classList.contains('bbishop'):
          validArray=bishopValidArray(index,"b",null);
          break;
        case squares[index].classList.contains('bqueen'):
          validArray=queenValidArray(index,"b",null);
          break;
        case squares[index].classList.contains('bking'):
          validArray=kingValidArray(index,"b",null);
          break;
        case squares[index].classList.contains('wpawn'):
          validArray=pawnValidArray(index,"w",null);
          break;
        case squares[index].classList.contains('wrook'):
          validArray=rookValidArray(index,"w",null);
          break;
        case squares[index].classList.contains('wknight'):
          validArray=knightValidArray(index,"w",null);
          break;
        case squares[index].classList.contains('wbishop'):
          validArray=bishopValidArray(index,"w",null);
          break;
        case squares[index].classList.contains('wqueen'):
          validArray=queenValidArray(index,"w",null);
          break;
        case squares[index].classList.contains('wking'):
          validArray=kingValidArray(index,"w",null);
          break;
      }
}

function pawnValidArray(index,clr,uA){
  validArray=[];
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  if(index<56 && index>47){
    if(empty(cartesianToIndex([x,y+2]))){
      validArrayReturn.push(cartesianToIndex([x,y+2]));
    }
  }
  if(clr==="w"){
    if(uA!=null){
      blackArray.push(uA);
    }
    if( isValid([x,y+1]) && empty(cartesianToIndex([x,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x,y+1]));
    }
    if( isValid([x+1,y+1]) && black(cartesianToIndex([x+1,y+1])) ) {
      validArrayReturn.push(cartesianToIndex([x+1,y+1]));
    }
    if( isValid([x-1,y+1]) && black(cartesianToIndex([x-1,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x-1,y+1]));
    }
    if(uA!=null){
    blackArray.pop();
    }
  }
  if(clr==="b"){
    if(uA!=null){
      whiteArray.push(uA);
    }
    if( isValid([x,y+1]) && empty(cartesianToIndex([x,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x,y+1]));
    }
    if( isValid([x+1,y+1]) && white(cartesianToIndex([x+1,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x+1,y+1]));
    }
    if( isValid([x-1,y+1]) && white(cartesianToIndex([x-1,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x-1,y+1]));
    }
    if(uA!=null){
      whiteArray.pop();
    }
  }
  // console.log(whichImage(index)+stripArray(validArrayReturn));
  return stripArray(validArrayReturn);
}

function rookValidArray(index,clr,uA){
  validArray=[];
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  if(clr==="w"){
    if(uA!=null){
      blackArray.push(uA);
    }
    for(let i=1;i<8;i++){
      if( isValid([x,y+i]) && empty(cartesianToIndex([x,y+i]))){
        validArrayReturn.push(cartesianToIndex([x,y+i]));
      }else{
        if( isValid([x,y+i]) && black(cartesianToIndex([x,y+i]))){
          validArrayReturn.push(cartesianToIndex([x,y+i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x+i,y]) && empty(cartesianToIndex([x+i,y]))){
        validArrayReturn.push(cartesianToIndex([x+i,y]));
      }else{
        if( isValid([x+i,y]) && black(cartesianToIndex([x+i,y]))){
          validArrayReturn.push(cartesianToIndex([x+i,y]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x,y-i]) && empty(cartesianToIndex([x,y-i]))){
        validArrayReturn.push(cartesianToIndex([x,y-i]));
      }else{
        if( isValid([x,y-i]) && black(cartesianToIndex([x,y-i]))){
          validArrayReturn.push(cartesianToIndex([x,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x-i,y]) && empty(cartesianToIndex([x-i,y]))){
        validArrayReturn.push(cartesianToIndex([x-i,y]));
      }else{
        if( isValid([x-i,y]) && black(cartesianToIndex([x-i,y]))){
          validArrayReturn.push(cartesianToIndex([x-i,y]));
          break;
        }
        else{break;}
      }
    }
    if(uA!=null){
      blackArray.pop(uA);
    }
  }
  if(clr==="b"){
    if(uA!=null){
      whiteArray.push(uA);
    }
    for(let i=1;i<8;i++){
      if( isValid([x,y+i]) && empty(cartesianToIndex([x,y+i]))){
        validArrayReturn.push(cartesianToIndex([x,y+i]));
      }else{
        if( isValid([x,y+i]) && white(cartesianToIndex([x,y+i]))){
          validArrayReturn.push(cartesianToIndex([x,y+i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x+i,y]) && empty(cartesianToIndex([x+i,y]))){
        validArrayReturn.push(cartesianToIndex([x+i,y]));
      }else{
        if( isValid([x+i,y]) && white(cartesianToIndex([x+i,y]))){
          validArrayReturn.push(cartesianToIndex([x+i,y]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x,y-i]) && empty(cartesianToIndex([x,y-i]))){
        validArrayReturn.push(cartesianToIndex([x,y-i]));
      }else{
        if( isValid([x,y-i]) && white(cartesianToIndex([x,y-i]))){
          validArrayReturn.push(cartesianToIndex([x,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x-i,y]) && empty(cartesianToIndex([x-i,y]))){
        validArrayReturn.push(cartesianToIndex([x-i,y]));
      }else{
        if( isValid([x-i,y]) && white(cartesianToIndex([x-i,y]))){
          validArrayReturn.push(cartesianToIndex([x-i,y]));
          break;
        }
        else{break;}
      }
    }
    if(uA!=null){
      whiteArray.pop();
    }
  }
  return stripArray(validArrayReturn);
}

function bishopValidArray(index,clr,uA){
  validArray=[];
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  if(clr==="w"){
    if(uA!=null){
      blackArray.push(uA);
    }
    for(let i=1;i<8;i++){
      if( isValid([x+i,y+i]) && empty(cartesianToIndex([x+i,y+i]))){
        validArrayReturn.push(cartesianToIndex([x+i,y+i]));
      }else{
        if( isValid([x+i,y+i]) && black(cartesianToIndex([x+i,y+i]))){
          validArrayReturn.push(cartesianToIndex([x+i,y+i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x+i,y-i]) && empty(cartesianToIndex([x+i,y-i]))){
        validArrayReturn.push(cartesianToIndex([x+i,y-i]));
      }else{
        if( isValid([x+i,y-i]) && black(cartesianToIndex([x+i,y-i]))){
          validArrayReturn.push(cartesianToIndex([x+i,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x-i,y-i]) && empty(cartesianToIndex([x-i,y-i]))){
        validArrayReturn.push(cartesianToIndex([x-i,y-i]));
      }else{
        if( isValid([x-i,y-i]) && black(cartesianToIndex([x-i,y-i]))){
          validArrayReturn.push(cartesianToIndex([x-i,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x-i,y+i]) && empty(cartesianToIndex([x-i,y+i]))){
        validArrayReturn.push(cartesianToIndex([x-i,y+i]));
      }else{
        if( isValid([x-i,y+i]) && black(cartesianToIndex([x-i,y+i]))){
          validArrayReturn.push(cartesianToIndex([x-i,y+i]));
          break;
        }
        else{break;}
      }
    }
    if(uA!=null){
      whiteArray.pop();
    }
  }
  if(clr==="b"){
    if(uA!=null){
      whiteArray.push(uA);
    }
    for(let i=1;i<8;i++){
      if( isValid([x+i,y+i]) && empty(cartesianToIndex([x+i,y+i]))){
        validArrayReturn.push(cartesianToIndex([x+i,y+i]));
      }else{
        if( isValid([x+i,y+i]) && white(cartesianToIndex([x+i,y+i]))){
          validArrayReturn.push(cartesianToIndex([x+i,y+i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x+i,y-i]) && empty(cartesianToIndex([x+i,y-i]))){
        validArrayReturn.push(cartesianToIndex([x+i,y-i]));
      }else{
        if( isValid([x+i,y-i]) && white(cartesianToIndex([x+i,y-i]))){
          validArrayReturn.push(cartesianToIndex([x+i,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x-i,y-i]) && empty(cartesianToIndex([x-i,y-i]))){
        validArrayReturn.push(cartesianToIndex([x-i,y-i]));
      }else{
        if( isValid([x-i,y-i]) && white(cartesianToIndex([x-i,y-i]))){
          validArrayReturn.push(cartesianToIndex([x-i,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if( isValid([x-i,y+i]) && empty(cartesianToIndex([x-i,y+i]))){
        validArrayReturn.push(cartesianToIndex([x-i,y+i]));
      }else{
        if( isValid([x-i,y+i]) && white(cartesianToIndex([x-i,y+i]))){
          validArrayReturn.push(cartesianToIndex([x-i,y+i]));
          break;
        }
        else{break;}
      }
    }
    if(uA!=null){
      whiteArray.pop();
    }
  }
  return stripArray(validArrayReturn);
}

function knightValidArray(index,clr,uA){
  validArray=[];
  let validArrayReturn=[];
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  let knightArray=[[x+1,y+2],[x+2,y+1],[x-1,y+2],[x-2,y+1],[x+1,y-2],[x+2,y-1],[x-1,y-2],[x-2,y-1]];
  if(clr==="w"){
    if(uA!=null){
      blackArray.push(uA);
    }
  for(let i=0; i<knightArray.length; i++){
    if( isValid(knightArray[i]) && !white(cartesianToIndex(knightArray[i])) ){
      validArrayReturn.push(cartesianToIndex(knightArray[i]));
    }
  }
  if(uA!=null){
    blackArray.pop();
  }
  }
  if(clr==="b"){
    if(uA!=null){
      whiteArray.push(uA);
    }
  for(let i=0; i<knightArray.length; i++){
    if( isValid(knightArray[i]) && !black(cartesianToIndex(knightArray[i])) ){
      validArrayReturn.push(cartesianToIndex(knightArray[i]));
    }
  }
  if(uA!=null){
    whiteArray.pop();
  }
  }
  return stripArray(validArrayReturn);
}
function kingValidArray(index,clr,uA){
  validArray=[];
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  let kingArray=[[x+1,y],[x-1,y],[x,y+1],[x,y-1],[x-1,y-1],[x-1,y+1],[x+1,y-1],[x+1,y+1]];
  if(clr==="w"){
    if(uA!=null){
      blackArray.push(uA);
    }
  for(let i=0; i<kingArray.length; i++){
    if( isValid(kingArray[i]) && !white(cartesianToIndex(kingArray[i])) ){
      validArrayReturn.push(cartesianToIndex(kingArray[i]));
    }
  }
  if(uA!=null){
    blackArray.pop();
  }
  }
  if(clr==="b"){
    if(uA!=null){
      whiteArray.push(uA);
    }
  for(let i=0; i<kingArray.length; i++){
    if( isValid(kingArray[i]) && !black(cartesianToIndex(kingArray[i])) ){
      validArrayReturn.push(cartesianToIndex(kingArray[i]));
    }
  }
  if(uA!=null){
    whiteArray.pop();
  }
  }
  return stripArray(validArrayReturn);
}


function queenValidArray(index,clr,uA){
  validArray=[];
  let validArrayReturn=rookValidArray(index,clr,null).concat(bishopValidArray(index,clr,null));
  return validArrayReturn;
}

function secondClick(){
  if(validArray.includes(secondClickIndex)){
    let card=whichImage(currentHighlightIndex);
    if(card==="bpawn" && secondClickIndex<8){
      squares[currentHighlightIndex].classList.remove('bpawn');
      squares[currentHighlightIndex].classList.add('bqueen');
      card="bqueen";
    }
    if(card==="wpawn" && secondClickIndex<8){
      squares[currentHighlightIndex].classList.remove('wpawn');
      squares[currentHighlightIndex].classList.add('wqueen');
      card="wqueen";
    }
    let temp4=null;
    if(black(currentHighlightIndex)){
      let temp=blackArray.indexOf(currentHighlightIndex);
      blackArray.splice(temp,1);
      blackArray.push(secondClickIndex);
      if(white(secondClickIndex)){
        let temp2=whiteArray.indexOf(secondClickIndex);
        whiteArray.splice(temp2,1);
        let temp3=whichImage(secondClickIndex);
        switch(temp3){
          case 'wpawn':
          temp=pwpawn.innerHTML;
          temp4++;
          pwpawn.innerHTML=temp4;
          break;
          case 'wrook':
          temp=pwrook.innerHTML;
          temp4++;
          pwrook.innerHTML=temp4;
          break;
          case 'wknight':
          temp=pwknight.innerHTML;
          temp4++;
          pwknight.innerHTML=temp4;
          break;
          case 'wbishop':
          temp=pwbishop.innerHTML;
          temp4++;
          pwbishop.innerHTML=temp4;
          break;
          case 'wqueen':
          temp=pwqueen.innerHTML;
          temp4++;
          pwqueen.innerHTML=temp4;
          break;
          case 'wking':
          temp=pwking.innerHTML;
          temp4++;
          pwking.innerHTML=temp4;
          break;
        }
        squares[secondClickIndex].classList.remove(temp3);
      }
    }
    if(white(currentHighlightIndex)){
      let temp=whiteArray.indexOf(currentHighlightIndex);
      whiteArray.splice(temp,1);
      whiteArray.push(secondClickIndex);
      if(black(secondClickIndex)){
        let temp2=blackArray.indexOf(secondClickIndex);
        blackArray.splice(temp2,1);
        let temp3=whichImage(secondClickIndex);
        switch(temp3){
          case 'bpawn':
          temp=pbpawn.innerHTML;
          temp4++;
          pbpawn.innerHTML=temp4;
          break;
          case 'brook':
          temp=pbrook.innerHTML;
          temp4++;
          pbrook.innerHTML=temp4;
          break;
          case 'bknight':
          temp=pbknight.innerHTML;
          temp4++;
          pbknight.innerHTML=temp4;
          break;
          case 'bbishop':
          temp=pbbishop.innerHTML;
          temp4++;
          pbbishop.innerHTML=temp4;
          break;
          case 'bqueen':
          temp=pbqueen.innerHTML;
          temp4++;
          pbqueen.innerHTML=temp4;
          break;
          case 'bking':
          temp=pbking.innerHTML;
          temp4++;
          pbking.innerHTML=temp4;
          break;
      }
        squares[secondClickIndex].classList.remove(temp3);
      }

    }
    squares[currentHighlightIndex].classList.remove(card);
    squares[secondClickIndex].classList.add(card);
    highlight(currentHighlightIndex);
    currentHighlightIndex=null;
    secondClickIndex=null;
    validArray=[];
    firstClickIndex=null;
    setTimeout(rotateBoard,1000);
  }
  else{
    if(currentHighlightIndex!=null){
      highlightValidArray(0);
      if(turn==="w"){
        turn="b";
      }else{
        turn="w";
      }
    highlight(currentHighlightIndex);
    currentHighlightIndex=null;}
    firstClickIndex=null;
    secondClickIndex=null;
    validArray=[];
  }
}




















});
