const gameBoard = document.querySelector("#gameBoard"); //canvas
const context = gameBoard.getContext("2d"); //to paint on the canvas
const scoreText = document.querySelector("#scoreText"); //store our score
const resetButton = document.querySelector("#resetButton"); // reset our button
const gameWidth = gameBoard.width; // control the board width
const gameHeight = gameBoard.height;
const boardBackground = "lightyellow";
const snakeColor = "blue";
const snakeBorder = "black";
const foodColor = "red"; //apple
const unitSize =25; //pixels size in game

let running = false;
let xVelocity = unitSize; // moving 25px in x-axis when game tick (if xVelocity is + we move right else -ve we move left)
let yVelocity =0;
let foodX;
let foodY;
let score =0;

let snake =[ //body parts
    {x:unitSize *4, y:0},
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0} //tail 0,0 is the top left corner
];

window.addEventListener('keydown',changeDirection); //to listen for key events
resetButton.addEventListener("click",resetGame); //click to reset game

gameStart();


//fucntions to work the game from start to end

function gameStart(){
    running=true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};


function nextTick(){
    if(running){
      setTimeout(()=>{
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
       },75 )//speed of game tick to occur
    }
    else{
        displayGameOver();
    }

};


function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0,0,gameWidth,gameHeight);
};

function createFood(){
    function randomFood(min,max){
        const randNum = Math.round((Math.random() * (max-min) + min)/unitSize) * unitSize;
        return randNum;
    }

    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};

function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX,foodY,unitSize,unitSize);
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    //if food was eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }          
};


function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        context.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
    })
};


function changeDirection(event){
    const keyPressed = event.keyCode;

    const Left =37;
    const Up = 38;
    const Right = 39;
    const Down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch(true){
        case(keyPressed == Left  && !goingRight):
              xVelocity = -unitSize;
              yVelocity =0;
              break;
        case(keyPressed == Up  && !goingDown):
              xVelocity = 0;
              yVelocity =-unitSize;
              break;      
        case(keyPressed == Right  && !goingLeft):
              xVelocity = unitSize;
              yVelocity = 0;
              break; 
        case(keyPressed == Down  && !goingUp):
              xVelocity = 0;
              yVelocity = unitSize;
              break;     
    }
};


function checkGameOver(){
    switch(true){
        case(snake[0].x <0):
           running =false;
           break;
        case(snake[0].x >=gameWidth):
           running =false;
           break;
        case(snake[0].y <0):
           running =false;
           break;
        case(snake[0].y >=gameHeight):
           running =false;
           break;
    }

    for(let i =1; i<snake.length;i+=1){
        if(snake[i].x == snake[0].x  && snake[i].y == snake[0].y ){
            running = false;
        }
    }
};


function displayGameOver(){
    context.font = "50px MV Boli";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER ", gameWidth/2, gameHeight/2);
    running =false;
};


function resetGame(){
    score =0;
    xVelocity = unitSize;
    yVelocity =0;

    snake =[ 
        {x:unitSize *4, y:0},
        {x:unitSize *3, y:0},
        {x:unitSize *2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0} 
    ];
    gameStart();
};




