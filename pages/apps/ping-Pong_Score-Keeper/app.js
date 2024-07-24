//Constants
//UserNames:
const user1 = document.querySelector("#user1");         //Username display
const user2 = document.querySelector("#user2");         //Username display
//Select & Buttons:
const playTo = document.querySelector("#playto");       //Game Size Select
const p1Btn = document.querySelector("#p1Button");      //+1 Player1
const p2Btn = document.querySelector("#p2Button");      //+1 Player2
const gameResetBtn = document.querySelector("#reset");  //Game Score reset button
const matchResBtn = document.querySelector("#matchRes");//Match Score reset button
//Score Displays:
const h3 = document.querySelector("h3")                 //Score heading
const p1Display = document.querySelector("#p1Display"); //Game Score
const p2Display = document.querySelector("#p2Display"); //Game Score
const p1Pen = document.querySelector("#p1Pen")          //Penalty Score
const p2Pen = document.querySelector("#p2Pen")          //Penalty Score
const p1Cell = document.querySelector("#p1Cell");       //Match Score
const p2Cell = document.querySelector("#p2Cell");       //Match Score
let p1Match = 0;    //Player1 Match point
let p2Match = 0;    //Player2 Match point
let p1Score = 0;    //Player1 Game point
let p2Score = 0;    //Player2 Game point
let p1PenPnt = 0;   //Player1 Penalty point
let p2PenPnt = 0;   //Player1 Penalty point
//FuncReq
let isGameOver = false;


//+1 function
function plusOne(n) {
    if (!isGameOver) {
        if ((p1Score === playTo.value - 1) && (p2Score === playTo.value - 1)) {
            if (n === 1 && (Math.abs(p1PenPnt - p2PenPnt) < 2)) {
                p1PenPnt++;
                p1Pen.innerHTML = p1PenPnt;
            } else if (n === 2 && (Math.abs(p2PenPnt - p1PenPnt) < 2)) {
                p2PenPnt++;
                p2Pen.innerHTML = p2PenPnt;
            }
        }
        else if (n === 1 && p1Score < playTo.value) {
            p1Score++;
            p1Display.innerHTML = p1Score;
        }
        else if (n === 2 && p2Score < playTo.value) {
            p2Score++;
            p2Display.innerHTML = p2Score;
        }
    }
};


//Penalties display
function penalties() {
    h3.innerHTML = 'Penalties! <br> Playing until +2 difference!'
    p1Display.style.color = 'yellow';
    p2Display.style.color = 'yellow';
    p1Pen.hidden = false;
    p2Pen.hidden = false;
}


//End of game
function colorize(n) {
    if (p1Score == playTo.value || p2Score == playTo.value) {
        isGameOver = true;
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        h3.innerHTML = 'Game Score';
        if (n === 1 && p1Score == playTo.value) {
            p1Display.style.color = 'green';
            p2Display.style.color = 'red';
            p1Match++;
            p1Cell.innerHTML = p1Match;
        } else if (n === 2 && p2Score == playTo.value) {
            p1Display.style.color = 'red';
            p2Display.style.color = 'green';
            p2Match++;
            p2Cell.innerHTML = p2Match;
        }
    }
};


//Clear function
function reset() {
    p1Display.innerHTML = 0; p1Score = 0;
    p2Display.innerHTML = 0; p2Score = 0;
    p1PenPnt = 0; p2PenPnt = 0;

    p1Display.style.color = 'black';
    p2Display.style.color = 'black';
    h3.innerHTML = 'Game Score';

    p1Btn.disabled = false;
    p2Btn.disabled = false;
    p1Pen.hidden = true;
    p2Pen.hidden = true;

    p1Pen.innerHTML = 0;
    p2Pen.innerHTML = 0;
    isGameOver = false;
}


//+1 Player1 click event
p1Btn.addEventListener('click', () => {
    plusOne(1);
    if ((p1Score === playTo.value - 1) && (p2Score === playTo.value - 1)) {
        penalties();
        if (Math.abs(p1PenPnt - p2PenPnt) === 2) {
            p1Score++;
            p1Display.innerHTML = p1Score;
        }
    }
    colorize(1);
});


//+1 Player2 click event
p2Btn.addEventListener('click', () => {
    plusOne(2);
    if ((p1Score === playTo.value - 1) && (p2Score === playTo.value - 1)) {
        penalties();
        if (Math.abs(p1PenPnt - p2PenPnt) === 2) {
            p2Score++;
            p2Display.innerHTML = p2Score;
        }
    }
    colorize(2);
});


//Game Reset Click Event
gameResetBtn.addEventListener('click', () => {
    reset();
});


//Match Reset Click Event
matchResBtn.addEventListener('click', () => {
    p1Match = 0; p2Match = 0;
    p1Cell.innerHTML = p1Match;
    p2Cell.innerHTML = p2Match;
    playTo.value = playTo[0].value;
    try{
        playTo[3].remove();
    } catch (error) {
        console.log("No custom sizes found.");
    }
    reset();
});


//Reset all counters when the game size is changed
playTo.onchange = () => {
    p1Match = 0; p2Match = 0;
    p1Cell.innerHTML = p1Match;
    p2Cell.innerHTML = p2Match;
    reset();
};


//Usernames Click Events
user1.addEventListener('click', () => {
    user1.innerHTML = prompt('Enter Your Name here!');
    p1Btn.innerHTML = `+1 ${user1.innerHTML}`;
});

user2.addEventListener('click', () => {
    user2.innerHTML = prompt('Enter Your Name here!');
    p2Btn.innerHTML = `+1 ${user2.innerHTML}`;
});


//Custom game size function
playTo.addEventListener('change', () => {
    if (playTo.value === 'custom') {
        let newSize = prompt('Enter your Game Size');
        const newOpt = document.createElement("option");
        newOpt.value = newSize;
        newOpt.text = newSize;
        playTo.add(newOpt, playTo[3]);
        playTo.value = newOpt.value;
    }
});