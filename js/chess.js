document.addEventListener('DOMContentLoaded',()=>{

const squares=document.querySelectorAll('.grid div');
const pbp=document.querySelector('#pbpawn');
const pbr=document.querySelector('#pbrook');
const pbkn=document.querySelector('#pbknight');
const pbb=document.querySelector('#pbbishop');
const pbq=document.querySelector('#pbqueen');
const pbk=document.querySelector('#pbking');
const pwp=document.querySelector('#pwpawn');
const pwr=document.querySelector('#pwrook');
const pwkn=document.querySelector('#pwknight');
const pwb=document.querySelector('#pwbishop');
const pwq=document.querySelector('#pwqueen');
const pwk=document.querySelector('#pwking');
let w="w",b="b",yy='yy',rr='rr',turn=w,fci=null,sci=null,width=8,green='green',none='none';
let pc=['bpawn','brook','bknight','bbishop','bqueen','bking',
'wpawn','wrook','wknight','wbishop','wqueen','wking']
let va=null;
// fci=firstClickIndex, sci=secondClickIndex, pc=pieceClasses, va=validArray, cc=cartesianCoordinates

// helper functions

function incPieceValue(name){
  let count=name.textContent;
  count=Number(count+1);
  name.textContent=count;
  return;
}

function updatePieceScore(name){
  switch(name){
    case 'bpawn': incPieceValue(pbp); break;
    case 'brook': incPieceValue(pbr); break;
    case 'bknight': incPieceValue(pbkn); break;
    case 'bbishop': incPieceValue(pbb); break;
    case 'bqueen': incPieceValue(pbq); break;
    case 'bking': incPieceValue(pbk); break;
    case 'wpawn': incPieceValue(pwp); break;
    case 'wrook': incPieceValue(pwr); break;
    case 'wknight': incPieceValue(pwkn); break;
    case 'wbishop': incPieceValue(pwb); break;
    case 'wqueen': incPieceValue(pwq); break;
    case 'wking': incPieceValue(pwk); break;
    default: break;
  }
}

function togg(obj,classname){
  obj.classList.toggle(classname);
}

function whichPiece(index){
  for(let i=0;i<12;i++){
    if(squares[index].classList.contains(pc[i])){
      return pc[i];
    }
  }
  return none;
}

function cart(i){
    let x=i%width+1;
    let y=8-((i-i%width)/width);
    return [x,y];
}

function ind([a,b]){
    let x=(8-b)*width+a-1;
    return x;
}

function isValid([a,b]){
  if(a>0 && a<9 && b>0 && b<9){
    return true;
  }else{return false;}
}

function whichColor(index){
  for(let i=0;i<12;i++){
    if(squares[index].classList.contains(pc[i])){
      if(i>5){
        return w;
      }
      else{return b;}
    }
  }
  return none;
}

function isOpp(color,index){
  if(index==null){return false;}
  if(color==w && whichColor(index)==b){
    return true;
  }
  else if(color==b && whichColor(index)==w){
    return true;
  }
  return false;
}

function isSame(color,index){
  if(index==null){return false;}
  if(color==w && whichColor(index)==w){
    return true;
  }
  else if(color==b && whichColor(index)==b){
    return true;
  }
  return false;
}

function isEmpty(index){
  if(index==null){return false;}
  for(let i=0;i<12;i++){
    if(squares[index].classList.contains(pc[i])){
      return false;
    }
  }
  return true;
}

function genValidArray(piece,index){
  let validArray=[], pieceColor=whichColor(index);

  if(piece=='bpawn' || piece=='wpawn'){
    let cc=cart(index);
      if(isValid([cc[0],cc[1]+1]) && isEmpty(ind([cc[0],cc[1]+1]))){
        validArray.push(ind([cc[0],cc[1]+1]));
      }
      if(isValid([cc[0]+1,cc[1]+1]) && isOpp(pieceColor,ind([cc[0]+1,cc[1]+1]))){
        validArray.push(ind([cc[0]+1,cc[1]+1]));
      }
      if(isValid([cc[0]-1,cc[1]+1]) && isOpp(pieceColor,ind([cc[0]-1,cc[1]+1]))){
        validArray.push(ind([cc[0]-1,cc[1]+1]));
      }
      if(index>47 && index<56){
        if(isValid([cc[0],cc[1]+2]) && isEmpty(ind([cc[0],cc[1]+2]))){
          validArray.push(ind([cc[0],cc[1]+2]));
        }
      }
  }

  else if(piece=='bknight' || piece=='wknight'){
    let cc=cart(index);
      knightArray=[ [cc[0]-1,cc[1]-2], [cc[0]-1,cc[1]+2], [cc[0]+1,cc[1]-2], [cc[0]+1,cc[1]+2],
                    [cc[0]-2,cc[1]-1], [cc[0]-2,cc[1]+1], [cc[0]+2,cc[1]-1], [cc[0]+2,cc[1]+1] ]
      for(let i=0;i<8;i++){
        if(isValid(knightArray[i]) && !isSame(pieceColor,ind(knightArray[i]))){
          validArray.push(ind(knightArray[i]));
        }
      }
  }

  else{
    let cc=cart(index),direction=null,range=null;
    if(piece=='brook' || piece=='wrook'){
      direction=[[1,0],[0,1],[-1,0],[0,-1]]
      range=7
    }
    else if(piece=='bbishop' || piece=='wbishop'){
      direction=[[1,1],[-1,-1],[-1,1],[1,-1]]
      range=7
    }
    else if(piece=='bqueen' || piece=='wqueen'){
      direction=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]]
      range=7
    }
    else if(piece=='bking' || piece=='wking'){
      direction=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]]
      range=1
    }
    for(let i=0;i<direction.length;i++){
      let dd=direction[i];
      for(let j=1;j<=range;j++){
        if(isValid([cc[0]+(dd[0]*j),cc[1]+(dd[1]*j)])){
          if(isSame(pieceColor,ind([cc[0]+(dd[0]*j),cc[1]+(dd[1]*j)]))){
            break;
          }
          validArray.push(ind([cc[0]+(dd[0]*j),cc[1]+(dd[1]*j)]));
          if(isOpp(pieceColor,ind([cc[0]+(dd[0]*j),cc[1]+(dd[1]*j)]))){
            break;
          }
        }
      }
    }
  }


  return validArray;
}

