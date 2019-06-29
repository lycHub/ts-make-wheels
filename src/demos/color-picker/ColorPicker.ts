import EventEmitter from "../../tools/EventEmitter.ts";
import {Options} from "./Options.ts";
import DomHandler from "../../tools/dom.ts";

export default class Slider extends EventEmitter {
  // 配置项
  private readonly options: Options;

  // 容器
  private el: HTMLElement;

  // 事件句柄
  private handleMove: (e: MouseEvent | TouchEvent) => void;
  private handleEnd: (e: MouseEvent | TouchEvent) => void;

  constructor(el: HTMLElement | string, options?: Partial<Options>) {
    super(['changing', 'change']);
    if (!el) return;
    this.el = (typeof el === 'string' ? document.querySelector(el) : el) as HTMLElement;

    // 合并选项
    this.options = new Options().merge(options);
  }
}