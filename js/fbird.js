document.addEventListener('DOMContentLoaded',()=>{

const squares=document.querySelectorAll('.grid div');
const scoreDisplay=document.querySelector('#score');
const width=45;
const scale=2;
const nwidth=width*scale;
let birdIndex=998;
let movingDown=null;
let obstaclesMove=null;
let obstaclesForm=null;
let checkLossId=null;
let maxObstacleLength=11;
let minObstacleLength=9;
let increaseScoreId=null;
let score=0;

function start(){
    if(movingDown!=null){
      clearInterval(movingDown);
      clearInterval(obstaclesMove);
      clearInterval(obstaclesForm);
      clearInterval(checkLossId);
      clearInterval(increaseScoreId);
      movingDown=null;
      obstaclesForm=null;
      obstaclesMove=null;
      checkLossId=null;
      increaseScoreId=null;
      document.removeEventListener('keydown',control);
    }
    else{
      movingDown=setInterval(moveDown,180);
      obstaclesMove=setInterval(moveObstaclesLeft,100);
      obstaclesForm=setInterval(formObstacles,1000);
      checkLossId=setInterval(checkLoss,100);
      increaseScoreId=setInterval(increaseScore,1000);
      document.addEventListener('keydown',control);
    }
}

function increaseScore(){
  score++;
  scoreDisplay.innerHTML=score;
}

function checkLoss(){
  if(squares[birdIndex].classList.contains('obstacle')) {
    clearInterval(movingDown);
    clearInterval(obstaclesMove);
    clearInterval(obstaclesForm);
    clearInterval(increaseScoreId);
    movingDown=null;
    obstaclesMove=null;
    obstaclesForm=null;
    increaseScoreId=null;
    document.removeEventListener('keydown',control);
  }
}

function control(e){
  if(e.keyCode===38){
    moveUp();
  }else if(e.keyCode===37){
    moveLeft();
  }else if(e.keyCode===39){
    moveRight();
  }
}

function draw(a){
  if(a===0){
    squares[birdIndex].classList.remove('bird');
  }else if(a===1){
    squares[birdIndex].classList.add('bird');
  }
}

function moveUp(){
  draw(0);
  if(birdIndex-nwidth>=0){
    birdIndex-=nwidth;
  }
  draw(1);
}
function moveDown(){
  draw(0);
  if(birdIndex+width<width*width){
    birdIndex+=width;
  }
  draw(1);
}

function moveRight(){
  draw(0);
  if(birdIndex%width<width-scale){
    birdIndex+=scale;
  }
  draw(1);
}
function moveLeft(){
  draw(0);
  if(birdIndex%width>=scale){
    birdIndex-=scale;
  }
  draw(1);
}

startBtn.addEventListener('click',start);

function formObstacles(){
  let topRandom=minObstacleLength+Math.floor((Math.random()*maxObstacleLength));
  let bottomRandom=minObstacleLength+Math.floor((Math.random()*maxObstacleLength));
  function obstacleFunction1(i){
    squares[width*i-1].classList.add('obstacle');
    squares[width*i-2].classList.add('obstacle');
    squares[width*i-3].classList.add('obstacle');
    squares[width*i-4].classList.add('obstacle');
  }
  obstacleFunction1(1);
  obstacleFunction1(2);
  for(let i=0;i<topRandom-5;i++){
    squares[width*(3+i)-2].classList.add('obstacle');
    squares[width*(3+i)-3].classList.add('obstacle');
  }
  obstacleFunction1(topRandom-2);
  obstacleFunction1(topRandom-1);
  obstacleFunction1(width);
  obstacleFunction1(width-1);
  for(let i=0;i<bottomRandom-5;i++){
    squares[width*(width-2-i)-2].classList.add('obstacle');
    squares[width*(width-2-i)-3].classList.add('obstacle');
  }
  obstacleFunction1(width-bottomRandom+2);
  obstacleFunction1(width-bottomRandom+3);
}

function moveObstaclesLeft(){
  let obstacleArray=[];
  for(let i=0;i<width*width;i++){
    if(squares[i].classList.contains('obstacle')){
      if(i%width!==0 && i!==0)
      {obstacleArray.push(i);}
      squares[i].classList.remove('obstacle');
    }
  }
  for(let i=0;i<obstacleArray.length;i++){
    obstacleArray[i]--;
  }
  for(let i=0;i<obstacleArray.length;i++){
      squares[obstacleArray[i]].classList.add('obstacle');
  }
}











})
