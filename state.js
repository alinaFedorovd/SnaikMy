
// Функции работающие с данными, моделирущими игру, вынесены сюда, в отдельный файл

// Сгенерировать двумерный массив указанного размера
// отражающий пустое игровое поле (заполненное CELL_EMPTY)
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

// Сгенерировать объект с рандомными координатами для змейки
// @param {number} max - максимальные возможные x/y
// @returns {object} - объект с коордианатами ({x: .., y: ..})
function generateInitialSnakePosition(max) {
    let obX_Y = {};
    const random = function(max) {
        return Math.floor(Math.random() * (max - 0) + 0);
    }
    obX_Y.x = random(max);
    obX_Y.y = random(max);
    return obX_Y;
}

// Сгенерировать объект с рандомными координатами для еды
// (еда генерируется в рандомной незанятой клетке игрового поля)
// @param {array} matrix - массив моделирующий игровое поле на котором отмечены уже занятые клетки
// @returns {object} - объект с рандомными коордианатами для еды ({x: .., y: ..})
function generateFoodPosition(matrix) {
    let empArr = [];
    matrix.forEach((item, y) => {
        item.forEach((item2, x) => {
            if (item2 == CELL_EMPTY) {
                let obj = {};
                obj.x = x;
                obj.y = y;
                empArr.push(obj);
            }

        });
    });

    const randomEmpCell = function(max) {
        return Math.floor(Math.random() * (max - 0) + 0);
    };

    return empArr[randomEmpCell(empArr.length)];
};

// Отрендерить змейку в двумерном массиве matrix (мутирует массив)
// @param {array} matrix - массив моделирующий игровое поле (будет мутирован)
// @param {object} snakePosition - объект с коордианатами змейки ({x: .., y: ..})
function applySnakeToMatrix(matrix, snakePosition) {
    matrix[snakePosition.y][snakePosition.x] = CELL_SNAKE;
}

// Отрендерить еду в двумерном массиве matrix (мутирует массив)
// @param {array} matrix - массив моделирующий игровое поле (будет мутирован)
// @param {object} foodPosition - объект с коордианатами еды ({x: .., y: ..})
function applyFoodToMatrix(matrix, foodPosition) {
    matrix[foodPosition.y][foodPosition.x] = CELL_FOOD;
}

// Передвинуть змейку влево (мутирует объект)
// Если змейка пытается вылезти за пределы игрового поля,
// переместить её в конец (сквозным образом)
// @param {object} snakePosition - объект с коордианатами змейки ({x: .., y: ..}) (будет мутирован)
function snakeMoveLeft(snakePosition) {
    snakePosition.x -= 1;
    if (snakePosition.x < 0) {
        snakePosition.x = BOARD_SIZE - 1;
    }
}

// Передвинуть змейку вправо (мутирует объект)
// Если змейка пытается вылезти за пределы игрового поля,
// переместить её в начало (сквозным образом)
// @param {object} snakePosition - объект с коордианатами змейки ({x: .., y: ..}) (будет мутирован)
function snakeMoveRight(snakePosition) {
    snakePosition.x += 1;
    if (snakePosition.x > BOARD_SIZE - 1) {
        snakePosition.x = 0;
    }
}

// Передвинуть змейку вниз (мутирует объект)
// Если змейка пытается вылезти за пределы игрового поля,
// переместить её в вверх (сквозным образом)
// @param {object} snakePosition - объект с коордианатами змейки ({x: .., y: ..}) (будет мутирован)
function snakeMoveDown(snakePosition) {
    snakePosition.y += 1;
    if (snakePosition.y > BOARD_SIZE - 1) {
        snakePosition.y = 0;
    }
}

// Передвинуть змейку вверх (мутирует объект)
// Если змейка пытается вылезти за пределы игрового поля,
// переместить её в вниз (сквозным образом)
// @param {object} snakePosition - объект с коордианатами змейки ({x: .., y: ..}) (будет мутирован)
function snakeMoveUp(snakePosition) {
    snakePosition.y -= 1;
    if (snakePosition.y < 0) {
        snakePosition.y = BOARD_SIZE - 1;
    }
}

// Узнать есть ли змейка еду (пересекаеется ли по координатам с едой)
// @param {object} snakePosition - oбъект с коордианатами змейки ({x: .., y: ..})
// @param {object} foodPosition - oбъект с коордианатами еды ({x: .., y: ..})
// @returns {boolean} - ест ли змейка еду (true/false)
function isEating(snakePosition, foodPosition) {
    if (snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y) {
        return true;
    } else {
        return false;
    }
}
