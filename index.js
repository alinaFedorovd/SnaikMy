let textarea = document.getElementById('tarea');
let canvas = document.getElementById("canvas");

let matrix = generateMatrix(BOARD_SIZE);
let snakePosition = generateInitialSnakePosition(BOARD_SIZE);
let foodPosition = generateFoodPosition(matrix);

applySnakeToMatrix(matrix, snakePosition);
applyFoodToMatrix(matrix, foodPosition);

drawMatrixOnCanvas(matrix, canvas);
drawMatrixInTextarea(matrix, textarea);

document.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;

    event.preventDefault();

    if (event.key === 'ArrowLeft') {
        snakeMoveLeft(snakePosition);
    }

    if (event.key === 'ArrowRight') {
        snakeMoveRight(snakePosition);
    }

    if (event.key === 'ArrowUp') {
        snakeMoveUp(snakePosition);
    }

    if (event.key === 'ArrowDown') {
        snakeMoveDown(snakePosition);
    }

    matrix = generateMatrix(BOARD_SIZE);
    if (isEating(snakePosition, foodPosition)) {
        foodPosition = generateFoodPosition(matrix);
    }
    applyFoodToMatrix(matrix, foodPosition);
    applySnakeToMatrix(matrix, snakePosition)    
    drawMatrixInTextarea(matrix, textarea);
    drawMatrixOnCanvas(matrix, canvas);
});
