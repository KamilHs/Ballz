class Obstacle {
    constructor(x, y, w, n, r, g, b) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.n = n;
        this.r = r;
        this.g = g;
        this.b = b;
        this.initDomTxt(n, r, g, b);
    }

    draw() {
        noStroke();
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.w, this.w);
    }

    initDomTxt(n, r, g, b) {
        this.domTxt = createP(n);
        this.domTxt.addClass('value');
        this.setDomTxtPos();
        this.domTxt.style('color', `rgb(${255 - r},${255 - g},${255 - b})`)
        this.domTxt.style('font-size', (this.w) / 2 + 'px');
    }

    update() {
        this.y += this.w + spacing;
        this.setDomTxtPos();
    }

    setDomTxtPos() {
        this.domTxt.style('left', windowWidth / 2 - width / 2 + this.x + this.w / 2 + 'px');
        this.domTxt.style('top', this.y + this.w / 2 + 'px');
    }


    checkCollision(ball) {
        let xSide = -1, ySide = -1;
        let tx = ball.pos.x, ty = ball.pos.y;
        if (ball.pos.x < this.x) {
            xSide = 0;
            tx = this.x;
        }
        else if (ball.pos.x > this.x + this.w) {
            xSide = 2;
            tx = this.x + this.w;
        }

        if (ball.pos.y < this.y) {
            ySide = 1;
            ty = this.y;
        }
        else if (ball.pos.y > this.y + this.w) {
            ySide = 3;
            ty = this.y + this.w;
        }

        let dx = ball.pos.x - tx;
        let dy = ball.pos.y - ty;
        let distance = Math.sqrt(dx * dx + dy * dy);

        return distance <= ball.r * ball.velMult ? { d: distance, x: xSide, y: ySide } : null;
    }

    decrement() {
        this.domTxt.html(--this.n);
    }

    isDestroyed() {
        return this.n <= 0;
    }

    didReachEnd() {
        return this.y + this.w > height - this.w;
    }


    removeDom() {
        this.domTxt.remove();
    }
}