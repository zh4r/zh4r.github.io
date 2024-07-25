const user1 = document.querySelector("#user1");         //Username display
const user2 = document.querySelector("#user2");         //Username display

const gameSize = document.querySelector("#playto");       //Game Size Select
const p1Btn = document.querySelector("#p1Button");      //+1 Player1
const p2Btn = document.querySelector("#p2Button");      //+1 Player2
const gameResetBtn = document.querySelector("#reset");  //Game Score reset button
const matchResBtn = document.querySelector("#matchRes");//Match Score reset button

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


function penaltyScored(n) {
    switch (n) {
        case 1:
            p1PenPnt++;
            p1Pen.innerHTML = p1PenPnt;
            break;
        case 2:
            p2PenPnt++;
            p2Pen.innerHTML = p2PenPnt;
            break;
    }
};


function pointScored(n) {
    switch (n) {
        case 1:
            p1Score++;
            p1Display.innerHTML = p1Score;
            break;
        case 2:
            p2Score++;
            p2Display.innerHTML = p2Score;
            break;
    }
};


function matchPointScored(n) {
    switch (n) {
        case 1:
            p1Display.style.color = 'green';
            p2Display.style.color = 'red';
            p1Match++;
            p1Cell.innerHTML = p1Match;
            break;
        case 2:
            p1Display.style.color = 'red';
            p2Display.style.color = 'green';
            p2Match++;
            p2Cell.innerHTML = p2Match;
            break;
    }
};


function penaltiesMode() {
    h3.innerHTML = 'Penalties! <br> Playing until +2 difference!'
    p1Display.style.color = 'yellow';
    p2Display.style.color = 'yellow';
    p1Pen.hidden = false;
    p2Pen.hidden = false;
};


function plusOne(n) {
    let isPenalties = (p1Score === gameSize.value - 1) && (p2Score === gameSize.value - 1);
    let penaltiesOngoing = (Math.abs(p1PenPnt - p2PenPnt) < 2);
    let player1Won = p1Score == gameSize.value;
    let player2Won = p2Score == gameSize.value;
    let player1 = n === 1;
    let player2 = n === 2;

    if (!player1Won || !player2Won) {
        if (isPenalties) {
            if (player1 && penaltiesOngoing) {
                penaltyScored(n);
            } else if (player2 && penaltiesOngoing) {
                penaltyScored(n);
            }
        }
        else if (player1 && p1Score < gameSize.value) {
            pointScored(n);
        }
        else if (player2 && p2Score < gameSize.value) {
            pointScored(n);
        }
    }
};


function endGame(n) {
    let player1Won = p1Score == gameSize.value;
    let player2Won = p2Score == gameSize.value;

    if (player1Won || player2Won) {
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        h3.innerHTML = 'Game Score';
        if (n === 1 && player1Won) {
            matchPointScored(n);
        } else if (n === 2 && player2Won) {
            matchPointScored(n);
        }
    }
};


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
};


function matchReset() {
    p1Match = 0; p2Match = 0;
    p1Cell.innerHTML = p1Match;
    p2Cell.innerHTML = p2Match;
    reset();
};


function clearCustomSize() {
    gameSize.value = gameSize[0].value;
    try {
        gameSize[3].remove();
    } catch (error) {
        console.log("No custom sizes found.");
    }
};


function editName(n) {
    switch (n) {
        case 1:
            user1.innerHTML = prompt('Enter Your Name here!');
            p1Btn.innerHTML = `+1 ${user1.innerHTML}`;
            break;
        case 2:
            user2.innerHTML = prompt('Enter Your Name here!');
            p2Btn.innerHTML = `+1 ${user2.innerHTML}`;
            break;
    }
};


p1Btn.addEventListener('click', () => {
    plusOne(1);

    let isPenalties = (p1Score === gameSize.value - 1) && (p2Score === gameSize.value - 1);
    let twoDifference = (Math.abs(p1PenPnt - p2PenPnt) === 2)

    if (isPenalties) {
        penaltiesMode();
        if (twoDifference) {
            pointScored(1);
        }
    }
    endGame(1);
});


p2Btn.addEventListener('click', () => {
    plusOne(2);

    let isPenalties = (p1Score === gameSize.value - 1) && (p2Score === gameSize.value - 1);
    let twoDifference = (Math.abs(p1PenPnt - p2PenPnt) === 2)

    if (isPenalties) {
        penaltiesMode();
        if (twoDifference) {
            pointScored(2);
        }
    }
    endGame(2);
});


gameResetBtn.addEventListener('click', () => {
    reset();
});


matchResBtn.addEventListener('click', () => {
    matchReset();
    clearCustomSize();
});


gameSize.onchange = () => {
    matchReset();
};


user1.addEventListener('click', () => {
    editName(1);
});


user2.addEventListener('click', () => {
    editName(2);
});


gameSize.addEventListener('change', () => {
    if (gameSize.value === 'custom') {
        let newSize = prompt('Enter your Game Size');
        const newOpt = document.createElement("option");
        newOpt.value = newSize;
        newOpt.text = newSize;
        gameSize.add(newOpt, gameSize[3]);
        gameSize.value = newOpt.value;
    }
});