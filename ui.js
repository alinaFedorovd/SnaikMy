// Сюда, в отдельный файл, вынесены функции, работающие с интерфейсом

// Изменить размер канваса
// @param {number} canvas - дом-элемент в котором будет происходить отрисовка
// @param {number} cellNum - размер игрового поля в клетках (и ширина и высота)
// @param {number} cellSize - ширина/высота (квадратной) клетки в пикселях
// @param {string} colorCellBorder - цвет бордера канваса
// @param {string} colorBackground - цвет фона
function changeCanvasProperties(canvas, cellNum, cellSize, colorCellBorder, colorBackground) {
    const newSize = cellNum*cellSize + "px";
    canvas.setAttribute('width', newSize);
    canvas.setAttribute('height', newSize);
    canvas.style.border = `1px ${colorCellBorder} solid`;
    canvas.style.backgroundColor = colorBackground;
}

// Отрисовать матрицу (двумерный массив, моделирующий игровое поле) в <canvas> или
// сообщение о том что игра окончена
// @param {object} state - объект с состоянием игры
// @param {HTMLElement} canvas - дом-элемент в котором будет происходить отрисовка
function drawStateOnCanvas(state, canvas) {
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!state.gameOver) {
        const matrix = stateToMatrix(state);

        matrix.forEach((row, y) => {
            row.forEach((cell, x) => {
                const xInPixels = x * CELL_SIZE;
                const yInPixels = y * CELL_SIZE;

                // Drawing filled rect with border
                // https://stackoverflow.com/a/38174189
                context.beginPath();

                if (cell == CELL_SNAKE_HEAD) {
                    context.fillStyle = COLOR_SNAKE_HEAD;
                }
                else if (cell == CELL_SNAKE_TAIL) {
                    context.fillStyle = COLOR_SNAKE_TAIL;
                }
                else if (cell == CELL_FOOD) {
                    context.fillStyle = COLOR_FOOD;
                } else {
                    context.fillStyle = COLOR_BACKGROUND;
                }

                context.strokeStyle = COLOR_CELL_BORDER;
                context.rect(xInPixels, yInPixels, CELL_SIZE, CELL_SIZE);
                context.fill();
                context.lineWidth = 2;
                context.stroke();

                // "Add ctx.beginPath() before and ctx.closePath() after this code. Otherwise you will see some fun, but probably undesired behaviour."
                context.closePath();
            });
        });
    } else {
        context.font = TEXT_FONT;
        context.fillStyle = COLOR_TEXT;
        context.fillText(gameOverText(state), 10, 10);
    }
}

// Отрисовать матрицу (двумерный массив, моделирующий игровое поле) в <textarea> или
// сообщение о том что игра окончена
// @param {object} state - объект с состоянием игры
// @param {HTMLElement} textarea - дом-элемент в котором будет распечатана матрица
function drawStateInTextarea(state, textarea) {
    const array2dToString = function(array2d) {
        let resultString = '';
        array2d.forEach((row) => {
            resultString += '[';
            row.forEach((cell, x) => {
                resultString += cell;
                // Добавляем разделитель (пробел) только между ячейками,
                // не добавляем пробел после последней ячейки
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
