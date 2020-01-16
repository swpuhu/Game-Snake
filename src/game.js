const { Snake, params } = require('./snake');
const Bonus = require('./bonus');


class Game {
    constructor(width, height) {
        this.frequency = 0;
        this.bonusFrequency = 0;
        this.threshold = 5;
        this.bonusThreshold = 800;
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
        this.snake = new Snake(mainCanvas.width / 2, mainCanvas.height / 2, 5, 'top', width, height);
        this.bonus = new Bonus(this.bonusCanvas.width, this.bonusCanvas.height);
        this.bonus.draw(this.bonusContext);
        this.mainLoop = null;
        window.snake = this.snake;
        document.body.appendChild(mainCanvas);
        this.initIO();
        this.render(true);
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
                    that.loop();
                }
            }
        }
    }


    snakeRender() {
        this.snakeContext.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);
        this.snake.draw(this.snakeContext);
    }

    bonusRender() {
        this.bonusContext.clearRect(0, 0, this.bonusCanvas.width, this.bonusCanvas.height);
        this.bonus.draw(this.bonusContext);
    }


    render() {
        this.snakeRender();
        this.bonusRender();
        this.mainContext.drawImage(this.snakeCanvas, 0, 0);
        this.mainContext.drawImage(this.bonusCanvas, 0, 0);
    }

    getBonus() {
        if (this.snake.x === this.bonus.x && this.snake.y === this.bonus.y) {
            return true;
        } else {
            return false;
        }
    }

    hitEdge() {

    }

    loop() {
        this.mainLoop = requestAnimationFrame(this.loop.bind(this));
        if (this.snake.hitSelf()) {
            this.pause();
            alert('Game Over!');
            this.reset();
        } else if (this.getBonus()) {
            this.snake.addLength(1);
            this.bonus.reGeneratePosition(this.bonusCanvas.width, this.bonusCanvas.height, this.snake.getAllPosition());
            this.bonusRender();
            this.bonusFrequency = 0;
        } else {
            ++this.frequency;
            ++this.bonusFrequency;
            if (this.frequency >= this.threshold) {
                this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
                this.snake.updatePosition();
                if (this.bonusFrequency >= this.bonusThreshold) {
                    this.bonus.reGeneratePosition(this.bonusCanvas.width, this.bonusCanvas.height, this.snake.getAllPosition());
                    this.bonusRender();
                    this.bonusFrequency = 0;
                }
                this.snakeRender();
                this.mainContext.drawImage(this.snakeCanvas, 0, 0);
                this.mainContext.drawImage(this.bonusCanvas, 0, 0);
                this.frequency = 0;
            }
        }
    }

    reset() {
        this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.snake.reset();
        this.bonus.reset(this.snake.getAllPosition());
        this.render();
    }


    pause() {
        cancelAnimationFrame(this.mainLoop)
        this.mainLoop = null;
    }
}


module.exports = Game;