// helper functions end

//initiation of board starts
for(let i=0;i<64;i++){
  if(i%2==0){
    if(i%16>7){squares[i].classList.add('purple');}
    else{squares[i].classList.add('white');}
  }
  else if(i%2==1){
    if(i%16>7){squares[i].classList.add('white');}
    else{squares[i].classList.add('purple');}  }
}

function initPiece(num,piece){
  squares[num].classList.add(piece);
}
let initNum=[00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,
             48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]
let initPieceArray=['brook','bknight','bbishop','bqueen','bking','bbishop','bknight','brook',
                'bpawn','bpawn','bpawn','bpawn','bpawn','bpawn','bpawn','bpawn',
                'wpawn','wpawn','wpawn','wpawn','wpawn','wpawn','wpawn','wpawn',
                'wrook','wknight','wbishop','wqueen','wking','wbishop','wknight','wrook']
for(let i=0;i<32;i++){
  initPiece(initNum[i],initPieceArray[i]);
}
// init ends

// rotateBoard function
function rotateBoard(){
  for(let i=0;i<32;i++){
    let tem=squares[i].classList.value;
    squares[i].classList=squares[63-i].classList.value;
    squares[63-i].classList=tem;
  }
}

//testButton
// const bt=document.querySelector('#button');
// bt.addEventListener('click',rotateBoard);

function clickSquare(i){
  if(fci==null){
    fci=i;
    sci=null;
    // check if correct piece clicked
    if(whichColor(i)!=turn){fci=null;}
    else{

    va=genValidArray(whichPiece(i),i);

    // set valid array to green
      for(let i=0;i<va.length;i++){
        togg(squares[va[i]],green);
      }
      togg(squares[i],green);


    }
  }
  else{
    sci=i;
    // remove all green
    for(let i=0;i<64;i++){
      if(squares[i].classList.contains(green)){
        squares[i].classList.remove(green);
      }
    }

    if(va.includes(sci)){
      let sciPiece=whichPiece(sci);
      if(sciPiece!=null){
        updatePieceScore(sciPiece);
        squares[sci].classList.remove(sciPiece);
      }
      let fciPiece=whichPiece(fci);
      squares[fci].classList.remove(fciPiece);
      squares[sci].classList.add(fciPiece);

      rotateBoard();
      if(turn==w){turn=b;}else{turn=w;}

      // pawn promotion
      for(let i=0;i<8;i++){
        if(squares[i].classList.contains('bpawn')){
          squares[i].classList.remove('bpawn');
          squares[i].classList.add('bqueen');}
        if(squares[i].classList.contains('wpawn')){
          squares[i].classList.remove('wpawn');
          squares[i].classList.add('wqueen');}
      }
    }

    fci=null;
  }
}
for(let i=0;i<64;i++){
  squares[i].addEventListener('click',()=>{clickSquare(i);});
}

})
