// Ширина/высота игрового поля в клетках
const BOARD_SIZE = 3;

// Ширина/высота (квадратной) клетки в пикселях
const CELL_SIZE = 100;

// Двигать змейку по таймеру (true) или по нажитию на клавишы (false)
const USE_TIMER = false;

// Интервал таймера (используется только если USE_TIMER установлено в true)
const TIMER_INTERVAL = 500;

// Прекращать игру если змейка вышла за пределы игрового поля
const CHECK_IF_COLLIDED_WITH_WALLS = false;

// Прекращать игру если змейка пересеклась сама с собой
const CHECK_IF_COLLIDED_WITH_ITSELF = false;

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

// Цвет пустой клетки
const COLOR_EMPTY_CELL = 'SlateGrey';

// Бордер всех клеток
const COLOR_CELL_BORDER = '#eee'

// Цвет текста сообщающего что игра закончена
const COLOR_TEXT = '#fff'

// Шрифт текста сообщающего что игра закончена
const TEXT_FONT = "16px serif";

// Текст который отображается когда игра выиграна
const GAME_WIN_TEXT = "You won.\nRefresh browser page to restart the game.";

// Текст который отображается когда голова змейки наткнулась на стену
const COLLIDED_WITH_WALL_TEXT = "You lost.\nSnake collided with the wall.";

// Текст который отображается змейка пересеклась сама с собой
const COLLIDED_WITH_ITSELF_TEXT = "You lost.\nSnake collided with itself.";
