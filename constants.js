// Ширина/высота игрового поля в клетках
const BOARD_SIZE = 3;

// Ширина/высота (квадратной) клетки в пикселях
const CELL_SIZE = 100;

// Двигать змейку по таймеру (true) или по нажитию на клавишы (false)
const USE_TIMER = true;

// Интервал таймера (используется только если USE_TIMER установлено в true)
const TIMER_INTERVAL = 300;

// Прекращать игру если змейка вышла за пределы игрового поля
const CHECK_IF_COLLIDED_WITH_WALLS = true;

// Прекращать игру если змейка вышла за пересеклась сама с собой
const CHECK_IF_COLLIDED_WITH_ITSELF = true;

// Символ обзоначающий пустую клетку в матрице
const CELL_EMPTY = '_';

// Символ обзоначающий хвостовые сегменты змейки в матрице
const CELL_SNAKE_TAIL = 't';

// Символ обзоначающий головной сегмент змейки в матрице
const CELL_SNAKE_HEAD = 'h';

// Символ обзоначающий еду в матрице
const CELL_FOOD = 'f';

// Цвет головного сегмента змейки (в <canvas>)
const COLOR_SNAKE_HEAD = 'lime';

// Цвет хвостовых сегментов змейки (в <canvas>)
const COLOR_SNAKE_TAIL = 'rgb(46,139,87)';

// Цвет еды (в <canvas>)
const COLOR_FOOD = 'rgb(255,0,0)';

// Текст который отображается когда игра выиграна
const GAME_WIN_TEXT = "You won.\nRefresh browser page to restart the game.";

// Текст который отображается когда голова змейки наткнулась на стену
const COLLIDED_WITH_WALL_TEXT = "You lost.\nSnake collided with wall.";

// Текст который отображается змейка пересеклась сама с собой
const COLLIDED_WITH_ITSELF_TEXT = "You lost.\nSnake collided with itself.";
