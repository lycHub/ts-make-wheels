import { Options } from "../Options.ts";
import Food from "./Food.ts";
import Snake, { Direction } from "./Snake.ts";
import EventEmitter from "../../../tools/EventEmitter.ts";

export default class Game extends EventEmitter {
    private moving = false;
    private score = 0;
    private food: Food;
    private snake: Snake;
    private map: HTMLElement;
    private timer: any;
    
    constructor(map: HTMLElement) {
        super(['init', 'pause', 'over', 'score-change', 'refresh']);
        this.map = map;
        this.init();
    }

    private init() {
        this.food = new Food();
        this.snake = new Snake();
        this.food.render(this.map);
        this.snake.render(this.map);
        this.bindKeyBoardEvts();
        this.trigger('init');
    }

    start() {
        this.runSnake();
    }
    
    
    pause() {
        this.moving = false;
        clearInterval(this.timer);
        this.trigger('pause', this.score);
    }

    refresh() {
        this.map.innerHTML = '';
        this.pause();
        this.init();
        this.score = 0;
        this.trigger('refresh');
    }

    runSnake(speed = 200) {
        // console.log('speed :', speed);
        this.moving = true;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.timer = setInterval(() => {
            this.snake.move(this.food, this, () => this.trigger('score-change', ++this.score));
            this.snake.render(this.map);

            // 判断是否撞到边界
            const maxX = this.map.offsetWidth / this.snake.options.width;
            const maxY = this.map.offsetHeight / this.snake.options.height;
            const head = this.snake.options.body[0];
            if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
                this.trigger('over', this.score);
                this.moving = false;
                clearInterval(this.timer);
            }
        }, speed);
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