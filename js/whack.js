document.addEventListener('DOMContentLoaded',()=>{
const square=document.querySelectorAll('.square');
const mole=document.querySelectorAll('.mole');
const timeLeft=document.querySelector('#time-left');
let score=document.querySelector('#score');
const pa=document.getElementById('p');


let result=0;
let currentTime = timeLeft.textContent;
let timeBeginning = timeLeft.textContent;


function randomSquare(){
  square.forEach(className => {
    className.classList.remove('mole');
  })
  let randomPosition = square[Math.floor( Math.random() * 9 )];
  randomPosition.classList.add('mole');
  //assign id of randomPosition to hitPosition to use later
  hitPosition = randomPosition.id;
}
square.forEach( id => {
  id.addEventListener('mouseup', () => {
    if(id.id === hitPosition){
      result = result + 1;
      score.textContent = result;
    }
  })
})

let timerId = null;
function moveMole(){
  timerId=setInterval(randomSquare,1000);
}
moveMole();

function countDown(){
  if(currentTime===0){
    clearInterval(timeId);
    clearInterval(timerId);
    document.getElementById("p").style.visibility = "visible";
    alert('Game Over! Your final score is '+result);
  }
    currentTime--;
    if(currentTime!=-1){
    timeLeft.textContent=currentTime;};
}

var timeId=null;
timeId=setInterval(countDown,1000);

pa.addEventListener('click',()=>{
result=0;
score.textContent="0";
currentTime = timeBeginning;
timeLeft.textContent = timeBeginning;
moveMole();
timeId=setInterval(countDown,1000);
});


})
