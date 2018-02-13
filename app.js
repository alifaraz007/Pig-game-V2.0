var activePlayer, roundScore, gameplaying, xNew, x, diceBefore;

var x = 50;

//initial
function initialStage(){
    activePlayer = 0;
    roundScore = 0;
    //make all initial value to 0
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    //hide dice at starting
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    //game playing
    gameplaying = true;
};


initialStage();


//twist
function twist(){    
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            document.getElementById("current-" + activePlayer).textContent = 0;
            (activePlayer == 0)? activePlayer=1: activePlayer=0;
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
            roundScore = 0;    
        };

//roll dice 
document.querySelector(".btn-roll").addEventListener('click',function(){
    if (gameplaying){
        //set random value of dice
        var dice1 = Math.floor(Math.random()*6 + 1);
        var dice2 = Math.floor(Math.random()*6 + 1);
        //display result
        var diceDOM1 = document.querySelector(".dice1");
        var diceDOM2 = document.querySelector(".dice2");
        diceDOM1.style.display =  "block";
        diceDOM2.style.display =  "block";
        diceDOM1.src = "dice-" + dice1 + ".png";
        diceDOM2.src = "dice-" + dice2 + ".png";
        //game condition
        if(dice1!==1 && dice2!==1){
            roundScore += (dice1 + dice2);
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else{
            twist();
        }  
    }
});

//hold value
document.querySelector(".btn-hold").addEventListener('click',function(){
    if (gameplaying){
          document.querySelector("#score-" + activePlayer).textContent = roundScore + Number(document.querySelector("#score-" + activePlayer).textContent);
        if(document.querySelector("#score-" + activePlayer).textContent < x){
            twist();   
        }else{
            //winner anouncement
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            xNew = Number(document.getElementById("score-" + activePlayer).textContent);
            //game stop
            gameplaying = false;
        }  
    }
    
});

//new game
document.querySelector(".btn-new").addEventListener('click',function(){
    
    //check if hold score is greater 50
    if(xNew > 50){
        //now new high score is bench mark to win
        x = xNew;
        initialStage();
    }else{
        initialStage();
    }
});