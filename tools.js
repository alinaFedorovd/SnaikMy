// Сюда, в отдельный файл, вынесены функции, работающие с интерфейсом

// Отрисовать матрицу (двумерный массив, моделирующий игровое поле) в <canvas>
// @param {array} matrix - массив моделирующий игровое поле
// @param {HTMLElement} canvas - дом-элемент в котором будет проихсодить отрисовка
function drawMatrixOnCanvas(matrix, canvas) {
    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    let y_pr;
    let x_pr;

    matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
            x_pr = x * CELL_SIZE;
            y_pr = y * CELL_SIZE;

            if (cell == CELL_SNAKE) {
                context.fillStyle = COLOR_SNAKE;
                context.fillRect(x_pr, y_pr, CELL_SIZE, CELL_SIZE);
            }
            
            if (cell == CELL_FOOD) {
                context.fillStyle = COLOR_FOOD;
                context.fillRect(x_pr, y_pr, CELL_SIZE, CELL_SIZE);
            }
        });
    });
}

// Отрисовать матрицу (двумерный массив, моделирующий игровое поле) в <textarea>
// @param {array} matrix - массив, моделирующий игровое поле
// @param {HTMLElement} textarea - дом-элемент в котором будет распечатана матрица
function drawMatrixInTextarea(matrix, textarea) {
    const array2dToString = function(array2d) {
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

    const textareaAdd = function(arg) {
        textarea.textContent += arg + "\n";
    }
    
    // не уверена, что это пригодиться в дальнейшем - под вопросом
    // function textareaReplace(arg) {
    //     textarea.textContent = arg;
    // }
    
    const textareaClear = function() {
        textarea.textContent = '';
    }

    textareaClear();
    textareaAdd(array2dToString(matrix));
}
