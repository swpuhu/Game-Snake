
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
    unitSize: 5
}

class Snake {
    constructor (x, y, length = 3, direction = DIRECTION.left){
        this.x = x;
        this.y = y;
        this.length = length;
        this.direction = direction;
        this.length = length;
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
        let newHead = new SNode(this.x, this.y);
        newHead.next = this.head;
        this.head.before = newHead;
        this.head = newHead;
        this.tail = this.tail.before;
        this.tail.next = null;
    }
}

if (typeof module !== 'undefined') {
    exports.Snake = Snake;
    exports.DIRECTION = DIRECTION;
    exports.params = globalParams;
}