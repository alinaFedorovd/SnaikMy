// Функции работающие с данными, моделирущими игру, вынесены сюда, в отдельный файл

// Сгенерировать двумерный массив указанного размера
// моделирующий пустое игровое поле (заполненное CELL_EMPTY)
// @param {number} size - размер двумерного массива
// @returns {array} - сгенерированный двумерный массив
function generateMatrix(size) {
    let arrMatrix = [];
    for (let i = 0; i < size; i++) {
        let arr = [];
        for (let j = 0; j < size; j++) {
            arr.push(CELL_EMPTY)
        }
        arrMatrix.push(arr)
    }
    return arrMatrix;
}

// Сгенерировать объект с состоянием игры
// @param {number} size - размер игрового поля
// @returns {object} - объект хранящий состояние игры
function generateState(size) {
    let state = {
    	// Направление по которому будет двигаться змейка
        direction: 'right',
        // Закончена ли игра
        gameOver: false,
        // Размер игрового поля
        size: size,
        // Генерируем змейку в рандомном месте
        // snakeSegments: [generateInitialSnakePosition(size)],
        snakeSegments: [{x:0, y: 0}],
    }
    // Добавляем в state поле foodPosition (еда в рандомном месте)
    setNewFoodPosition(state);    
    return state;
}

// Сгенерировать случайное число
// @param {number} max - максимальный порог до которого будет генерироваться
// @returns {number} - сгенерированное случайное число
const randomNumber = function(max) {
    return Math.floor(Math.random() * (max - 0) + 0);
};

// Сгенерировать объект с рандомными координатами для змейки
// @param {number} max - максимальные возможные x/y
// @returns {object} - объект с координатами ({x: .., y: ..})
// function generateInitialSnakePosition(max) {
//     let obX_Y = {};
//     obX_Y.x = randomNumber(max);
//     obX_Y.y = randomNumber(max);
//     return obX_Y;
// }

// Найти пустые клетки игрового поля
// @param {object} state - объект с состоянием игры
// @returns {array} - массов с координатами свободных клеток (если они есть) [{x: .., y: ..}]
function findEmptySegments(state) {
    const matrix = stateToMatrix(state);
    let empArr = [];
    matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell == CELL_EMPTY) {
                let obj = {};
                obj.x = x;
                obj.y = y;
                empArr.push(obj);
            }

        });
    });
    return empArr;
}

// Сгенерировать новую еду
// (еда генерируется в рандомной незанятой клетке игрового поля)
// @param {object} state - объект с состоянием игры (будет мутирован)
function setNewFoodPosition(state) {
    const empCells = findEmptySegments(state);

    state.foodPosition = empCells[randomNumber(empCells.length)];
};

// Преобразовать state (объект с состоянием игры) в двумерный массив
// @param {object} state - состояние игры
// @returns {array} - двумерный массив моделируюший игровое поле
function stateToMatrix(state) {
    let matrix = generateMatrix(BOARD_SIZE);

    // Рисуем еду
    if (state.foodPosition) {
        matrix[state.foodPosition.y][state.foodPosition.x] = CELL_FOOD;
    }

    // Рисуем хвостовые сегменты змейки
    state.snakeSegments.forEach((segment, i) =>{
        if (i == 0) return; // голову нарисуем потом

        // Отрисовываем сегмент змейки только если он не выходит за пределы игрового поля
        if (segment.y >= 0 && segment.y < state.size && segment.x >= 0 && segment.x < state.size)
            matrix[segment.y][segment.x] = CELL_SNAKE_TAIL;
    });

    // Рисуем голову змейки (только если она не выходит за пределы игрового поля)
    const head = state.snakeSegments[0]
    if (head.y >= 0 && head.y < state.size && head.x >= 0 && head.x < state.size)
        matrix[head.y][head.x] = CELL_SNAKE_HEAD;

    return matrix;
}

