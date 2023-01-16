document.addEventListener('DOMContentLoaded',()=>{
  const squares=document.querySelectorAll('.grid div');
  const scoreDisplay=document.querySelector('#span');
  const startBtn=document.querySelector('.start');
  const upp=document.getElementById('up');
  const downn=document.getElementById('down');
  const leftt=document.getElementById('left');
  const rightt=document.getElementById('right');

  const width=20;
  let currentIndex=0;
  let appleIndex=0;
  let currentSnake=[2,1,0];
  //index 2 is head,0 is tail,1 is body
  let direction=1;
  let score=0;
  let speed=0.97;
  let intervalTime=0;
  let interval=0;


  //to start and restart game
function startGame(){
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(interval);
  score=0;
  randomApple();
  direction=1;
  scoreDisplay.innerText=score;
  intervalTime=300;
  currentSnake=[2,1,0];
  currentIndex=0;
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  interval=setInterval(moveOutcomes,intervalTime)
}

//function that deals with all outcomes of snake moveOutcomes
function moveOutcomes(){
//deals with snake hitting border and snake hitting itself
if(
  (currentSnake[0]+width >= (width*width) && direction === width)|| ///hits bottom
  (currentSnake[0]%width===width-1 && direction===1)|| //hits right
  (currentSnake[0]%width===0 && direction===-1)|| //hits left
  (currentSnake[0]-width<0 && direction===-width)|| //hits top
  squares[currentSnake[0]+direction].classList.contains('snake') //hits itself
){
  return clearInterval(interval) //clears interval
}

const tail = currentSnake.pop(); //removes last item of arrays and shows it
squares[tail].classList.remove('snake');
currentSnake.unshift(currentSnake[0]+direction); //gives direction to snake


//deals with snake hitting apple
if(squares[currentSnake[0]].classList.contains('apple')){
  squares[currentSnake[0]].classList.remove('apple');
  squares[tail].classList.add('snake');
  currentSnake.push(tail);
  randomApple();
  score++;
  scoreDisplay.textContent=score;
  clearInterval(interval);
  intervalTime=intervalTime*speed;
  interval=setInterval(moveOutcomes,intervalTime);
}
squares[currentSnake[0]].classList.add('snake');
}

//generate new apple
function randomApple(){
  do{
    appleIndex=Math.floor(Math.random()*squares.length);
  }while(squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

  //assign function to keycodes
  function control(e){
    squares[currentIndex].classList.remove('snake');//
    if(e.keyCode===39 && direction!=-1){
      direction=1; //right;
    }else if(e.keyCode===38 && direction!=+width){
      direction=-width; //up
    }else if(e.keyCode===37 && direction!=+1){
      direction=-1; //left
    }else if(e.keyCode===40 && direction!=-width){
      direction=+width; //down
    }
  }
document.addEventListener('keydown',control);
startBtn.addEventListener('click',startGame);
upp.addEventListener('click',()=>{
  squares[currentIndex].classList.remove('snake');
  if(direction!=+width){direction=-width;}
});
leftt.addEventListener('click',()=>{
  squares[currentIndex].classList.remove('snake');
  if(direction!=+1){direction=-1;}
});
rightt.addEventListener('click',()=>{
  squares[currentIndex].classList.remove('snake');
  if(direction!=-1){direction=+1;}
});
downn.addEventListener('click',()=>{
  squares[currentIndex].classList.remove('snake');
  if(direction!=-width){direction=+width;}
});



})
