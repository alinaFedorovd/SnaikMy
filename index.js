let textarea = document.getElementById('tarea');
let canvas = document.getElementById("canvas");

let state = generateState(BOARD_SIZE);

// Изменить размер и стили канваса в соответствии со значениями констант
changeCanvasProperties(canvas, BOARD_SIZE, CELL_SIZE, COLOR_CELL_BORDER, COLOR_EMPTY_CELL);

// Отрисовываем змейку графически
drawStateOnCanvas(state, canvas);

// Печатаем змейку текстом
drawStateInTextarea(state, textarea);

document.addEventListener('keydown', event => {
    // Если нажата клавиша не из списка, ничего не делаем
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;

    // Отменить стандартное поведение (прокрутку страницы клавишами клавиатуры)
    event.preventDefault();

    // 'arrowНаправление' ==> 'направление'
    const key = event.key.replace('Arrow', '').toLowerCase();

    if (canChangeDirection(state, key)) {
        if (USE_TIMER) {
            // Если используется таймер, при нажатии на клавиши мы только меняем направление
            // Двигаться змейка будет только когда срабатывает setInterval
            сhangeDirection(state, key);
        } else {
            // Таймер не используется. При нажатии на клавишу мы должны и поменять направление,
            // передвинуть змейку и сделать перерисовку
            сhangeDirection(state, key);
            snakeMove(state);
            drawStateInTextarea(state, textarea);
            drawStateOnCanvas(state, canvas);
        }
    }
});

if (USE_TIMER) {
    setInterval(() => {
        snakeMove(state);
        drawStateInTextarea(state, textarea);
        drawStateOnCanvas(state, canvas);
    }, TIMER_INTERVAL)    
}
