document.addEventListener('DOMContentLoaded',()=>{
  const squares = document.querySelectorAll('.grid div');
  const result = document.querySelector('#result');
  const displayCurrentPlayer = document.querySelector('#current-player');
  let currentPlayer=1;

for(var i=0, len=squares.length ; i<len ; i++){
(function(index){
  squares[i].onclick=function(){
    //if square below taken then can take it
    if(squares[index+7].classList.contains('taken')){
      if(currentPlayer===1){
        squares[index].classList.add('taken');
        squares[index].classList.add('player-one');
        //change Player
        currentPlayer=2;
        displayCurrentPlayer.innerHTML=currentPlayer;
      }else if(currentPlayer===2){
        squares[index].classList.add('taken');
        squares[index].classList.add('player-two');
        //change player
        currentPlayer=1;
        displayCurrentPlayer.innerHTML=currentPlayer;
      }
      //if square below is not taken then can't take
    }else{
      alert("can't go here");
    }
  }
})(i);
};

//check board for win or loss
function checkBoard(){
  //make constanty that shows all winning arrays
  const winningArrays=[
[0,1,2,3],
[1,2,3,4],
[2,3,4,5],
[3,4,5,6],
[7,8,9,10],
[8,9,10,11],
[9,10,11,12],
[10,11,12,13],
[14,15,16,17],
[15,16,17,18],
[16,17,18,19],
[17,18,19,20],
[21,22,23,24],
[22,23,24,25],
[23,24,25,26],
[24,25,26,27],
[28,29,30,31],
[29,30,31,32],
[30,31,32,33],
[31,32,33,34],
[35,36,37,38],
[36,37,38,39],
[37,38,39,40],
[38,39,40,41],
[0,7,14,21],
[7,14,21,28],
[14,21,28,35],
[1,8,15,22],
[8,15,22,29],
[15,22,29,36],
[2,9,16,23],
[9,16,23,30],
[16,23,30,37],
[3,10,17,24],
[10,17,24,31],
[17,24,31,38],
[4,11,18,25],
[11,18,25,32],
[18,25,32,39],
[5,12,19,26],
[12,19,26,33],
[19,26,33,40],
[6,13,20,27],
[13,20,27,34],
[20,27,34,41]
  ]
  //now take 4 values and checkBoard
  for(let y=0; y<winningArrays.length; y++){
    const square1=squares[winningArrays[y][0]];
    const square2=squares[winningArrays[y][1]];
    const square3=squares[winningArrays[y][2]];
    const square4=squares[winningArrays[y][3]];
    //check if these have class of playerone
    if(square1.classList.contains('player-one')&&
    square2.classList.contains('player-one')&&
    square3.classList.contains('player-one')&&
    square4.classList.contains('player-one')){
      //playerone wins
      result.innerHTML = 'player One Wins!';
    }
    else if(square1.classList.contains('player-two')&&
    square2.classList.contains('player-two')&&
    square3.classList.contains('player-two')&&
    square4.classList.contains('player-two')){
      //playertwo wins
      result.innerHTML = 'player Two Wins!';
    }
  }
}

//add event listener for all squares
squares.forEach(square => square.addEventListener('click',checkBoard));

})
