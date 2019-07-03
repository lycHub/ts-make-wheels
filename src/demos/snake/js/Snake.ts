import { Options } from "../Options.ts";
import Food from "./Food.ts";
import Game from "./Game.ts";

export enum Direction { Left, Right, Up, Down };
type SnakeMoveDirection = Direction;

// xy蛇神的坐标（x * width）
type SnakeBody = { x: number; y: number, color: string };

export type SnakeOptions = {
    width: number;
    height: number;
    direction: SnakeMoveDirection;
    speed: number;
    body: SnakeBody[];
};
export default class Snake extends Options {
    readonly options: SnakeOptions;
    private currentSnake: HTMLElement[] = [];
    private map: HTMLElement;
    constructor(options?: SnakeOptions) {
        super({
            width: 20,
            height: 20,
            direction: Direction.Right,
            speed: 200,
            body: [
                {x: 3, y: 2, color: 'red' },
                {x: 2, y: 2, color: 'blue' },
                {x: 1, y: 2, color: 'blue' }
            ]
        });
        
        this.options = super.merge(options);
    }

    // 渲染蛇
    render(map: HTMLElement) {
        if (!this.map) this.map = map;
        this.remove(this.map);
        this.options.body.forEach(item => {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = this.options.width + 'px';
            div.style.height = this.options.height + 'px';
            div.style.left = item.x * this.options.width + 'px';
            div.style.top = item.y * this.options.height + 'px';
            div.style.backgroundColor = item.color;
            this.currentSnake.push(div);
            this.map.appendChild(div);
        });
    }

    move(food: Food, game: Game, cb: () => void) {
        const body = this.options.body;
        for(let a = body.length - 1; a > 0; a--) {
            // 每一格body都移动到他前面那个body上
            body[a].x = body[a - 1].x;
            body[a].y = body[a - 1].y;
        }

        const head = this.options.body[0];
        
        switch(this.options.direction) {
            case Direction.Left:
                head.x--;
                break;
            case Direction.Right:
                head.x++;
                break;
            case Direction.Up:
                head.y--;
                break;
            case Direction.Down:
                head.y++;
                break;
        }

        const headX = head.x * this.options.width;
        const headY = head.y * this.options.height;

        if (headX === food.coordinates.x && headY === food.coordinates.y) {
            // 复制蛇身最后一节添加到body后面
            const lastBody = this.options.body[this.options.body.length - 1];
            this.options.body.push({ ...lastBody });
            food.render(this.map);
            this.options.speed = Math.max(10, this.options.speed - 30);
            if (cb) cb();
            game.runSnake(this.options.speed);
        }
    }


    private remove(map: HTMLElement) {
        for(let a = this.currentSnake.length - 1; a >= 0; a--) {
            map.removeChild(this.currentSnake[a]);
            this.currentSnake.splice(a, 1);
        }
    }
}