// Сюда, в отдельный файл, вынесены функции, работающие с интерфейсом

// Изменить размер канваса
// @param {number} canvas - дом-элемент в котором будет проихсодить отрисовка
// @param {number} cellNum - размер игрового поля в клетках (и ширина и высота)
// @param {number} cellSize - ширина/высота (квадратной) клетки в пикселях
function changeCanvasSize(canvas, cellNum, cellSize) {
    const newSize = cellNum*cellSize + "px";
    canvas.setAttribute('width', newSize);
    canvas.setAttribute('height', newSize);
}

// Отрисовать матрицу (двумерный массив, моделирующий игровое поле) в <canvas>
// @param {object} state - объект с состоянием игры
// @param {HTMLElement} canvas - дом-элемент в котором будет проихсодить отрисовка
function drawStateOnCanvas(state, canvas) {
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!state.gameOver) {
        const matrix = stateToMatrix(state);

        matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                const xInPixels = x * CELL_SIZE;
                const yInPixels = y * CELL_SIZE;

                if (cell == CELL_SNAKE_HEAD) {
                    context.fillStyle = COLOR_SNAKE_HEAD;
                    context.fillRect(xInPixels, yInPixels, CELL_SIZE, CELL_SIZE);
                }

                if (cell == CELL_SNAKE_TAIL) {
                    context.fillStyle = COLOR_SNAKE_TAIL;
                    context.fillRect(xInPixels, yInPixels, CELL_SIZE, CELL_SIZE);
                }
                
                if (cell == CELL_FOOD) {
                    context.fillStyle = COLOR_FOOD;
                    context.fillRect(xInPixels, yInPixels, CELL_SIZE, CELL_SIZE);
                }
            });
        });
    } else {
        context.font = "16px serif";
        context.fillText(gameOverText(state), 10, 10);
    }
}

// Отрисовать матрицу (двумерный массив, моделирующий игровое поле) в <textarea>
// @param {object} state - объект с состоянием игры
// @param {HTMLElement} textarea - дом-элемент в котором будет распечатана матрица
function drawStateInTextarea(state, textarea) {
    const array2dToString = function(array2d) {
        let resultString = '';
        array2d.forEach((row) => {
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

    // Добавить текст в <textarea>
    // @param {HTMLElement} textarea - дом-элемент в который будет добавлен текст
    // @param {string} text - текст который будет добавлен
    const textareaAdd = function(textarea, text) {
        textarea.textContent += text + "\n";
    }
    
    // не уверена, что это пригодиться в дальнейшем - под вопросом
    // function textareaReplace(arg) {
    //     textarea.textContent = arg;
    // }
    
    // Очистить <textarea>
    // @param {HTMLElement} textarea - дом-элемент, текст которого будет очищен
    const textareaClear = function() {
        textarea.textContent = '';
    }

    textareaClear(textarea);

    let text = '';
    if (!state.gameOver) {
        text = array2dToString(stateToMatrix(state));
    } else {
        text = gameOverText(state);
    }

    // Отладочный вывод: распечатываем state
    text += "\n\n" + JSON.stringify(state, null, 2);

    textareaAdd(textarea, text);
}
