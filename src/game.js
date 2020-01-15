const {Snake, params} = require('./snake');
const Bonus = require('./bonus');


class Game {
    constructor(width, height) {
        this.frequency = 0;
        this.bonusFrequency = 0;
        this.threshold = 10;
        this.bonusThreshold = 500;
        this.timestamp = Date.parse(new Date());
        let mainCanvas = document.createElement('canvas');
        let backCanvas = document.createElement('canvas');
        let snakeCanvas = document.createElement('canvas');
        let bonusCanvas = document.createElement('canvas');
        mainCanvas.width = width;
        mainCanvas.height = height;
        backCanvas.width = width;
        backCanvas.height = height;
        snakeCanvas.width = width;
        snakeCanvas.height = height;
        bonusCanvas.width = width;
        bonusCanvas.height = height;
        this.mainCanvas = mainCanvas;
        this.backCanvas = backCanvas;
        this.snakeCanvas = snakeCanvas;
        this.bonusCanvas = bonusCanvas;
        this.mainContext = mainCanvas.getContext('2d');
        this.backContext = backCanvas.getContext('2d');
        this.snakeContext = snakeCanvas.getContext('2d');
        this.bonusContext = bonusCanvas.getContext('2d');
        this.snake = new Snake(mainCanvas.width / 2, mainCanvas.height / 2, 50, 'top', width, height);
        this.bonus = new Bonus(this.bonusCanvas.width, this.bonusCanvas.height);
        this.bonus.draw(this.bonusContext);
        this.mainLoop = null;
        window.snake = this.snake;
        document.body.appendChild(mainCanvas);
        this.initIO();
    }

    initIO() {
        let that = this;
        document.onkeydown = function (e) {
            if (e.key === 'ArrowLeft') {
                that.snake.turn('left');
            } else if (e.key === 'ArrowUp') {
                that.snake.turn('top');
            } else if (e.key === 'ArrowDown') {
                that.snake.turn('bottom');
            } else if (e.key === 'ArrowRight') { 
                that.snake.turn('right');
            } else if (e.key === ' ') {
                if (that.mainLoop) {
                    that.pause();
                } else {
                    that.render();
                }
            }
        }
    }


    snakeRender () {
        this.snakeContext.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);
        this.snake.draw(this.snakeContext);
    }

    bonusRender () {
        this.bonusContext.clearRect(0, 0, this.bonusCanvas.width, this.bonusCanvas.height);
        this.bonus.reGeneratePosition(this.bonusCanvas.width, this.bonusCanvas.height, this.snake.getAllPosition());
        this.bonus.draw(this.bonusContext);
    }


    render() {
        ++this.frequency;
        ++this.bonusFrequency;
        if (this.frequency >= this.threshold) {
            this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
            this.snake.updatePosition();
            if (this.bonusFrequency >= this.bonusThreshold) {
                this.bonusRender();
                this.bonusFrequency = 0;
            }
            this.snakeRender();
            this.mainContext.drawImage(this.snakeCanvas, 0, 0);
            this.mainContext.drawImage(this.bonusCanvas, 0, 0);
            this.frequency = 0;
        }
        this.mainLoop = requestAnimationFrame(this.render.bind(this));
    }

    pause() {
        cancelAnimationFrame(this.mainLoop)
        this.mainLoop = null;
    }
}


module.exports = Game;