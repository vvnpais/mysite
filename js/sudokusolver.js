document.addEventListener('DOMContentLoaded',()=>{
    const s=document.querySelectorAll('.grid div');
    const gameButton=document.getElementById("game");
    const solverButton=document.getElementById("solver");
    const endButton=document.getElementById("endButton");
    gameButton.classList.add("selectedButton");
    
    let type="game";

    solverButton.addEventListener("click",()=>{
        type="solver";
        gameButton.classList.remove("selectedButton");
        solverButton.classList.add("selectedButton");
        endButton.textContent="Solve";
        // console.log(type);
    })
    gameButton.addEventListener("click",()=>{
        type="game";
        solverButton.classList.remove("selectedButton");
        gameButton.classList.add("selectedButton");
        endButton.textContent="Check";
        // console.log(type);
    })
    endButton.addEventListener("click",solveGame);
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

    function convert2DTo1D(x,y){
        return y*9+x;
    }

    function convert1DTo2D(index){
        let x=index%9;
        let y=Math.floor(index/9);
    }

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

let originalGame=Array(81).fill(0), n=Array(81).fill(0);
let order=null, game=null;
let add="add",remove="remove";
let clickIndex=null;

// other functions

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

    function halfComplete(){
        originalGame=[1, 2, 3, 4, 5, 6, 7, 8, 9, 
            4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 
            1, 2, 3, 4, 5, 6, 2, 3, 1, 5, 6, 4, 
            8, 9, 7, 5, 6, 4, 8, 9, 7, 2, 3, 1, 
            8, 9, 7, 2, 3, 1, 5, 6, 4, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    function createOrder(){
        order=[];
        for(let i=0;i<81;i++){if(originalGame[i]==0){order.push(i);}}
        order.sort( () => (Math.random()-0.5) );
        console.log(order);
    }

    function takeInput(i,e){
        if(inputs.includes(e.code)){
            update(i,parseInt(e.key),add);
            s[i].textContent=parseInt(e.key);
            originalGame[i]=parseInt(e.key);
        }
        else if(e.keyCode==8){
            update(i,parseInt(s[i].textContent),remove);
            s[i].textContent="";
            originalGame[i]=0;
        }
        createGame();
        console.log(originalGame);
        console.log(checkGridSafety());
    }

    function createGame(){
        game=originalGame.slice();
    }

    
    function update(index,number,op){
        let column=index%9;
        let row=Math.floor(index/9);
        let xCenterOfBlock=Math.floor(column/3)*3+1;
        let yCenterOfBlock=Math.floor(row/3)*3+1;
        if(op==add){
            for(let i=row*9;i<(row+1)*9;i++){n[i][number]=0;}
            for(let i=0;i<9;i++){n[i*9+column][number]=0;}
            for(let x=xCenterOfBlock-1;x<=xCenterOfBlock+1;x++){
                for(let y=yCenterOfBlock-1;y<=yCenterOfBlock+1;y++){n[convert2DTo1D(x,y)][number]=0;}
            }
        }
        else if(op==remove){
            for(let i=row*9;i<(row+1)*9;i++){n[i][number]=1;}
            for(let i=0;i<9;i++){n[i*9+column][number]=1;}
            for(let x=xCenterOfBlock-1;x<=xCenterOfBlock+1;x++){
                for(let y=yCenterOfBlock-1;y<=yCenterOfBlock+1;y++){n[convert2DTo1D(x,y)][number]=1;}
            }
        }
        // console.log(n);
    }
    
    function checkGridSafety(){
        for(let i=0;i<9;i++){
            let checkArrayRow=[];
            let checkArrayColumn=[];
            for(let j=0;j<9;j++){
                if(game[i*9+j]!=0){checkArrayRow.push(game[i*9+j]);}
                if(game[j*9+i]!=0){checkArrayColumn.push(game[j*9+i]);}
            }
            if(duplicateInArray(checkArrayRow) || duplicateInArray(checkArrayColumn)){return false;}
        }
        for(let a=1;a<8;a=a+3){
            for(let b=1;b<8;b=b+3){
                let checkArrayBlock=[];
                let xCenterOfBlock=a;
                let yCenterOfBlock=b;
                for(let x=xCenterOfBlock-1;x<=xCenterOfBlock+1;x++){
                    for(let y=yCenterOfBlock-1;y<=yCenterOfBlock+1;y++){
                        if(game[convert2DTo1D(x,y)]!=0){checkArrayBlock.push(game[convert2DTo1D(x,y)]);}
                    }
                }
                if(duplicateInArray(checkArrayBlock)){
                    // console.log("unsafe");
                    return false;
                }
            }
        } 
        return true;
    }
    
    function lastAddedNumberSafety(order,index){
        let column=order[index]%9;
        let row=Math.floor(order[index]/9);
        let xCenterOfBlock=Math.floor(column/3)*3+1;
        let yCenterOfBlock=Math.floor(row/3)*3+1;
        for(let i=row*9;i<(row+1)*9;i++){
            if(i==order[index]){continue;}
            else{
                if(game[i]==game[order[index]]){
                return false;
                }
            }
        }
        for(let i=0;i<9;i++){
            if((i*9+column)==order[index]){continue;}
            else{
                if(game[i*9+column]==game[order[index]]){
                    return false;
                }
            }
        }
        for(let x=xCenterOfBlock-1;x<=xCenterOfBlock+1;x++){
            for(let y=yCenterOfBlock-1;y<=yCenterOfBlock+1;y++){
                if((convert2DTo1D(x,y))==order[index]){continue;}
                else{
                    if(game[convert2DTo1D(x,y)]==game[order[index]]){
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    function gameComplete(){
        let filledBoxes=0;
        for(let i=0;i<81;i++){
            if(game[i]!=0 && game[i]>0 && game[i]<10){
                filledBoxes+=1;
            }
        }
        if(filledBoxes==81 && checkGridSafety()){
            return true;
        }
        return false;
    }
    
    function backtrack(order,n1,n2){
        let i=0;
        while(!gameComplete()){
            i+=1;
            if(i==20000000){
                createGame();
                createOrder();
                n1=0;
                n2=1;
                i=0;
            }
            if(n1>=order.length){console.log("Cannot be done"); console.log(checkGridSafety()); return false;}
            else{
                console.log(n1,n2);
                game[order[n1]]=n2;
                if(!lastAddedNumberSafety(order,n1)){
                    if(n2>8){
                        game[order[n1]]=0;
                        n1-=1; n2=game[order[n1]]+1;
                        while(n2>8){
                            game[order[n1]]=0;
                            n1-=1; n2=game[order[n1]]+1;
                        }
                    }
                    else{
                        game[order[n1]]=0;
                        n2+=1;
                    }
                }
                else{
                    n1+=1;
                    n2=1;
                }
            }
        }
        updateBoard();
        return true;
    }

    function solveGame(){
        // console.log(game);
        // interval=setInterval(()=>{
        //     cInterval=true;
        //     cInterval=false;
        //     if(gameComplete){clearInterval(interval);}
        //     for(let i=0;i<81;i++){
        //         s[i].textContent="";
        //     }
        //     backtrack(order,0,1);
        // },2000);
        // backtrack(order,0,1);
        halfComplete();
        createGame();
        createOrder();
        console.log(game);
        backtrack(order,0,1);
    }
    
    for(let i=0;i<81;i++){
         s[i].addEventListener('click',()=>{
             if(clickIndex!=null){s[clickIndex].classList.remove("yellow");}
             s[i].classList.add("yellow");
             clickIndex=i;
         })
     }
    
     document.addEventListener('keydown',(e)=>{takeInput(clickIndex,e)});
    
})