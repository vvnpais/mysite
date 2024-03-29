document.addEventListener('DOMContentLoaded',()=>{
    const s=document.querySelectorAll('.grid div');
    const gameButton=document.getElementById("gameButton");
    const solverButton=document.getElementById("solverButton");
    const endButton=document.getElementById("endButton");
    const numpad=document.querySelectorAll('.numpad div');
    gameButton.classList.add("selectedButton");
    let clickIndex=null;
    let available=Array(81).fill(0);
    let game=Array(81).fill(0);
    let order=[];
    let randomisation=0.1;
    let timedUpdateInterval=null;
    let orderForDisplay=null;
    let notWrong=0;
    let maxCount=3;

    //move higlight through touchpad and click
    for(let i=0;i<81;i++){
        s[i].addEventListener('click',()=>{
            if(clickIndex!=null){s[clickIndex].classList.remove("yellow");}
            s[i].classList.add("yellow");
            clickIndex=i;
        })
    }
   
    //keyboard control
    document.addEventListener('keydown',(e)=>{
        takeInput(clickIndex,e);
    });

    for(let i=0;i<10;i++){
        numpad[i].addEventListener("click",()=>{takeInputFromNumpad(clickIndex,i);});
    }
    
    let type="game";

    //solverButton
    solverButton.addEventListener("click",()=>{
        type="solver";
        randomisation=0.1;
        gameButton.classList.remove("selectedButton");
        solverButton.classList.add("selectedButton");
        endButton.textContent="Solve";
        // console.log(type);
    })

    //gameButton
    gameButton.addEventListener("click",()=>{
        type="game";
        randomisation=0.5;
        solverButton.classList.remove("selectedButton");
        gameButton.classList.add("selectedButton");
        endButton.textContent="Check";
        // console.log(type);
    })

    //endButton
    endButton.addEventListener("click",()=>{if(notWrong==0){endButton.textContent="Solving";}; setTimeout(solveGame,10);});
    
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

    function toggleInputColor(i,n){
        if(n==0){s[i].classList.remove("darkgreen");}
        else if(n==1){s[i].classList.add("darkgreen");}
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

    function updateAvailable(index){
        let count=0;
        if(game[index]==0){
            let availableArray=Array(10).fill(1);
            for(let i=Math.floor(index/9)*9;i<Math.floor(index/9)*9+9;i++){
                availableArray[game[i]]=0;
            }
            for(let i=index%9;i<(index%9)+81;i=i+9){
                availableArray[game[i]]=0;
            }
            let x=Math.floor((index%9)/3)*3+1;
            let y=Math.floor(Math.floor(index/9)/3)*3+1;
            for( let i=x-1 ; i<x+2 ; i++ ){
                for( let j=y-1 ; j<y+2 ; j++ ){
                    availableArray[game[j*9+i]]=0;
                }
            }
            for(let i=1;i<10;i++){
                if(availableArray[i]==1){count+=1;}
            }
        }
        return count;
    }

    //creates array of index of empty cells and shuffles array
    function createOrder(){
        order=[];
        for(let i=0;i<81;i++){if(game[i]==0){order.push(i);}}
        order.sort( (a,b) => (updateAvailable(a)-updateAvailable(b)) );
        order.sort( ()=>{return Math.random() - randomisation ;} )
        console.log("order",order);
    }

    //input from numpad on screen
    function takeInputFromNumpad(i,e){
        if(e!=0){
            s[i].textContent=Number(e);
            game[i]=Number(e);
            toggleInputColor(i,1);
            // console.log(safe(clickIndex));
            // console.log(game);
            if(!safe(i)){notWrong=1; 
            endButton.textContent="Wrong Input. Refresh page to try again.";}
        }
        else{
            toggleInputColor(i,0);
            s[i].textContent="";
            game[i]=0;
        }
    }
    
    //input from keyboard for game board
    function takeInput(i,e){
        if(inputs.includes(e.code)){
            s[i].textContent=Number(e.key);
            game[i]=Number(e.key);
            toggleInputColor(i,1);
            if(!safe(i)){notWrong=1;
            endButton.textContent="Wrong Input. Refresh page to try again.";}
            // console.log(safe(clickIndex));
            // console.log(game);
        }
        else if(e.keyCode==8 || e.keyCode==48 || e.keyCode==32){
            toggleInputColor(i,0);
            s[i].textContent="";
            game[i]=0;
        }
    }

    function safe(index){
        for(let i=Math.floor(index/9)*9;i<Math.floor(index/9)*9+9;i++){
            if(game[i]==game[index] && (game[index]!=0) && i!=index){return false;}
        }
        for(let i=index%9;i<(index%9)+81;i=i+9){
            if(game[i]==game[index] && (game[index]!=0) && i!=index){return false;}
        }
        let x=Math.floor((index%9)/3)*3+1;
        let y=Math.floor(Math.floor(index/9)/3)*3+1;
        for( let i=x-1 ; i<x+2 ; i++ ){
            for( let j=y-1 ; j<y+2 ; j++ ){
                if(j*9+i==index){continue;}
                else{if(game[j*9+i]==game[index] && game[index]!=0){return false;}}
            }
        }
        return true;
    }

    //function to solve board
    function solveGame(){
        if(notWrong==1){return;}
        if(clickIndex!=null){s[clickIndex].classList.remove("yellow");clickIndex=null;}
        let timelimit=30;
        let count=0;
        let unsolvable=0;
        // halfComplete();
        let gameCopy=game.slice();
        createOrder();
        let ci=0;
        game[order[ci]]=1;
        let start=Date.now()
        let t=Date.now()
        while(game.includes(0) || !safe(order[order.length-1])){
            let nowt=Date.now();
            if(nowt-t>timelimit){
                console.log(maxCount);
                game=gameCopy.slice();
                createOrder();
                ci=0;
                game[order[ci]]=1;
                t=Date.now()
                count+=1;
                if(timelimit<200){
                    if(count>maxCount){
                        timelimit+=1;
                        if(timelimit==50 || timelimit==70){maxCount-=1;}  
                        count=0;
                    }
                }
                else if(timelimit==200){unsolvable=1; break;}
                // if(randomisation<0.49){randomisation+=0.01;}
            }
            if(!safe(order[ci])){
                while(game[order[ci]]==9){
                    game[order[ci]]=0;
                    ci-=1;
                }
                game[order[ci]]+=1;
            }
            else{ci+=1; game[order[ci]]=1;}
        }
        if(unsolvable==1){endButton.textContent="Unsolvable"; return;}
        let end=Date.now()
        console.log("Time: "+(end*1000000-t*1000000)/1000000000+"seconds");
        console.log("Time: "+(end*1000000-start*1000000)/1000000000+"seconds");
        let fill=0;
        orderForDisplay=order.slice();
        orderForDisplay.sort(()=>{return Math.random()-0.5;});
        timedUpdateInterval=setInterval(()=>{
            if(fill>=order.length){clearInterval(timedUpdateInterval);}
            if(fill<order.length){s[orderForDisplay[fill]].textContent=game[orderForDisplay[fill]]};
            if(fill+1<order.length){s[orderForDisplay[fill+1]].textContent=game[orderForDisplay[fill+1]]};
            if(fill+2<order.length){s[orderForDisplay[fill+2]].textContent=game[orderForDisplay[fill+2]]};
            fill+=3;}
        ,25);

        endButton.textContent="Solved";
        // console.log(game);
    }
    
})