// Передвинуть змейку (мутирует объект)
// Если змейка пытается вылезти за конец игрового поля, переместить её в начало (сквозным образом).
// Если змейка съела еду, увеличить длину змейки.
// Если змейке некуда дальше расти, закончить игру.
// @param {object} state - объект с состоянием игры (будет мутирован)
function snakeMove(state) {
    if (state.gameOver) return;

    const head = state.snakeSegments[0];

    // https://medium.com/nuances-of-programming/поверхностное-и-глубокое-копирование-в-javascript-d9609bc4ac9a
    // https://doka.guide/js/shallow-or-deep-clone/
    // Глубокое копирование (deep copy)
    const newHead = JSON.parse(JSON.stringify(head));

    // Двигаем голову змейки на одну клетку
    switch (state.direction) {
        case 'left':
            newHead.x -= 1;
            if (newHead.x < 0 && !CHECK_IF_COLLIDED_WITH_WALLS) {
                newHead.x = BOARD_SIZE - 1;
            }
            break;
        case 'right':
            newHead.x += 1;
            if (newHead.x > BOARD_SIZE - 1 && !CHECK_IF_COLLIDED_WITH_WALLS) {
                newHead.x = 0;
            }
            break;
        case 'up':
            newHead.y -= 1;
            if (newHead.y < 0 && !CHECK_IF_COLLIDED_WITH_WALLS) {
                newHead.y = BOARD_SIZE - 1;
            }
            break;
        case 'down':
            newHead.y += 1;
            if (newHead.y > BOARD_SIZE - 1 && !CHECK_IF_COLLIDED_WITH_WALLS) {
                newHead.y = 0;
            }
    }   

    // Добавляем новую голову в начало массива
    state.snakeSegments.unshift(newHead);

    // Проверяем ест ли новая головая змейки еду
    if(isEating(state)) {
        // Голова змейки ест еду
        // Хвост не надо удалять

        // Проверяем закончена ли игра
        // Если да, то флаг state.gameOver будет выставлен в true
        endGameIfNecessary(state);
        
        // Если игра не закончена, рисуем новую еду
        if(!state.gameOver) {
            setNewFoodPosition(state);
        }
    } else {
        // Змейка не ест еду
        // Удаляем хвост
        state.snakeSegments.pop();

        endGameIfNecessary(state);
    }
}

// Поменять направление змейки на указанное
// @param {object} state - объект с состоянием игры (будет мутирован)
// @param {string} newDirection - новое направление
function сhangeDirection(state, newDirection) {
    if (state.gameOver) return;
    if (!canChangeDirection(state, newDirection)) return;

    state.direction = newDirection;
}

// Узнать можно ли менять направление игры
// @param {object} state - объект с состоянием игры
// @param {string} newDirection - новое направление
// @returns {boolean} - можно ли менять направление
function canChangeDirection(state, newDirection) {
    if (!['up', 'down', 'left', 'right'].includes(newDirection)) return false;

    // Пока у смейки только один сегмент, она может двигаться в любом направление
    if (state.snakeSegments.length == 1) return true;

    if (
        (state.direction == 'up' && newDirection == 'down') ||
        (state.direction == 'down' && newDirection == 'up') ||
        (state.direction == 'left' && newDirection == 'right') ||
        (state.direction == 'right' && newDirection == 'left')
    ) {
        // Если у смейки больше чем один сегмент, менять направление на противоположное запрещено
        // (не разрешаем змейке двигаться задним ходом)
        return false;
    }
    else {
        // Всё в порядке. Менять направление можно
        return true;
    }
}

// Узнать ест ли голова змейки еду (пересекаеется ли по координатам с едой)
// @param {object} state - объект с состоянием игры
// @returns {boolean} - ест ли змейка еду (true/false)
function isEating(state) {
    const head = state.snakeSegments[0];
    if (head.x == state.foodPosition.x && head.y == state.foodPosition.y) {
        return true;
    } else {
        return false;
    }
}

// Узнать пересекается ли змейка сама с обой
// @param {object} state - объект с состоянием игры
// @returns {boolean} - пересекается ли змейка сама с собой (true/false)
function isCollidingWithItself(state) {
    let isColliding = false;
    state.snakeSegments.forEach((segment, i) => {
        state.snakeSegments.forEach((segment2, j) => {
            if (i !== j) {
                if (segment.x === segment2.x && segment.y === segment2.y) isColliding = true;
            }
        });
    });
    return isColliding;
}

// Узнать пересекается ли змейка со стеной (врезалась ли она в стену)
// @param {object} state - объект с состоянием игры
// @returns {boolean} - пересекается ли змейка со стеной (true/false)
function isCollidingWithWalls(state) {
    let out = false;
    state.snakeSegments.forEach((segment) => {
      if (segment.x < 0 || segment.x > state.size - 1 || segment.y < 0 || segment.y > state.size - 1) {
        out = true;
      }
    });
    return out;
}

// Если змейка разрослась до размеров игрового поля, закончить игру
// @param {object} state - объект с состоянием игры (будет мутирован)
function endGameIfNecessary(state) {    
    if (
        // Если змейка разрослась до размеров игрового поля, игра закончена
        (findEmptySegments(state).length == 0) ||
        // Если змейка пересекла саму себя
        (CHECK_IF_COLLIDED_WITH_ITSELF && isCollidingWithItself(state)) ||
        // Если змейка врезалась в стену
        (CHECK_IF_COLLIDED_WITH_WALLS && isCollidingWithWalls(state))
    ) {
        state.gameOver = true;
    }    
}

// Вернуть текст который будет показываться когда игра закончена
// @param {object} state - объект с состоянием игры
function gameOverText(state) {
    if (state.gameOver) {
        if (CHECK_IF_COLLIDED_WITH_ITSELF && isCollidingWithItself(state))
            return COLLIDED_WITH_ITSELF_TEXT;
        else if (COLLIDED_WITH_WALL_TEXT && isCollidingWithWalls(state))
            return COLLIDED_WITH_WALL_TEXT;
        else return GAME_WIN_TEXT;
    }
}
