let canvasHeight = document.documentElement.clientHeight;
let canvasWidth = canvasHeight / 1.5;

if (document.documentElement.clientHeight > document.documentElement.clientWidth)
    canvasWidth = document.documentElement.clientWidth;

let balls = [];
let player;
let dragged = false;
let ended;
let turn = 0;
let obstacles = [];
let colsNum = 8;
let spacing = canvasWidth / (colsNum * 15);
let obstWidth = (canvasWidth - (colsNum + 1) * spacing) / colsNum;
let ballRadius = obstWidth / 10;
let restartBtn;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    init();
}



function draw() {
    if (ended) return;
    background(0);

    obstacles.forEach(ob => {
        ob.draw()
        if (ob.didReachEnd()) {
            ended = true;
            background(0);
            endGame();
            renderRestart();
            return;
        }
    })
    player.draw();

    if (player.canThrow()) {
        if (dragged)
            player.drawTrace();
    }
    else
        player.throw(obstacles);
}

function mouseDragged() {
    dragged = true;
}

function mouseReleased() {
    dragged = false;
    if (player.canThrow()) {
        turn++;
        player.setBalls();
    }
}

function endGame() {
    obstacles.forEach(ob => ob.removeDom());
    obstacles = [];
}


function renderRestart() {
    if (restartBtn)
        restartBtn.show();
    else {
        restartBtn = createButton("Restart");
        restartBtn.addClass('restart');
    }
    restartBtn.mouseClicked(init);
}

function init() {
    if (restartBtn) restartBtn.hide();
    ended = false;
    turn = 1;

    player = new Player(canvasWidth / 2, canvasHeight - ballRadius, ballRadius)

    for (let i = 0; i < colsNum * 1; i++)
        if (Math.random() < 0.5)
            obstacles.push(new Obstacle(
                spacing + obstWidth * (i % colsNum) + spacing * (i % colsNum),
                obstWidth * floor(i / colsNum) + spacing * floor(i / colsNum),
                obstWidth,
                floor(random(1, 2)),
                floor(random(1, 256)),
                floor(random(1, 256)),
                floor(random(1, 256))));
}