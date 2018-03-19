class platform {
    constructor(x, y, w, h, col, topCol) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.topCol = topCol;
    }

    show() {
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.w, this.h);
        fill(this.topCol);
        rect(this.x, this.y - 4, this.w, 4);
    }
}

class spike {
    constructor(x, y, w, r, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.r = r;
        this.col = col;
    }

    show() {
        noStroke();
        fill(this.col);
        if (this.r == 1 || this.r == 3) {
            for (var x1 = this.x; x1 < ((this.w * 40) + this.x); x1 += 40) {
                if (this.r == 1) {
                    triangle(x1, this.y, x1 + 40, this.y, x1 + 20, this.y - 40);
                } else if (this.r == 3) {
                    triangle(x1, this.y, x1 + 40, this.y, x1 + 20, this.y + 40);
                }
            }
        } else if (this.r == 2 || this.r == 4) {
            for (var y1 = this.y; y1 < ((this.w * 40) + this.y); y1 += 40) {
                if (this.r == 2) {
                    triangle(this.x, y1, this.x + 40, y1 + 20, this.x, y1 + 40);
                } else if (this.r == 4) {
                    triangle(this.x, y1, this.x - 40, y1 + 20, this.x, y1 + 40);
                }
            }
        }
    }
}

class moveable {
    constructor(xSpeed, ySpeed, w, h, type, i, runOnce) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.type = type;
        this.index = i;
        this.runOnce = runOnce;
        if (this.type == "platforms") {
            this.w = game.platforms[this.index].x + w;
            this.h = game.platforms[this.index].y + h;
            this.homeX = game.platforms[this.index].x;
            this.homeY = game.platforms[this.index].y;
        } else if (this.type == "spikes") {
            this.w = game.spikes[this.index].x + w;
            this.h = game.spikes[this.index].y + h;
            this.homeX = game.spikes[this.index].x;
            this.homeY = game.spikes[this.index].y;
        }
    }

    logic() {
        if (this.type == "platforms") {
            if (this.w > this.homeX) {
                if (game.platforms[this.index].x > this.w || game.platforms[this.index].x < this.homeX) {
                    this.xSpeed *= -1;
                }
            } else if (this.w < this.homeX) {
                if (game.platforms[this.index].x > this.homeX || game.platforms[this.index].x < this.w) {
                    this.xSpeed *= -1;
                }
            }

            if (this.h > this.homeY) {
                if (game.platforms[this.index].y > this.h || game.platforms[this.index].y < this.homeY) {
                    this.ySpeed *= -1;
                }
            } else if (this.h < this.homeY) {
                if (game.platforms[this.index].y > this.homeY || game.platforms[this.index].y < this.h) {
                    this.ySpeed *= -1;
                }
            }
            game.platforms[this.index].x += this.xSpeed;
            game.platforms[this.index].y += this.ySpeed;
            if (this.runOnce) {
                if (game.platforms[this.index].x == this.homeX && game.platforms[this.index].y == this.homeY) {
                    this.xSpeed = 0;
                    this.ySpeed = 0;
                }
            }
        } else if (this.type == "spikes") {
            if (this.w > this.homeX) {
                if (game.spikes[this.index].x > this.w || game.spikes[this.index].x < this.homeX) {
                    this.xSpeed *= -1;
                }
            } else if (this.w < this.homeX) {
                if (game.spikes[this.index].x > this.homeX || game.spikes[this.index].x < this.w) {
                    this.xSpeed *= -1;
                }
            }

            if (this.h > this.homeY) {
                if (game.spikes[this.index].y > this.h || game.spikes[this.index].y < this.homeY) {
                    this.ySpeed *= -1;
                }
            } else if (this.h < this.homeY) {
                if (game.spikes[this.index].y > this.homeY || game.spikes[this.index].y < this.h) {
                    this.ySpeed *= -1;
                }
            }
            game.spikes[this.index].x += this.xSpeed;
            game.spikes[this.index].y += this.ySpeed;
            if (this.runOnce) {
                if (game.spikes[this.index].x == this.homeX && game.spikes[this.index].y == this.homeY) {
                    this.xSpeed = 0;
                    this.ySpeed = 0;
                }
            }
        }
    }
}

class arrow {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(255);
        strokeWeight(3);
        line(this.x, this.y, this.x - 10, this.y - 5);
        line(this.x, this.y, this.x - 10, this.y + 5);
        line(this.x, this.y, this.x - 20, this.y);
    }
}

class trigger {
    constructor(x, y, w, h, func) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.func = func;
    }

    logic() {
        if (player1.x + player1.w > this.x && player1.x < this.x + this.w) {
            if (player1.y + player1.h > this.y && player1.y < this.y + this.h) {
                this.func();
            }
        }
    }
}

class key {
    constructor(x, y, doorX, doorY, w, h, index, col, doorCol) {
        this.x = x;
        this.y = y;
        this.doorX = doorX;
        this.doorY = doorY;
        this.w = w;
        this.h = h;
        this.index = index;
        this.col = col;
        this.doorCol = doorCol;
    }

    logic() {
        if (player1.x + player1.w > this.x && player1.x < this.x + 15) {
            if (player1.y + player1.h > this.y && player1.y < this.y + 15) {
                game.keys.splice(this.index, 1);
            }
        }
        if (player1.x + player1.w > this.doorX && player1.x < this.doorX + this.w) {
            if (player1.y + player1.h >= this.doorY - 1 && player1.y <= this.doorY + this.h - 1) {
                player1.ySpeed = 0;
                player1.y = this.doorY - player1.h - 1;
                player1.jump = false;
            }
        }
    }

    show() {
        fill(this.col);
        noStroke();
        rect(this.x, this.y, 15, 15);
        fill(this.doorCol);
        rect(this.doorX, this.doorY, this.w, this.h);
    }
}

function powerUp(x, y, col, char) {
    fill(col);
    rect(x, y, 20, 20);
    fill(0);
    textAlign(CENTER);
    text(char, x + 10, y + 15);
}

function item(x, y, outerCol, innerCol) {
    noStroke();
    fill(outerCol);
    rect(x, y, 20, 20);
    fill(innerCol);
    ellipse(x + 10, y + 10, 10);
}

function door(x, y, frameCol) {
    noStroke();
    fill(frameCol);
    rect(x, y, 40, 40);
    fill(0);
    rect(x + 5, y + 5, 30, 35);
}

function bridge(x, y, w, col) {
    noStroke();
    fill(col);
    for (i = x; i < ((w * 20) + x); i += 20) {
        ellipse(i, y, 20);
    }
}

function spikeStrip(x, y, w, col) {
    for (i = x; i < ((w * 20) + x); i += 20) {
        spike(i, y, col);
    }
}
