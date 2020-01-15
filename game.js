class Game {
    constructor(width, height) {
        this.frequency = 0;
        this.threshold = 5;
        this.timestamp = Date.parse(new Date());
        let mainCanvas = document.createElement('canvas');
        let backCanvas = document.createElement('canvas');
        let snakeCanvas = document.createElement('canvas');
        mainCanvas.width = width;
        mainCanvas.height = height;
        backCanvas.width = width;
        backCanvas.height = height;
        snakeCanvas.width = width;
        snakeCanvas.height = height;
        this.mainCanvas = mainCanvas;
        this.backCanvas = backCanvas;
        this.snakeCanvas = snakeCanvas;
        this.mainContext = mainCanvas.getContext('2d');
        this.backContext = backCanvas.getContext('2d');
        this.snakeContext = snakeCanvas.getContext('2d');
        this.snake = new Snake(mainCanvas.width / 2, mainCanvas.height / 2, 300);
        this.mainLoop = null;
        console.log(this.snake);
        window.snake = this.snake;
        document.body.appendChild(mainCanvas);
        this.initIO();
        this.render();
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


    snakeRender() {
        this.snakeContext.clearRect(0, 0, this.snakeCanvas.width, this.snakeCanvas.height);
        let pointer = this.snake.head;
        while (pointer) {
            let x = pointer.x;
            let y = this.snakeCanvas.height - pointer.y;
            this.snakeContext.fillRect(x, y, globalParams.unitSize, globalParams.unitSize);
            pointer = pointer.next;
        }
        this.snakeContext.fill();
    }



    render() {
        ++this.frequency;
        if (this.frequency >= this.threshold) {
            this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
            this.snake.updatePosition();
            this.frequency = 0;
            this.snakeRender();
            this.mainContext.drawImage(this.snakeCanvas, 0, 0);
        }
        this.mainLoop = requestAnimationFrame(this.render.bind(this));
    }

    pause() {
        cancelAnimationFrame(this.mainLoop)
        this.mainLoop = null;
    }
}


