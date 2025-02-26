// Board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg, dinoDuck1Img, dinoDuck2Img, dinoRunImg1, dinoRunImg2, dinoJumpImg, dinoDeadImg;
let dinoAnimationCounter = 0;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
    isCrouching: false
};

// Cactus
let cactusArray = [];
let cactus1Width = 34, cactus2Width = 69, cactus3Width = 102;
let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;
let cactus1Img, cactus2Img, cactus3Img;

// Bird
let birdArray = [];
let birdWidth = 92;
let birdHeight = 80;
let birdX = boardWidth;
let birdLowY = boardHeight - 120;
let birdImg1, birdImg2;
let birdAnimationCounter = 0;

// Physics
let velocityX = -8; 
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let score = 0;

// Ground line
let groundY = boardHeight - 1; 

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Load images
    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    
    dinoDuck1Img = new Image();
    dinoDuck1Img.src = "./img/dino-duck1.png";
    
    dinoDuck2Img = new Image();
    dinoDuck2Img.src = "./img/dino-duck2.png";
    
    dinoRunImg1 = new Image();
    dinoRunImg1.src = "./img/dino-run1.png";
    
    dinoRunImg2 = new Image();
    dinoRunImg2.src = "./img/dino-run2.png";
    
    dinoJumpImg = new Image();
    dinoJumpImg.src = "./img/dino-jump.png";
    
    dinoDeadImg = new Image();
    dinoDeadImg.src = "./img/dino-dead.png";

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    birdImg1 = new Image();
    birdImg1.src = "./img/bird1.png";
    
    birdImg2 = new Image();
    birdImg2.src = "./img/bird2.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1500);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    // Draw ground
    context.beginPath();
    context.moveTo(0, groundY);
    context.lineTo(boardWidth, groundY);
    context.stroke();

    // Dino animation
    dinoAnimationCounter++;

    // Apply gravity
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);

    // Dino image selection
    if (dino.isCrouching && dino.y == dinoY) {
        dino.height = dinoHeight / 2;
        dino.y = dinoY + dinoHeight / 2;
        let duckImg = (dinoAnimationCounter % 10 < 5) ? dinoDuck1Img : dinoDuck2Img;
        context.drawImage(duckImg, dino.x, dino.y, dino.width, dino.height);
    } 
    else if (dino.y < dinoY) {
        dino.height = dinoHeight;
        context.drawImage(dinoJumpImg, dino.x, dino.y, dino.width, dino.height);
    } 
    else {
        dino.height = dinoHeight;
        let runImg = (dinoAnimationCounter % 10 < 5) ? dinoRunImg1 : dinoRunImg2;
        context.drawImage(runImg, dino.x, dino.y, dino.width, dino.height);
    }

    // Cactus
    for (let cactus of cactusArray) {
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        if (detectCollision(dino, cactus)) {
            gameOver = true;
            context.drawImage(dinoDeadImg, dino.x, dino.y, dino.width, dino.height);
        }
    }

    // Birds
    birdAnimationCounter++;
    for (let bird of birdArray) {
        bird.x += velocityX;
        let birdImg = (birdAnimationCounter % 15 < 8) ? birdImg1 : birdImg2;
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        if (detectCollision(dino, bird)) {
            gameOver = true;
            context.drawImage(dinoDeadImg, dino.x, dino.y, dino.width, dino.height);
        }
    }

    cleanUpObstacles();
    
    // Score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
    
    if (score % 500 == 0) velocityX -= 0.5;
}

function handleKeyDown(e) {
    if (gameOver) return;
    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY && !dino.isCrouching) {
        velocityY = -10;
        dino.isCrouching = false;
    } 
    else if (e.code == "ArrowDown") {
        dino.isCrouching = true;
        if (dino.y < dinoY) velocityY += 5;
    }
}

function handleKeyUp(e) {
    if (e.code == "ArrowDown") dino.isCrouching = false;
}

function placeObstacle() {
    if (gameOver) return;
    Math.random() > 0.7 ? placeBird() : placeCactus();
}

function placeCactus() {
    let cactus = { img: null, x: cactusX, y: cactusY, width: null, height: cactusHeight };
    let typeChance = Math.random();
    if (typeChance > 0.85) { cactus.img = cactus3Img; cactus.width = cactus3Width; }
    else if (typeChance > 0.60) { cactus.img = cactus2Img; cactus.width = cactus2Width; }
    else { cactus.img = cactus1Img; cactus.width = cactus1Width; }
    cactusArray.push(cactus);
}

function placeBird() {
    birdArray.push({ x: birdX, y: birdLowY, width: birdWidth, height: birdHeight });
}

function cleanUpObstacles() {
    if (cactusArray.length && cactusArray[0].x < -cactusArray[0].width) cactusArray.shift();
    if (birdArray.length && birdArray[0].x < -birdWidth) birdArray.shift();
}

function detectCollision(dino, obstacle) {
    // Define precise hitbox for dino
    let dinoHitbox = {
        x: dino.x + 10,  // Reduce margin
        y: dino.isCrouching ? dino.y + dino.height / 2 : dino.y,
        width: dino.width - 20,  // Reduce width for better accuracy
        height: dino.isCrouching ? dino.height / 2 : dino.height
    };

    // Define precise hitbox for obstacle
    let obstacleHitbox = {
        x: obstacle.x,
        y: obstacle.y,
        width: obstacle.width,
        height: obstacle.height
    };

    // Check collision
    return (
        dinoHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
        dinoHitbox.x + dinoHitbox.width > obstacleHitbox.x &&
        dinoHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
        dinoHitbox.y + dinoHitbox.height > obstacleHitbox.y
    );
}

