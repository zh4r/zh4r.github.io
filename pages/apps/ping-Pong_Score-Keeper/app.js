const user1 = document.querySelector("#user1");
const user2 = document.querySelector("#user2");

const playTo = document.querySelector("#playto");

const p1Btn = document.querySelector("#p1Button");
const p2Btn = document.querySelector("#p2Button");
const gameResetBtn = document.querySelector("#reset");
const matchResBtn = document.querySelector("#matchRes");

const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const p1Pen = document.querySelector("#p1Pen")
const p2Pen = document.querySelector("#p2Pen")
const p1Cell = document.querySelector("#p1Cell");
const p2Cell = document.querySelector("#p2Cell");

const h3 = document.querySelector("h3")
let p1Match = 0;
let p2Match = 0;
let p1Score = 0;
let p2Score = 0;
let p1PenPnt = 0;
let p2PenPnt = 0;
let isGameOver = false; //colt - we use this to enable/disable the buttons

user1.addEventListener('click', () => {
    user1.innerHTML = prompt('Enter Your Name here!');
    p1Btn.innerHTML = `+1 ${user1.innerHTML}`;
});
user2.addEventListener('click', () => {
    user2.innerHTML = prompt('Enter Your Name here!');
    p2Btn.innerHTML = `+1 ${user2.innerHTML}`;
});

function penalties() {
    h3.innerHTML = 'Penalties! <br> Playing until +2 difference!'
    p1Display.style.color = 'yellow';
    p2Display.style.color = 'yellow';
    p1Pen.hidden = false;
    p2Pen.hidden = false;
}

function plusOne(n) {
    if (!isGameOver) {
        if ((p1Score === playTo.value - 1) && (p2Score === playTo.value - 1) && n === 1) {
            if (Math.abs(p1PenPnt - p2PenPnt) < 2) {
                p1PenPnt++;
                p1Pen.innerHTML = p1PenPnt;
            } 
        } 
        else if ((p1Score === playTo.value - 1) && (p2Score === playTo.value - 1) && n === 2) {
            if (Math.abs(p2PenPnt - p1PenPnt) < 2) {
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



function colorize(n) {
    if (n === 1 && p1Score == playTo.value) {
        isGameOver = true;
        p1Display.style.color = 'green';
        p2Display.style.color = 'red';
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        p1Match++;
        p1Cell.innerHTML = p1Match;
    } else if (n === 2 && p2Score == playTo.value) {
        isGameOver = true;
        p1Display.style.color = 'red';
        p2Display.style.color = 'green';
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        p2Match++;
        p2Cell.innerHTML = p2Match;
    }
};

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

gameResetBtn.addEventListener('click', () => {
    p1Display.innerHTML = 0; p1Score = 0;
    p2Display.innerHTML = 0; p2Score = 0;
    p1Display.style.color = 'black';
    p2Display.style.color = 'black';
    isGameOver = false;
    p1Btn.disabled = false;
    p2Btn.disabled = false;
    p1PenPnt = 0;
    p2PenPnt = 0;
    p1Pen.innerHTML = 0;
    p2Pen.innerHTML = 0;
    p1Pen.hidden = true;
    p2Pen.hidden = true;
});

matchResBtn.addEventListener('click', () => {
    p1Match = 0; p2Match = 0;
    p1Display.innerHTML = 0; p1Score = 0;
    p2Display.innerHTML = 0; p2Score = 0;
    p1Cell.innerHTML = p1Match;
    p2Cell.innerHTML = p2Match;
    p1Btn.disabled = false;
    p2Btn.disabled = false;
    p1Pen.innerHTML = 0;
    p2Pen.innerHTML = 0;
    p1Pen.hidden = true;
    p2Pen.hidden = true;
    p1Display.style.color = 'black';
    p2Display.style.color = 'black';
});


//make reset() for shorter codebase
//make penalties work. 