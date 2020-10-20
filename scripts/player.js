class Player {
    constructor(x, y, r) {
        this.x = x;
        this.y = y - r * 1.5;
        this.r = r;
        this.ballCount = 1;
        this.balls = [new Ball(x, y, r)]
        this.canShoot = true;
        this.curDestroyedObs = 0;
        this.curStartFrame = -1;
        this.interval = r;
    }

    draw() {
        noStroke();
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.r * 2);
    }

    changePos() {
        this.x = floor(random(this.r * 2, width - this.r * 2))
    }

    addBall() {
        this.ballCount++;
        this.balls.push(new Ball(this.x, this.y, this.r));
    }

    canThrow() {
        return this.canShoot;
    }

    drawTrace() {
        strokeWeight(this.r);
        stroke(255)
        line(this.x, this.y, mouseX, mouseY);
    }

    setBalls() {
        this.curStartFrame = frameCount;
        this.canShoot = false;
        for (let i = 0; i < this.curDestroyedObs; i++)
            this.addBall();
        this.curDestroyedObs = 0;

        this.balls.forEach(b => b.setDir(this.x, this.y, mouseX, mouseY))
    }

    throw(obstacles) {
        let endedCount = 0;

        this.balls.forEach((b, i) => {
            if (b.isEnded()) {
                endedCount++;
                return;
            }
            if (frameCount < i * this.interval + this.curStartFrame) return;
            b.draw();
            b.update();
            b.checkCollision();

            let record = { d: Number.MAX_VALUE };
            let closest = null;
            for (let i = obstacles.length - 1; i >= 0; i--) {
                let ob = obstacles[i];

                if (ob.isDestroyed()) {
                    ob.removeDom();
                    this.curDestroyedObs++;
                    obstacles.splice(i, 1);
                }
                let data = ob.checkCollision(b)
                if (data && data.d < record.d) {
                    record = data;
                    closest = ob;
                }
            }

            if (closest) {
                closest.decrement();
                b.changeDir(record.x, record.y);
            }
        });


        if (endedCount == this.ballCount) {
            this.canShoot = true;
            this.changePos();
            obstacles.forEach(ob => ob.update())
            for (let i = 0; i < colsNum; i++) {
                if (random() < 0.5)
                    obstacles.unshift(new Obstacle(
                        spacing + obstWidth * (i % colsNum) + spacing * (i % colsNum),
                        obstWidth * floor(i / colsNum) + spacing * floor(i / colsNum),
                        obstWidth,
                        floor(random(turn * 2, turn * 4)),
                        floor(random(1, 256)),
                        floor(random(1, 256)),
                        floor(random(1, 256))));
            }
        }
    }
}

