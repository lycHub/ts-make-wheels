import { Options } from "../Options.ts";
import Food from "./Food.ts";
import Snake, { Direction } from "./Snake.ts";

export default class Game {
    private options;
    private moving = false;
    private food: Food;
    private snake: Snake;
    private map: HTMLElement;
    constructor(map: HTMLElement) {
        this.map = map;
        this.food = new Food();
        this.snake = new Snake();
    }

    start() {
        this.food.render(this.map);
        this.snake.render(this.map);
        this.runSnake();
        this.bindKeyBoardEvts();
    }

    private runSnake() {
        this.moving = true;
        const timer = setInterval(() => {
            this.snake.move(this.food);
            this.snake.render(this.map);

            // 判断是否撞到边界
            const maxX = this.map.offsetWidth / this.snake.options.width;
            const maxY = this.map.offsetHeight / this.snake.options.height;
            const head = this.snake.options.body[0];
            if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
                // alert('over');
                this.moving = false;
                clearInterval(timer);
            }
        }, 200);
    }


    private bindKeyBoardEvts() {
        document.addEventListener('keydown', (evt: KeyboardEvent) => {
            // console.log('code', evt);
            switch (evt.key) {
                case 'ArrowUp':
                this.snake.options.direction = Direction.Up;
                break;
                case 'ArrowDown':
                this.snake.options.direction = Direction.Down;
                break;
                case 'ArrowLeft':
                this.snake.options.direction = Direction.Left;
                break;
                case 'ArrowRight':
                this.snake.options.direction = Direction.Right;
                break;
            }
        });
    }
}