
class SNode {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
        this.before = null;
    }
}

const DIRECTION = {
    left: 'left',
    top: 'top',
    right: 'right',
    bottom: 'bottom'
}

const globalParams = {
    unitSize: 10
}

class Snake {
    constructor (x, y, length = 3, direction = DIRECTION.left, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.length = length;
        this.direction = direction;
        this.length = length;
        this.initDirection = direction;
        this.initLength = length;
        this.init();
        this.head;
        this.tail;
    }

    init() {
        this.head = new SNode(this.x, this.y);
        this.tail = this.head;
        for (let i = 1; i < this.length; i++) {
            let body;
            let x, y;
            switch (this.direction) {
                case DIRECTION.left:
                    x = this.tail.x + globalParams.unitSize;
                    y = this.tail.y;
                    break;
                case DIRECTION.right:
                    x = this.tail.x - globalParams.unitSize;
                    y = this.tail.y;
                    break;
                case DIRECTION.top:
                    x = this.tail.x;
                    y = this.tail.y - globalParams.unitSize;
                    break;
                case DIRECTION.bottom:
                    x = this.tail.x;
                    y = this.tail.y;
                    break;
            }
            body = new SNode(x, y);
            this.tail.next = body;
            body.before = this.tail;
            this.tail = body;
        }
    }

    addLength(num) {
        for (let i = 0; i < num; i++) {
            let body = new SNode();
            this.tail.next = body;
            body.before = this.tail;
            this.tail = body;
        }
        this.length += num;
    }

    turn (direction) {
        switch(direction) {
            case DIRECTION.left:
                if (this.direction !== DIRECTION.right) {
                    this.direction = DIRECTION.left;
                }
                break;
            case DIRECTION.right:
                if (this.direction !== DIRECTION.left) {
                    this.direction = DIRECTION.right;
                }
                break;
            case DIRECTION.top:
                if (this.direction !== DIRECTION.bottom) {
                    this.direction = DIRECTION.top;
                }
                break;
            case DIRECTION.bottom:
                if (this.direction !== DIRECTION.top) {
                    this.direction = DIRECTION.bottom;
                }
                break;
        }
    }

    updatePosition() {
        switch(this.direction) {
            case DIRECTION.left:
                this.x -= globalParams.unitSize;
                break;
            case DIRECTION.right:
                this.x += globalParams.unitSize;
                break;
            case DIRECTION.top:
                this.y += globalParams.unitSize;
                break;
            case DIRECTION.bottom:
                this.y -= globalParams.unitSize;
                break;
        }
        if (this.x < 0) {
            this.x = this.width - globalParams.unitSize;
        }
        if (this.y < 0) {
            this.y = this.height - globalParams.unitSize;
        }
        if (this.x >= this.width) {
            this.x = 0;
        }
        if (this.y >= this.height) {
            this.y = 0;
        }
        let newHead = new SNode(this.x, this.y);
        newHead.next = this.head;
        this.head.before = newHead;
        this.head = newHead;
        this.tail = this.tail.before;
        this.tail.next = null;
    }


    getAllPosition() {
        let position = [];
        let pointer = this.head;
        while(pointer) {
            position.push({x: pointer.x, y: pointer.y})
            pointer = pointer.next;
        }
        return position;
    }

    draw(ctx) {
        let pointer = this.head;
        while (pointer) {
            let x = pointer.x;
            let y = ctx.canvas.height - pointer.y - globalParams.unitSize;
            ctx.fillRect(x, y, globalParams.unitSize, globalParams.unitSize);
            pointer = pointer.next;
        }
        ctx.fill();
    }

    hitSelf() {
        let p = this.head;
        let isHit = false;
        while(p) {
            if (p !== this.head && this.x === p.x && this.y === p.y) {
                isHit = true;
                break;
            }
            p = p.next;
        }
        return isHit;
    }

    reset() {
        this.length = this.initLength;
        this.direction = this.initDirection;
        this.init();
    }
}


if (typeof module !== 'undefined') {
    exports.Snake = Snake;
    exports.DIRECTION = DIRECTION;
    exports.params = globalParams;
}