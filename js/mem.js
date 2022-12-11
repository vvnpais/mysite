document.addEventListener('DOMContentLoaded',()=>{
  const cardArray=[
    {
      name:'1',
      img:'images/no1.jpg'
    },
    {
      name:'1',
      img:'images/no1.jpg'
    },
    {
      name:'2',
      img:'images/no2.jpg'
    },
    {
      name:'2',
      img:'images/no2.jpg'
    },
    {
      name:'3',
      img:'images/no3.jpg'
    },
    {
      name:'3',
      img:'images/no3.jpg'
    },
    {
      name:'4',
      img:'images/no4.jpg'
    },
    {
      name:'4',
      img:'images/no4.jpg'
    },
    {
      name:'5',
      img:'images/no5.jpg'
    },
    {
      name:'5',
      img:'images/no5.jpg'
    },
    {
      name:'6',
      img:'images/no6.jpg'
    },
    {
      name:'6',
      img:'images/no6.jpg'
    }
  ]

cardArray.sort(() => 0.5 - Math.random());

const grid=document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];


//create Board
function createBoard(){
  for(let i=0;i<cardArray.length;i++){
    var card=document.createElement('img');
    card.setAttribute('src','images/blank.jpg');
    card.setAttribute('data-id',i);
    card.addEventListener('click',flipCard);
    grid.appendChild(card);

  }
}

//check for match
function checkForMatch(){
  var cards=document.querySelectorAll('img');
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  if(cardsChosen[0]===cardsChosen[1]){
    window.alert('You found a match!');
    cards[optionOneId].setAttribute('src','images/white.jpg');
    cards[optionTwoId].setAttribute('src','images/white.jpg');
    cardsWon.push(cardsChosen[0]);
  }else{
    cards[optionOneId].setAttribute('src','images/blank.jpg');
    cards[optionTwoId].setAttribute('src','images/blank.jpg');
    window.alert('Sorry,try again');
  }
  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length;
  if(cardsWon.length===cardArray.length/2){
    resultDisplay.textContent = 'Congratulations! You found them all!';
  }
}

//flip card
function flipCard(){
  var cardId = this.getAttribute('data-id');
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute('src',cardArray[cardId].img);
  if(cardsChosen.length===2){
    setTimeout(checkForMatch,500);
  }
}

createBoard();


})
