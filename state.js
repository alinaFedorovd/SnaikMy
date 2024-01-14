function generateMatrix(arg) {
    let arrMatrix = [];
    for (let i = 0; i < arg; i++) {
        let arr = [];
        for (let j = 0; j < arg; j++) {
            arr.push('_')
        }
        arrMatrix.push(arr)
    }
    return arrMatrix;
}

function generateInitialSnakePosition(max) {
    let obX_Y = {};
    function random(max) {
        return Math.floor(Math.random() * (max - 0) + 0);
    }
    obX_Y.x = random(max);
    obX_Y.y = random(max);
    return obX_Y;
}

function generateFoodPosition(matrix) {
    let empArr = [];
    matrix.forEach((item, y) => {
        item.forEach((item2, x) => {

            if (item2 == '_') {
                let obj = {};
                obj.x = x;
                obj.y = y;
                empArr.push(obj);
            }

        });
    });

    function randomEmpCell(max) {
        return Math.floor(Math.random() * (max - 0) + 0);
    };

    return empArr[randomEmpCell(empArr.length)];

} (matrix);

function applySnakeToMatrix(matrix, snakePosition) {
    matrix[snakePosition.y][snakePosition.x] = "s";
    return matrix;
}

function applyFoodToMatrix(matrix, foodPosition) {
    matrix[foodPosition.y][foodPosition.x] = 'f';
    return matrix;
}

function snakeMoveLeft(snakePosition) {
    snakePosition.x -= 1;
    if (snakePosition.x < 0) {
        snakePosition.x = BOARD_SIZE - 1;
    }
}

function snakeMoveRight(snakePosition) {
    snakePosition.x += 1;
    if (snakePosition.x > BOARD_SIZE - 1) {
        snakePosition.x = 0;
    }
}

function snakeMoveDown(snakePosition) {
    snakePosition.y += 1;
    if (snakePosition.y > BOARD_SIZE - 1) {
        snakePosition.y = 0;
    }
}

function snakeMoveUp(snakePosition) {
    snakePosition.y -= 1;
    if (snakePosition.y < 0) {
        snakePosition.y = BOARD_SIZE - 1;
    }
}
