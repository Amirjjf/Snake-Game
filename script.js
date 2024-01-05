const ROWS = 20;
const COLS = 20;

const BoxSize = 25;

let context;
let board;

let foodX;
let foodY;
let snakeX = 10 * BoxSize;
let snakeY = 10 * BoxSize;

let velocityX = 0;
let velocityY = 0;

let gameover = false;

let snakebody = [];


window.onload = function(){

    board = document.getElementById("Board");
    board.height = COLS * BoxSize;
    board.width = ROWS * BoxSize;

    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keydown" , changeDirection);

    setInterval(update, 1000/10);

}


function update() { 
    if (gameover){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX ,foodY, BoxSize, BoxSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakebody.push([foodX, foodY]);
        placeFood();
    }

    for(let i = snakebody.length - 1; i > 0; i--){
        snakebody[i] = snakebody[i-1];
    }

    if (snakebody.length > 0) {
        snakebody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle = "lime";
    snakeX += velocityX * BoxSize;
    snakeY += velocityY * BoxSize;

    context.fillRect(snakeX ,snakeY, BoxSize, BoxSize);

    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0], snakebody[i][1], BoxSize, BoxSize);
    }

    if (snakeX < 0 || snakeX >= ROWS * BoxSize || snakeY < 0 || snakeY >= COLS * BoxSize) {
        gameover = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            gameover = true;
            alert("Game Over");
        }
    }

}




function placeFood() {
    foodX = Math.floor(Math.random() * ROWS) * BoxSize;
    foodY = Math.floor(Math.random() * COLS) * BoxSize;
}


function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}