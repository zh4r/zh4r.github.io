const playTo = document.querySelector("#playto");

const p1Btn = document.querySelector("#p1Button");
const p2Btn = document.querySelector("#p2Button");
const resetBtn = document.querySelector("#reset");
const setResBtn = document.querySelector("#setRes");

const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const p1Cell = document.querySelector("#p1Cell");
const p2Cell = document.querySelector("#p2Cell");
let p1Set = 0;
let p2Set = 0;
let p1Score = 0;
let p2Score = 0;
let isGameOver = false; //colt - we use this to enable/disable the buttons

function plusOne(n) {
    if (!isGameOver) {
        if (n === 1 && p1Score < playTo.value) {
            p1Score++;
            p1Display.innerHTML = p1Score;
        } else if (n === 2 && p2Score < playTo.value) {
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
        p1Set++;
        p1Cell.innerHTML = p1Set;
    } else if (n === 2 && p2Score == playTo.value) {
        isGameOver = true;
        p1Display.style.color = 'red';
        p2Display.style.color = 'green';
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        p2Set++;
        p2Cell.innerHTML = p2Set;
    }
};

p1Btn.addEventListener('click', () => {
    plusOne(1);
    colorize(1);
});

p2Btn.addEventListener('click', () => {
    plusOne(2);
    colorize(2);
});

resetBtn.addEventListener('click', () => {
    p1Display.innerHTML = 0; p1Score = 0;
    p2Display.innerHTML = 0; p2Score = 0;
    p1Display.style.color = 'black';
    p2Display.style.color = 'black';
    isGameOver = false;
    p1Btn.disabled = false;
    p2Btn.disabled = false;
});

setResBtn.addEventListener('click', () => {
    p1Set = 0; p2Set = 0;
    p1Cell.innerHTML = p1Set;
    p2Cell.innerHTML = p2Set;
});
