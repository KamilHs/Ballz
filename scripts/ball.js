class Ball {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.r = r;
        this.velMult = 3;
        this.lifetime = 256;
    }

    setDir(x, y, xTo, yTo) {
        this.pos = createVector(x, y);
        this.vel = createVector(xTo - this.pos.x, yTo - this.pos.y).normalize().mult(this.r * this.velMult);
    }


    draw() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r * 4);
    }

    update() {
        this.pos.add(this.vel);
    }

    checkCollision() {
        if (this.pos.x + this.r >= width || this.pos.x - this.r <= 0) {
            this.vel.x *= -1;
            this.lifetime--;
        }
        if (this.pos.y - this.r < 0) {
            this.vel.y *= -1;
            this.lifetime--;
        }
    }
    isEnded() {
        return this.pos.y - this.r >= height || this.lifetime == 0;
    }
    changeDir(x, y) {
        if (x == 0 || x == 2) this.vel.x *= -1;
        if (y == 1 || y == 3) this.vel.y *= -1;
        this.lifetime = 255;
    }
}