// PLATFORMER LIBRARY
"use strict";
// Declare Global Variables
let player1;
let game;

let GREY = 80;
let RED = "#bb2a27";
let GREEN = "#8cc542";
let BLUE = "#28a9e0";
let ORANGE = "#faaf3b";
let BROWN = "#aa6c39";

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(1920, 1080);

    // Initialize Global Variables
    initPlayer1();
    game.clearLevel();

    title();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    // LOGIC
    if (!game.pause && game.level != "complete" && game.level != "displayScores") {
        movePlayer1();
    }
    // DRAW
    background(GREEN);
    if (game.level != "complete" && game.level != "displayScores") {
        drawPlayer1();
    }
    if (game.level != "start" && !game.pause && game.level != "complete" && game.level != "displayScores") {
        game.logic();
    }
    if (game.level != "displayScores") {
        game.show();
    } else {
        game.displayScores();
    }

}

// EVENT FUNCTIONS
function keyPressed() {
    if (!game.pause) {
        jumpPlayer1();
        if (keyCode === 82) {
            respawn();
        }
        if (keyCode === 13) {
            debugTeleport();
        }
    }
}

function mousePressed() {
    if (mouseX > width - (player1.w * 2) && mouseX < (width - (player1.w * 2)) + (player1.w * 1.5)) {
        if (mouseY > player1.w * 0.5 && mouseY < player1.w * 2) {
            game.pause = !game.pause;
        }
    }
    if (game.level == "complete") {
        if (mouseX > width/3 && mouseX < width/3 +200) {
            if (mouseY > (height/3)*2 && mouseY < (height/3)*2 + 75) {
                if (typeof localStorage.scores != "string") {
                    localStorage.setItem("scores", "-1");
                }
                var scoreNum = parseInt(localStorage.scores) + 1;
                localStorage.scores = "" + scoreNum;
                localStorage.setItem("score" + scoreNum, "" + game.minutes + ":" + game.seconds + "." + game.timer);
                for (var i = 0; i < scoreNum + 1; i++) {
                    game.scores.push(localStorage.getItem("score" + i));
                }
                game.scores.sort();
                game.level = "displayScores";
            }
        }
    }
}
