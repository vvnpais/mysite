document.addEventListener('DOMContentLoaded',()=>{
  const test=document.querySelector('#test');
  const squares=document.querySelectorAll('.grid div');
  const width=8;
  let validArray=[];
  let turn="w";
  let currentHighlightIndex=null;
  let firstClickIndex=null;
  let secondClickIndex=null;
  let tempForClassList=null;
  const whiteArray=[48,49,50,51,52,53,54,55,66,57,58,59,60,61,62,63];
  const blackArray=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


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

function addImage(i,abc){
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
}

test.addEventListener('click',rotateBoard);

// if(cartesianIsValid([-1,8])===true){
//   window.alert('True');
// }
// else{window.alert('False');}

for(let i=0; i<squares.length; i++){
  squares[i].addEventListener('click',()=>{
    if(firstClickIndex==null){
    firstClickIndex=i;
    firstClick();}
  })
  squares[i].addEventListener('click',()=>{
    if(firstClickIndex!=null){
    secondClickIndex=i;
    secondClick();}
  })
}

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
}

function updateValidArray(index){
  validArray=[];
      switch(true){
        case squares[index].classList.contains('bpawn'):
          validArray=pawnValidArray(index);
          break;
        case squares[index].classList.contains('brook'):
          validArray=rookValidArray(index);
          break;
        case squares[index].classList.contains('bknight'):
          validArray=knightValidArray(index);
          break;
        case squares[index].classList.contains('bbishop'):
          validArray=bishopValidArray(index);
          break;
        case squares[index].classList.contains('bqueen'):
          validArray=queenValidArray(index);
          break;
        case squares[index].classList.contains('bking'):
          validArray=kingValidArray(index);
          break;
        case squares[index].classList.contains('wpawn'):
          validArray=pawnValidArray(index);
          break;
        case squares[index].classList.contains('wrook'):
          validArray=rookValidArray(index);
          break;
        case squares[index].classList.contains('wknight'):
          validArray=knightValidArray(index);
          break;
        case squares[index].classList.contains('wbishop'):
          validArray=bishopValidArray(index);
          break;
        case squares[index].classList.contains('wqueen'):
          validArray=queenValidArray(index);
          break;
        case squares[index].classList.contains('wking'):
          validArray=kingValidArray(index);
          break;
      }
}

function pawnValidArray(index){
  let validArray=[]
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  if(white(index)){
    if( isValid([x,y+1]) && empty(cartesianToIndex([x,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x,y+1]));
    }
    if( isValid([x+1,y+1]) && black(cartesianToIndex([x+1,y+1])) ) {
      validArrayReturn.push(cartesianToIndex([x+1,y+1]));
    }
    if( isValid([x-1,y+1]) && black(cartesianToIndex([x-1,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x-1,y+1]));
    }
  }
  if(black(index)){
    if( isValid([x,y+1]) && empty(cartesianToIndex([x,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x,y+1]));
    }
    if( isValid([x+1,y+1]) && white(cartesianToIndex([x+1,y+1])) ) {
      validArrayReturn.push(cartesianToIndex([x+1,y+1]));
    }
    if( isValid([x-1,y+1]) && white(cartesianToIndex([x-1,y+1])) ){
      validArrayReturn.push(cartesianToIndex([x-1,y+1]));
    }
  }
  console.log(whichImage(index)+stripArray(validArrayReturn));
  return stripArray(validArrayReturn);
}

function rookValidArray(index){
  let validArray=[]
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
  if(white(index)){
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x,y+i]))){
        validArrayReturn.push(cartesianToIndex([x,y+i]));
      }else{
        if(black(cartesianToIndex([x,y+i]))){
          validArrayReturn.push(cartesianToIndex([x,y+i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x+i,y]))){
        validArrayReturn.push(cartesianToIndex([x+i,y]));
      }else{
        if(black(cartesianToIndex([x+i,y]))){
          validArrayReturn.push(cartesianToIndex([x+i,y]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x,y-i]))){
        validArrayReturn.push(cartesianToIndex([x,y-i]));
      }else{
        if(black(cartesianToIndex([x,y-i]))){
          validArrayReturn.push(cartesianToIndex([x,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x-i,y]))){
        validArrayReturn.push(cartesianToIndex([x-i,y]));
      }else{
        if(black(cartesianToIndex([x-i,y]))){
          validArrayReturn.push(cartesianToIndex([x-i,y]));
          break;
        }
        else{break;}
      }
    }
  }
  if(black(index)){
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x,y+i]))){
        validArrayReturn.push(cartesianToIndex([x,y+i]));
      }else{
        if(white(cartesianToIndex([x,y+i]))){
          validArrayReturn.push(cartesianToIndex([x,y+i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x+i,y]))){
        validArrayReturn.push(cartesianToIndex([x+i,y]));
      }else{
        if(white(cartesianToIndex([x+i,y]))){
          validArrayReturn.push(cartesianToIndex([x+i,y]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x,y-i]))){
        validArrayReturn.push(cartesianToIndex([x,y-i]));
      }else{
        if(white(cartesianToIndex([x,y-i]))){
          validArrayReturn.push(cartesianToIndex([x,y-i]));
          break;
        }
        else{break;}
      }
    }
    for(let i=1;i<8;i++){
      if(empty(cartesianToIndex([x-i,y]))){
        validArrayReturn.push(cartesianToIndex([x-i,y]));
      }else{
        if(white(cartesianToIndex([x-i,y]))){
          validArrayReturn.push(cartesianToIndex([x-i,y]));
          break;
        }
        else{break;}
      }
    }
  }
  return stripArray(validArrayReturn);
}

function knightValidArray(index){
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
}

function bishopValidArray(index){
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
}

function queenValidArray(index){
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
}

function kingValidArray(index){
  let validArrayReturn=[]
  let cart=indexToCartesian(index);
  let x=cart[0];
  let y=cart[1];
}

function secondClick(){
  if(validArray.includes(secondClickIndex)){
    let card=whichImage(currentHighlightIndex);
    if(black(currentHighlightIndex)){
      let temp=blackArray.indexOf(currentHighlightIndex);
      blackArray.splice(temp,1);
      blackArray.push(secondClickIndex);
    }
    if(white(currentHighlightIndex)){
      let temp=whiteArray.indexOf(currentHighlightIndex);
      whiteArray.splice(temp,1);
      whiteArray.push(secondClickIndex);
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
  // else{
  //   if(currentHighlightIndex!=null){
  //   highlight(currentHighlightIndex);
  //   currentHighlightIndex=null;}
  //   firstClickIndex=null;
  //   secondClickIndex=null;
  //   validArray=[];
  // }
}




















});
