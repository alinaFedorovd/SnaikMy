const BOARD_SIZE = 5;
// function generateMatrix(arg) {
//     let arr = [];
//     let arrMatrix = [];
//     for(let j=0; j<arg;j++){ 
//         arr.push('_')  
//     }
//     for(let i=0; i<arg;i++){
//         arrMatrix.push(arr)
//     }
//     return arrMatrix;
// }
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
// generateMatrix(BOARD_SIZE);

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

matrix = applySnakeToMatrix(matrix, snakePosition); // переопределяю переменную на матрицу со змейкой внутри
let foodPosition = generateFoodPosition(matrix);
// console.log(matrix);

// Функция принимает готовую матрицу, например
// let matrix = [
//   ['_', 's', '_']
//   ['_', '_', '_']
//   ['_', '_', '_']
// ]
// generateFoodPosition(matrix);
// Потом находит пустые клетки (заполненные '_')
// Выбирает случайную пустую клетку и возращает объект
// с координатами рандомной пустой клетик
// Если пустых клеток нет, не возвращать ничего
// Пример:
// generateFoodPosition(matrix); // вернёт { x: 1, y: 2}

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
    matrix[foodPosition.y][foodPosition.x] = '🍕';
    return matrix;
}


applySnakeToMatrix(matrix, snakePosition);
applyFoodToMatrix(matrix, foodPosition);

//   console.log({
//       matrix,
//       foodPosition,
//       snakePosition
//   })



let canvas = document.getElementById("canvas");
let point = canvas.getContext("2d");
//   let food = canvas.getContext("2d");

let right = 50;
let left = 50;

function seeFood() {
    // context.clearRect(0, 0, 500, 500);
    var context = canvas.getContext('2d');
    let xx =  foodPosition.x * 50;
    let yy =  foodPosition.y * 50;
    var image = new Image();
    image.onload = function () {
        context.drawImage(image, xx, yy, 50, 50);
    };
    image.src = "https://em-content.zobj.net/source/google/298/pizza_1f355.png";
    // food.clearRect(0, 0, 500, 500);
    // food.fillStyle = "rgb(55,80,180)";
    // food.fillRect(foodPosition.x*50, foodPosition.y*50,  left, right);
};
seeFood(generateFoodPosition(matrix));

let i = snakePosition.x * 50;
let j = snakePosition.y * 50;
const step_point = 25;
point.fillStyle = "rgb(255,105,180)";

// let snakeIndex = 0;

point.fillRect(i, j, left, right);


document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        if (i == foodPosition.x * 50 && j == foodPosition.y * 50) {
            right += 25;
          
            var context = canvas.getContext('2d');
            let xx =  foodPosition.x * 50;
            let yy =  foodPosition.y * 50;
            var image = new Image();
            image.onload = function () {
                // context.clearRect(i, j, left, right)
                context.drawImage(image, xx, yy, 50, 50);
            };
            image.src = "https://em-content.zobj.net/source/google/298/pizza_1f355.png";
            // foodPosition.x =200; foodPosition.y =250;
            // seeFood(generateFoodPosition(matrix));
        }
        // console.log(i,j,
        //     foodPosition.x*50,
        //     foodPosition.y*50
        //     )
        if (j <= 0) {

            point.clearRect(i, j, left, right)
            j = 475;
            return;
        }
        else {
            point.clearRect(i, j, left, right);
            j -= step_point;
            point.fillRect(i, j, left, right);
            // console.log(i,j)
        }
    }
})

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
        if (i == foodPosition.x * 50 && j == foodPosition.y * 50) {
            right += 25;
        }
        if (j >= 450) {
            point.clearRect(i, j, left, right)
            j = -25;
            return;
        }
        else {
            point.clearRect(i, j, left, right)
            j += step_point;
            point.fillRect(i, j, left, right);
        }

    }
})

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        if (i == foodPosition.x * 50 && j == foodPosition.y * 50) {
            left += 25;
        }
        point.clearRect(i, j, left, right)
        i -= step_point;
        point.fillRect(i, j, left, right);
        if (i <= -25) {
            point.clearRect(i, j, left, right)
            i = 450;
            point.fillRect(i, j, left, right);
        }

    }
})

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {

        if (i == foodPosition.x * 50 && j == foodPosition.y * 50) {
            left += 25;
        }
        point.clearRect(i, j, left, right)
        i += step_point;
        point.fillRect(i, j, left, right);
        if (i >= 475) {
            point.clearRect(i, j, left, right)
            i = 0;
            // seeFood()
            point.fillRect(i, j, left, right);
        }


    }
})
