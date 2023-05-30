const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let speed = 7
let tileCount = 20;       // zmienna do podzielenia ekranu czyli ekran ma 20 x 20
let tileSize = canvas.clientWidth / tileCount - 2;
let headX = tileCount / 2;           // srodek planszy w osi X
let headY = tileCount / 2;           // srodek planszy w osi Y

let verticalMove = 0    // pionowo
let horizontalMove = 0  // poziomo

let appleX = 5
let appleY = 5




class snakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

const snakeParts = [new snakePart(headX, headY + 1), new snakePart(headX, headY + 2)]




function drawGame() {

    changeSnakePos()

    if (isGameOver()) {
        endOfGame()
        return
    }
    
    clearScreen();
    generateSnake()
    generateApple()
    checkCollisionWithApple()
    refresh()
}

function refresh() {
    setTimeout(drawGame, 1000 / speed)
}

function clearScreen() {
    ctx.fillStyle = 'black'

    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

}

function generateSnake() {


    //glowa 
    ctx.fillStyle = 'yellow'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)



    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {

        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }






}


function changeSnakePos() {

    console.log(`Ruch w kierunku x=${horizontalMove}, y=${verticalMove}`);



    if (verticalMove != 0 || horizontalMove != 0) {


        for (let i = snakeParts.length - 1; i >= 0; i--) {


            if (i == 0) {
                snakeParts[0].y = headY
                snakeParts[0].x = headX
            }
            else {
                snakeParts[i].y = snakeParts[i - 1].y
                snakeParts[i].x = snakeParts[i - 1].x
            }

        }

        headY = headY + verticalMove
        headX = headX + horizontalMove
        console.log(`Glowa ${headX},${headY}`);

    }


}

function generateApple() {

    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}


function checkCollisionWithApple() {
    if (headX == appleX && headY == appleY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        addNewPartToSnake()
    }
}

function addNewPartToSnake() {
    let lastPart = snakeParts.length - 1
    snakeParts.push(new snakePart(snakeParts[lastPart].x, snakeParts[lastPart].y))
}



function isGameOver() {

    let gameOverStatus = false

    if (verticalMove == 0 && horizontalMove == 0) return gameOverStatus

    if (headX < 0) {

        gameOverStatus = true
    }


    if (headY < 0) {

        gameOverStatus = true
    }

    if (headX === tileCount) {

        gameOverStatus = true
    }

    if (headY === tileCount) {

        gameOverStatus = true
    }


    //zderzenie z samym soba 

    for (let i = 1; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (part.x == headX && part.y == headY) {
            console.log(part);
            gameOverStatus = true
            return gameOverStatus
        }
    }




    return gameOverStatus
}


function endOfGame() {
    ctx.font = "50px Arial";
    ctx.fillStyle = 'red'
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.clientWidth / 2, canvas.clientHeight / 2);

}




document.addEventListener('keydown', (e) => {

    if (e.key == 'ArrowUp') {


        if (verticalMove == 1) return
        verticalMove = -1
        horizontalMove = 0
    }

    else if (e.key == 'ArrowDown') {


        if (verticalMove == -1) return
        verticalMove = 1
        horizontalMove = 0
    }

    else if (e.key == 'ArrowLeft') {


        if (horizontalMove == 1) return
        verticalMove = 0
        horizontalMove = -1
    }
    else if (e.key == 'ArrowRight') {


        if (horizontalMove == -1) return
        verticalMove = 0
        horizontalMove = 1
    }

})



drawGame();