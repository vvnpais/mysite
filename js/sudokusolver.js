document.addEventListener('DOMContentLoaded',()=>{
    const s=document.querySelectorAll('.grid div');
    const gameButton=document.getElementById("gameButton");
    const solverButton=document.getElementById("solverButton");
    const endButton=document.getElementById("endButton");
    gameButton.classList.add("selectedButton");
    let clickIndex=null;
    let game=Array(81).fill(0);

    //move higlight through touchpad and click
    for(let i=0;i<81;i++){
        s[i].addEventListener('click',()=>{
            if(clickIndex!=null){s[clickIndex].classList.remove("yellow");}
            s[i].classList.add("yellow");
            clickIndex=i;
        })
    }
   
    //keyboard control
    document.addEventListener('keydown',(e)=>{takeInput(clickIndex,e)});
    
    let type="game";

    //solverButton
    solverButton.addEventListener("click",()=>{
        type="solver";
        gameButton.classList.remove("selectedButton");
        solverButton.classList.add("selectedButton");
        endButton.textContent="Solve";
        // console.log(type);
    })

    //gameButton
    gameButton.addEventListener("click",()=>{
        type="game";
        solverButton.classList.remove("selectedButton");
        gameButton.classList.add("selectedButton");
        endButton.textContent="Check";
        // console.log(type);
    })

    //endButton
    endButton.addEventListener("click",solveGame);
    
    //move highlight with keyboard
    document.addEventListener("keydown",(e)=>{moveHighlight(e)});

    const inputs=[
        "Digit1",
        "Digit2",
        "Digit3",
        "Digit4",
        "Digit5",
        "Digit6",
        "Digit7",
        "Digit8",
        "Digit9",
        "Numpad1",
        "Numpad2",
        "Numpad3",
        "Numpad4",
        "Numpad5",
        "Numpad6",
        "Numpad7",
        "Numpad8",
        "Numpad9",
    ]

// helper functions/////////////

    function duplicateInArray(arr){
        for(let i=0; i<arr.length; i++){
            if(arr.indexOf(arr[i])!==arr.lastIndexOf(arr[i])){
                return true;
            }
        }
        return false;
    }

    function clearBoard(){
        for(let i=0;i<81;i++){
            s[i].textContent="";
        }
    }

    function updateBoard(){
        for(let i=0;i<81;i++){
            s[i].textContent=game[i];
        }
    }


////////////////////////////////

    //function to move highlight through keyboard
    function moveHighlight(e){
        if(e.keyCode>36 && e.keyCode<41){
            if(clickIndex==null){
                clickIndex=0;
                s[clickIndex].classList.add("yellow");
            }else{
                s[clickIndex].classList.remove("yellow");
                if(e.keyCode==37){if(clickIndex%9!=0){clickIndex-=1;}}
                else if(e.keyCode==38){if(Math.floor(clickIndex/9)!=0){clickIndex-=9;}}
                else if(e.keyCode==39){if(clickIndex%9!=8){clickIndex+=1;}}
                else if(e.keyCode){if(Math.floor(clickIndex/9)!=8){clickIndex+=9;}}
                s[clickIndex].classList.add("yellow");
            }
        }
    }

    //function to check logic, fills half the board correctly
    function halfComplete(){
        game=[1, 2, 3, 4, 5, 6, 7, 8, 9, 
            4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 
            1, 2, 3, 4, 5, 6, 2, 3, 1, 5, 6, 4, 
            8, 9, 7, 5, 6, 4, 8, 9, 7, 2, 3, 1, 
            8, 9, 7, 2, 3, 1, 5, 6, 4, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    //creates array of index of empty cells and shuffles array
    function createOrder(){
        order=[];
        for(let i=0;i<81;i++){if(game[i]==0){order.push(i);}}
        order.sort( () => (Math.random()-0.5) );
        console.log(order);
    }

    //input from keyboard for game board
    function takeInput(i,e){
        if(inputs.includes(e.code)){
            s[i].textContent=Number(e.key);
            game[i]=Number(e.key);
        }
        else if(e.keyCode==8 || e.keyCode==48 || e.keyCode==32){
            s[i].textContent="";
            game[i]=0;
        }
        console.log(game);
    }

    //function to solve board
    function solveGame(){
        halfComplete();
        createOrder();
        console.log(game);
    }
    
})