import { Options } from "../Options.ts";
import { getRandom } from "../../../tools/number.ts";

type FootOptions = {
    // x?: number;
    // y?: number;
    width: number;
    height: number;
    color: string;
}
export default class Food extends Options {
    private options: FootOptions;
    coordinates = { x: 0, y: 0 };
    private currentFood: HTMLElement;
    constructor(options?: FootOptions) {
        super({
            // x: getRandom(0, 800),
            // y: getRandom(0, 600),
            width: 20,
            height: 20,
            color: '#f60'
        });
        
        this.options = super.merge(options);
        // console.log('options :', this.options);
    }

    // 渲染食物对象
    render(map: HTMLElement) {
        this.removeFood(map);
        this.coordinates.x = getRandom(0, map.offsetWidth / this.options.width - 1) * this.options.width;
        this.coordinates.y = getRandom(0, map.offsetHeight / this.options.height - 1) * this.options.height;
        this.currentFood = document.createElement('div');
        this.currentFood.style.width = this.options.width + 'px';
        this.currentFood.style.height = this.options.height + 'px';
        this.currentFood.style.backgroundColor = this.options.color;
        this.currentFood.style.position = 'absolute';
        this.currentFood.style.left = this.coordinates.x + 'px';
        this.currentFood.style.top = this.coordinates.y + 'px';
        map.appendChild(this.currentFood);
    }

    private removeFood(map: HTMLElement) {
        if (this.currentFood) {
            map.removeChild(this.currentFood);
            this.currentFood = null;
        }
    }
}