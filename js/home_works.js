//HOME WORK 1 (PART1)

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailSpan = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;

gmailButton.addEventListener("click", () => {
    if (regExp.test(gmailInput.value)) {
        gmailSpan.innerHTML = "YOU ARE SUBSCRIBED";
        gmailSpan.style.color = "green";
    }else {
        gmailSpan.innerHTML = "CREATE THE CORRECT GMAIL";
        gmailSpan.style.color = "red";
    }
})


// HOME WORK 1 (PART2)

const childBlock = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;

const moveChildBlock = () => {
    if (positionX < 843 && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX >= 843 && positionY < 546) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
    } else if (positionY >= 448 && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
    }
    setTimeout(moveChildBlock, 5);
};
moveChildBlock();

// HOME WORK 2

const seconds = document.getElementById('secondsS');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

start.addEventListener('click', startCounter);
stop.addEventListener('click', stopCounter);
reset.addEventListener('click', resetCounter);

let counterValue = 0;
let intervalId;
function updateCounter() {
    seconds.textContent = counterValue;
    counterValue++;
}

function startCounter() {
    intervalId = setInterval(updateCounter, 1000);
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = false;
}

function stopCounter() {
    clearInterval(intervalId);
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
}

function resetCounter() {
    clearInterval(intervalId);
    counterValue = 0;
    seconds.textContent = counterValue;
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
}