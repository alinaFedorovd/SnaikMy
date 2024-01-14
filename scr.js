let textarea = document.getElementById('tarea');
let canvas = document.getElementById("canvas");
let point = canvas.getContext("2d");
const BOARD_SIZE = 5;

let matrix = generateMatrix(BOARD_SIZE);
let snakePosition = generateInitialSnakePosition(BOARD_SIZE);
let foodPosition = generateFoodPosition(matrix);

applySnakeToMatrix(matrix, snakePosition);
applyFoodToMatrix(matrix, foodPosition);

document.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;

    event.stopPropagation();

    if (event.key === 'ArrowLeft') {
        matrix[snakePosition.y][snakePosition.x] = "_";
        snakeMoveLeft(snakePosition);
        if (isEating(snakePosition, foodPosition)) {
            fu1();
        } else {
            fu2();
        }
    }

    if (event.key === 'ArrowRight') {
        matrix[snakePosition.y][snakePosition.x] = "_";
        snakeMoveRight(snakePosition);
        if (isEating(snakePosition, foodPosition)) {
            fu1();
        } else {
            fu2();
        }
    }

    if (event.key === 'ArrowUp') {
        matrix[snakePosition.y][snakePosition.x] = "_";
        snakeMoveUp(snakePosition);
        if (isEating(snakePosition, foodPosition)) {
            fu1();
        } else {
            fu2();
        }
    }

    if (event.key === 'ArrowDown') {
        matrix[snakePosition.y][snakePosition.x] = "_";
        snakeMoveDown(snakePosition);
        if (isEating(snakePosition, foodPosition)) {
            fu1();
        } else {
            fu2();
        }
    }
});

function fu1() {
    foodPosition = generateFoodPosition(matrix);
    applySnakeToMatrix(matrix, snakePosition)
    applyFoodToMatrix(matrix, foodPosition);
    arrayPrintCanvasSnake(matrix);
    applyPrintCanvasFood(matrix);
    textareaClear();
    textareaAdd(array2dToString(matrix));
}

function fu2() {
    applySnakeToMatrix(matrix, snakePosition);
    textareaClear();
    textareaAdd(array2dToString(matrix));
    arrayPrintCanvasSnake(matrix);
}

function textareaAdd(arg) {
    textarea.textContent += arg + "\n";
}
// не уверенна, что это пригодиться в дальнейшем - под вопросом
// function textareaReplace(arg) {
//     textarea.textContent = arg;
// }

function textareaClear() {
    textarea.textContent = '';
}

function array2dToString(array2d) {
    let resultString = '';
    array2d.forEach((row, y) => {
        resultString += '[';
        row.forEach((cell, x) => {
            resultString += cell;
            // Добавляем разделитель (пробел)
            // только между ячейками,
            // не добавляем пробел в конец
            // (после последней ячейки)
            if (x < row.length - 1) {
                resultString += ' ';
            }
        });
        resultString += "]\n";
    });
    return resultString;
}

textareaAdd(array2dToString(matrix));

// одновременное рисовании в csnvas 
function arrayPrintCanvasSnake(matrix2d) {
    let y_pr;
    let x_pr;
    matrix2d.forEach((row, y) => {

        row.forEach((cell, x) => {
            if (cell == "s") {
                x_pr = x * 100;
                y_pr = y * 100;
                applyPrintCanvasFood(matrix);
            }

        });

    });
    point.fillStyle = "rgb(46,139,87)";
    point.clearRect(0, 0, canvas.width, canvas.height);
    point.fillRect(x_pr, y_pr, 100, 100);
    applyPrintCanvasFood(matrix);
}

function applyPrintCanvasFood(matrix2d) {
    let y_pr;
    let x_pr;
    matrix2d.forEach((row, y) => {

        row.forEach((cell, x) => {
            if (cell == "f") {
                x_pr = x * 100;
                y_pr = y * 100;
            }

        });

    });
    point.fillStyle = "rgb(255,0,0)";
    point.fillRect(x_pr, y_pr, 100, 100);


}

arrayPrintCanvasSnake(matrix);
applyPrintCanvasFood(matrix);

function isEating(snakePosition, foodPosition) {
    if (snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y) {
        return true;
    } else {
        return false;
    }
}

// это зачем?
// isEating(snakePosition, foodPosition);
