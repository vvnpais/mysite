document.addEventListener('DOMContentLoaded',()=>{

const squares=document.querySelectorAll('.grid div');
const scoreDisplay=document.querySelector('#score');
const easyb=document.querySelector('.easyb');
const mediumb=document.querySelector('.mediumb');
const hardb=document.querySelector('.hardb');
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
let obstacleMoveSpeed=100;
let obstacleFormSpeed=1000;
let increaseScoreSpeed=1000;

easyb.addEventListener('click',()=>{
  obstacleMoveSpeed=120;
  obstacleFormSpeed=1200;
  increaseScoreSpeed=1200;
  maxObstacleLength=11;
  minObstacleLength=6;
  start();
  start();
})
mediumb.addEventListener('click',()=>{
  obstacleMoveSpeed=80;
  obstacleFormSpeed=800;
  increaseScoreSpeed=800;
  maxObstacleLength=11;
  minObstacleLength=9;
  start();
  start();
})
hardb.addEventListener('click',()=>{
  obstacleMoveSpeed=40;
  obstacleFormSpeed=400;
  increaseScoreSpeed=400;
  maxObstacleLength=12;
  minObstacleLength=10;
  start();
  start();
})

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
      obstaclesMove=setInterval(moveObstaclesLeft,obstacleMoveSpeed);
      obstaclesForm=setInterval(formObstacles,obstacleFormSpeed);
      checkLossId=setInterval(checkLoss,50);
      increaseScoreId=setInterval(increaseScore,increaseScoreSpeed);
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
