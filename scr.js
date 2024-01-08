let up_btn = document.getElementById('up');
let left_btn = document.getElementById('left');
let rit_btn = document.getElementById('rit');
let down_btn = document.getElementById('down');
let textarea = document.getElementById('tarea');

let canvas = document.getElementById("canvas");
let point = canvas.getContext("2d");

const BOARD_SIZE = 5;

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

let matrix = generateMatrix(BOARD_SIZE);
let snakePosition = generateInitialSnakePosition(BOARD_SIZE);


function applySnakeToMatrix(matrix, snakePosition) {
    matrix[snakePosition.y][snakePosition.x] = "s";
    return matrix;
}

let foodPosition = generateFoodPosition(matrix);


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

function applyFoodToMatrix(matrix, foodPosition) {
    matrix[foodPosition.y][foodPosition.x] = 'f';
    return matrix;
}


applySnakeToMatrix(matrix, snakePosition);
applyFoodToMatrix(matrix, foodPosition);


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

document.addEventListener('keydown', event => {
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


console.log("после");
console.log(snakePosition);

// Добавляет текст arg в textarea
function textareaAdd(arg) {
    textarea.textContent += arg + "\n";
}

function textareaReplace(arg) {
    textarea.textContent = arg;
}

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

console.log(isEating(snakePosition, foodPosition));
isEating(snakePosition, foodPosition);
