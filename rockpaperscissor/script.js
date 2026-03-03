const choices = document.querySelectorAll(".choices li");
const updatePlayer = document.querySelector('#playerScore');
const updateComp = document.querySelector('#computerScore');
const restart = document.querySelector('#restart');
const winStatus = document.querySelector('.status');

let userScore = 0;
let compScore = 0;

function computerchoice(){
    let options = ["rock","paper","scissor"];
    let random_pick = Math.floor(Math.random()*3);
    return options[random_pick];
}

choices.forEach((val)=>{
    val.addEventListener('click',(evt)=>{
        const userChoice = val.id;
        console.log(userChoice);
        decideWinner(userChoice); 
    });
});

function decideWinner(userChoice){
    winStatus.classList.remove("draw","win","lose");
    winStatus.classList.add("show");
    let computerPick = computerchoice();
    
    if (computerPick === userChoice){
        winStatus.textContent = "DRAW";
        winStatus.classList.add("draw");
    }
    else if(
        (computerPick === "rock" && userChoice === "scissor") ||
        (computerPick === "paper" && userChoice === "rock") ||
        (computerPick === "scissor" && userChoice === "paper")
    ){
        compScore += 1;
        winStatus.textContent = "COMPUTER WON YOU LOST";
        winStatus.classList.add("lose");
        updateComp.textContent = compScore;
    }
    else{
        userScore += 1;
        winStatus.textContent = "YOU WON COMPUTER LOST";
        winStatus.classList.add("win");
        updatePlayer.textContent = userScore;
    }
}

restart.addEventListener('click',()=>{
    userScore = compScore = 0;
    updatePlayer.textContent = userScore;
    updateComp.textContent = compScore;
    winStatus.classList.remove('show');
    winStatus.textContent = "";
});