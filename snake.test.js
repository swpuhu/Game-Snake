const Snake = require('./snake');
const DIRECTION = Snake.DIRECTION;
const params = Snake.params;

function validSnake(snake) {
    let pointer = snake.head;
    while(pointer) {
        let next = pointer.next;
        if (next) {
            expect(next.before).toBe(pointer);
        }
        pointer = pointer.next
    }

    expect(pointer).toBeNull();
    
}

test('Snake实例初始化测试', () => {
    // 测试snake的位置是否正确
    let length = 3;
    let snake = new Snake.Snake(0, 0, length, DIRECTION.left);
    expect(snake.tail.x).toBe(params.unitSize * (length - 1));
    let actualLength = 0;
    let pointer = snake.head;
    while(pointer) {
        actualLength++;
        pointer = pointer.next
    }
    expect(actualLength).toBe(length);
    validSnake(snake);
    
})

test('snake func: addLength, params: 0', () => {
    let length = 3;
    let snake = new Snake.Snake(0, 0, length, DIRECTION.left);
    snake.addLength(0);
    expect(snake.length).toBe(length);
    validSnake(snake);
})


test('snake func: addLength, params: 1', () => {
    let length = 3;
    let snake = new Snake.Snake(0, 0, length, DIRECTION.left);
    snake.addLength(1);
    expect(snake.length).toBe(length + 1);
    validSnake(snake);
})

test('snake func: turn + updatePosition, params: left', () => {
    let length = 3;
    let snake = new Snake.Snake(0, 0, length, DIRECTION.left);
    let x = snake.x;
    let y = snake.y;
    snake.turn(DIRECTION.left);
    snake.updatePosition();
    snake.updatePosition();
    expect(snake.x).toBe(x - params.unitSize * 2);
    expect(snake.y).toBe(y);
    expect(snake.length).toBe(length);
    validSnake(snake);
})


test('snake func: turn + updatePosition, params: right', () => {
    let length = 3;
    let snake = new Snake.Snake(20, 30, length, DIRECTION.right);
    let x = snake.x;
    let y = snake.y;
    snake.turn(DIRECTION.right);
    snake.updatePosition();
    expect(snake.x).toBe(x + params.unitSize);
    expect(snake.y).toBe(y);
    expect(snake.length).toBe(length);
    validSnake(snake);
})


test('snake func: turn + updatePosition, params: top', () => {
    let length = 3;
    let snake = new Snake.Snake(20, 30, length, DIRECTION.top);
    let x = snake.x;
    let y = snake.y;
    snake.turn(DIRECTION.top);
    snake.updatePosition();
    expect(snake.x).toBe(x);
    expect(snake.y).toBe(y + params.unitSize);
    expect(snake.length).toBe(length);
    validSnake(snake);
})

test('snake func: turn + updatePosition, params: bottom', () => {
    let length = 3;
    let snake = new Snake.Snake(20, 30, length, DIRECTION.bottom);
    let x = snake.x;
    let y = snake.y;
    snake.turn(DIRECTION.bottom);
    snake.updatePosition();
    expect(snake.x).toBe(x);
    expect(snake.y).toBe(y - params.unitSize);
    expect(snake.length).toBe(length);
    validSnake(snake);
})