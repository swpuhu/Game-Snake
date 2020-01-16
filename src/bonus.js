const {params} = require('./snake');

class Bonus {
    constructor (width, height) {
        this.generatePos(width, height);
        this.width = width;
        this.height = height;
        this.style = {
            color: '#ee0a0a'
        }
    }

    generatePos(width, height) {
        this.x = Math.floor(Math.random() * width / params.unitSize) * params.unitSize;
        this.y = Math.floor(Math.random() * height / params.unitSize) * params.unitSize;
    }

    reGeneratePosition(width, height, excludePosition = []) {
        this.generatePos(width, height);
        let flag = false;
        for (let i = 0; i < excludePosition.length; i++) {
            let pos = excludePosition[i];
            if (pos.x === this.x && pos.y === this.y) {
                flag = true;
                break;
            }
        }
        if (flag) {
            this.reGeneratePosition(width, height,excludePosition);
        }

    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        if (ctx.fillStyle !== this.style.color) {
            ctx.fillStyle = this.style.color;
        }
        ctx.fillRect(this.x, ctx.canvas.height - this.y - params.unitSize, params.unitSize, params.unitSize);
        ctx.fill();
    }

    reset(excludePosition) {
        this.reGeneratePosition(this.width, this.height, excludePosition);
    }
}

module.exports = Bonus;