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
const note=document.querySelector('#note');
let w="w",b="b",yy='yy',rr='rr',turn=w,fci=null,sci=null,width=8,green='green',red='red',none='none';
let straight='straight',reverse='reverse',gameOn=1;
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

function opp(color){
  if(color==b){return w;}else{return b;}
}

function whichColor(index){
  if(index==null){return none;}
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

function genValidArray(piece,index,board){
  let validArray=[], pieceColor=whichColor(index);

  if(piece=='bpawn' || piece=='wpawn'){
    let cc=cart(index);
      if(isValid([cc[0],cc[1]+1]) && isEmpty(ind([cc[0],cc[1]+1])) && board!=reverse){
        validArray.push(ind([cc[0],cc[1]+1]));
      }
      if(isValid([cc[0]+1,cc[1]+1]) && isOpp(pieceColor,ind([cc[0]+1,cc[1]+1])) && board!=reverse ){
        validArray.push(ind([cc[0]+1,cc[1]+1]));
      }
      if(isValid([cc[0]-1,cc[1]+1]) && isOpp(pieceColor,ind([cc[0]-1,cc[1]+1])) && board!=reverse){
        validArray.push(ind([cc[0]-1,cc[1]+1]));
      }
      if(index>47 && index<56){
        if(isValid([cc[0],cc[1]+2]) && isEmpty(ind([cc[0],cc[1]+2]))){
          validArray.push(ind([cc[0],cc[1]+2]));
        }
      }
      if(board==reverse){
        if(isValid([cc[0]+1,cc[1]-1]) && isEmpty(ind([cc[0]+1,cc[1]-1])) ){
          validArray.push(ind([cc[0]+1,cc[1]-1]));
        }
        if(isValid([cc[0]-1,cc[1]-1]) && isEmpty(ind([cc[0]-1,cc[1]-1])) ){
          validArray.push(ind([cc[0]-1,cc[1]-1]));
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

function kingCheck(color,index){
  if(color==w){
    for(let i=0;i<64;i++){
      if(whichColor(i)==b){
        let kcArray=genValidArray(whichPiece(i),i,reverse);
        if(kcArray.includes(index)){
          return true;
        }
      }
    }
  }
  else if(color==b){
    for(let i=0;i<64;i++){
      if(whichColor(i)==w){
        let kcArray=genValidArray(whichPiece(i),i,reverse);
        if(kcArray.includes(index)){
          return true;
        }
      }
    }
  }
  return false;
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

function clickSquare(ind){
  if(fci==null && gameOn==1){
    fci=ind;
    sci=null;
    // check if correct piece clicked
    if(whichColor(ind)!=turn){fci=null;}
    else{

    va=genValidArray(whichPiece(ind),ind,straight);
    if(whichPiece(ind)=='bking' || whichPiece(ind)=='wking'){
      let spliceArray=[]
      for(let j=0;j<va.length;j++){
        if(kingCheck(whichColor(ind),va[j])){
          spliceArray.push(va[j]);
        }
      }
      for(let i=0;i<spliceArray.length;i++){
        let tem=va.indexOf(spliceArray[i]);
        va.splice(tem,1);
      }

    }


    // set valid array to green
      for(let i=0;i<va.length;i++){
        togg(squares[va[i]],green);
      }
      togg(squares[ind],green);


    }
  }
  else if(fci!=null && gameOn==1){
    sci=ind;
    let sciPiece=whichPiece(sci);
    let fciPiece=whichPiece(fci);
    // remove all green
    for(let i=0;i<64;i++){
      if(squares[i].classList.contains(green)){
        squares[i].classList.remove(green);
      }
    }

    if(va.includes(sci)){
      if(sciPiece!=null){
        updatePieceScore(sciPiece);
        squares[sci].classList.remove(sciPiece);
      }
      squares[fci].classList.remove(fciPiece);
      squares[sci].classList.add(fciPiece);



      rotateBoard();
      if(turn==w){turn=b; note.textContent="Turn of black."}
      else{turn=w; note.textContent="Turn of white."}

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
    // check for win
    let oppKingIndex=null;
    if(turn==w){
      for(let i=0;i<64;i++){
        if(whichPiece(i)=='wking'){
          oppKingIndex=i;
          break;
        }
      }
    }
    if(turn==b){
      for(let i=0;i<64;i++){
        if(whichPiece(i)=='bking'){
          oppKingIndex=i;
          break;
        }
      }
    }

    let oppKingVA=genValidArray(whichPiece(oppKingIndex),oppKingIndex,straight);
    let spliceArray=[]
    let notTrivialCheck=0;
    for(let i=0;i<oppKingVA.length;i++){
      if(kingCheck(turn,oppKingVA[i])){
        spliceArray.push(oppKingVA[i]);
        notTrivialCheck=1;
      }
    }
    for(let i=0;i<spliceArray.length;i++){
      let tem=oppKingVA.indexOf(spliceArray[i]);
      oppKingVA.splice(tem,1);
    }
    console.log(oppKingVA.length);
    if(oppKingVA.length==0 && notTrivialCheck==1){
      if(turn==w){note.textContent="Black wins. Resfresh page to play again."}
      else if(turn==b){note.textContent="White wins. Resfresh page to play again."}
      gameOn=0;
    }
  }
}
for(let i=0;i<64;i++){
    squares[i].addEventListener('click',()=>{clickSquare(i);});
}



})
