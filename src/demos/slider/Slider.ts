import EventEmitter from "../../tools/EventEmitter.ts";
import {Options, SliderVal} from "./Options.ts";
import DomHandler from "../../tools/dom.ts";
type EventType = MouseEvent | TouchEvent;

export default class Slider extends EventEmitter {
  // 配置项
  private readonly options: Options;

  // 容器
  private el: HTMLElement;

  // 按钮
  private btns: HTMLCollectionOf<Element>;

  // 色条bar
  private bar: HTMLElement;

  // 容器长度
  private sliderWidth: number;

  // 最大/最小值的差
  private valueRange: number;

  // 按下的是哪个滑块
  private pointerDown: string;

  // 是否正在拖拽
  private dragging = false;

  // 鼠标按下的位置
  private start = 0;

  private startVal = 0;

  // 移动时的位置
  private current = 0;

  private currentValue:  number[];

  private domHandle: DomHandler;

  // 事件句柄
  private handleMove: (e: MouseEvent | TouchEvent) => void;
  private handleEnd: (e: MouseEvent | TouchEvent) => void;

  constructor(el: HTMLElement | string, options?: Partial<Options>) {
    super(['changing', 'change']);
    if (!el) return;
    this.el = (typeof el === 'string' ? document.querySelector(el) : el) as HTMLElement;

    // 合并选项
    this.options = new Options().merge(options);

    const initVal = this.options.value;
    this.currentValue = initVal ? this.checkLimits(Array.isArray(initVal) ? initVal : [initVal]) : this.checkLimits([0]);

    this.init();
  }

  private init() {
    const maxBtnClass = this.options.range ? 'v-slider-button-wrap' : 'v-slider-button-wrap hide';
    this.el.innerHTML = `<div class="v-slider-wrap">
        <!-- 色条 -->
        <div class="v-slider-bar"></div>

        <!-- 断点 -->
        <!--<div class="dot"></div>-->

        <!-- 色块 -->
        <div class="v-slider-button-wrap" data-type="min">
          <div class="v-slider-button"></div>
        </div>

        <div class="${maxBtnClass}" data-type="max">
          <div class="v-slider-button"></div>
        </div>
      </div>`;


    this.bar = <HTMLElement>this.el.querySelector('.v-slider-bar');
    this.btns = this.el.getElementsByClassName('v-slider-button-wrap');
    this.domHandle = new DomHandler();
    this.sliderWidth = this.domHandle.getOuterWidth(this.el.querySelector('.v-slider-wrap'));
    this.valueRange = this.options.max - this.options.min;
    this.initEvents();
    this.changeButtonPosition();
    this.changeBarStyle();
  }

  private initEvents() {
    for(let a = 0; a < this.btns.length; a++) {
      this.btns[a].addEventListener('mousedown', this.handleStart.bind(this));
      this.btns[a].addEventListener('touchstart', this.handleStart.bind(this));
    }
  }


  // 滑块按下
  private handleStart(event: EventType) {
    this.pointerDown = (<HTMLElement>event.currentTarget).dataset.type || 'min';
    this.onDragStart(event);

    this.handleMove = this.onDragMove.bind(this);
    this.handleEnd = this.onDragEnd.bind(this);
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('touchmove', this.handleMove);
    window.addEventListener('mouseup', this.handleEnd);
    window.addEventListener('touchend', this.handleEnd);
  }

  private onDragStart(event: EventType) {
    this.dragging = false;

    // 按下的位置
    this.start = this.getPointer(event);
    this.startVal = this.currentValue[this.pointerDown === "min" ? 0 : 1];
  }

  private onDragMove() {
    console.log('mousemove');
    this.dragging = true;
    this.current = this.getPointer(event);

    // (变化的值diff / 数值范围) = (鼠标当前位置 - 鼠标起始位置) / 总长
    const diff = ((this.current - this.start) / this.sliderWidth) * this.valueRange;
    const newVal = this.startVal + diff;
    this.changeVal(newVal);
  }

  private onDragEnd() {
    if (this.dragging) {
      this.dragging = false;
      const value = this.options.range ? this.exportValue : this.exportValue[0];
      this.emitEvent('onChange', value);
    }
    this.pointerDown = null;
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('touchmove', this.handleMove);
    window.removeEventListener('mouseup', this.handleEnd);
    window.removeEventListener('touchend', this.handleEnd);
  }


  // 改变值
  private changeVal(newVal, type = this.pointerDown) {
    const index = type === "min" ? 0 : 1;
    if (type === "min") {
      newVal = this.checkLimits([newVal, this.options.max])[0];
    } else {
      newVal = this.checkLimits([this.options.min, newVal])[1];
    }
//      console.log('newVal :', newVal);

    // const modulus = this.handleDecimal(newVal, this.options.step);
    const modulus = newVal % this.options.step;
    const value = this.currentValue;

    // 当accordingToStep === true时，newVal - modulus保证是整数
    value[index] = this.options.accordingToStep ? newVal - modulus : newVal;
     // console.log("move :", newVal, value, modulus);
    this.currentValue = value.slice();
    this.changeButtonPosition();
    this.changeBarStyle();
   /* if (!this.dragging) {
      if (this.currentValue[index] !== this.oldValue[index]) {
        this.emitChange();
        this.oldValue[index] = this.currentValue[index];
      }
    }*/
  }

  // 根据值改变按钮位置
  private changeButtonPosition() {
    const val = this.currentValue;
    // (当前位置 / 100) = (当前数值 - 最小数值) / 数值范围
    const minBtnPoi = ((val[0] - this.options.min) / this.valueRange) * 100;  // 做滑块
    const maxBtnPoi = ((val[1] - this.options.min) / this.valueRange) * 100;  // 右滑块
    (<HTMLElement>this.btns[0]).style.left = minBtnPoi + '%';
    if (this.btns[1]) {
      (<HTMLElement>this.btns[1]).style.left = maxBtnPoi + '%';
    }
  }

  // 根据值改变色条样式
  private changeBarStyle() {
    const style = { width: 0, left: 0 };
    if (this.options.range) {
      style.left = ((this.currentValue[0] - this.options.min) / this.valueRange) * 100;
      style.width = ((this.currentValue[1] - this.currentValue[0]) / this.valueRange) * 100;
    } else {
      style.width = ((this.currentValue[0] - this.options.min) / this.valueRange) * 100;
    }
    this.bar.style.width = style.width + '%';
    this.bar.style.left = style.left + '%';
  }


  /*private handleDecimal(pos, step) {
    if (step < 1) {
      let sl = step.toString(),
        multiple = 1,
        m;
      try {
        m = sl.split(".")[1].length;
      } catch (e) {
        m = 0;
      }

      multiple = Math.pow(10, m);
      return ((pos * multiple) % (step * multiple)) / multiple;
    } else {
      return pos % step;
    }
  }*/

  private getPointer(event) {
    return event.type.indexOf("touch") !== -1 ? event.touches[0].clientX : event.clientX;
  }

  private checkLimits([min, max]: number[]): number[] {
    min = Math.max(this.options.min, min);
    min = Math.min(this.options.max, min);
    if (max) {
      max = Math.max(this.options.min, min, max);
      max = Math.min(this.options.max, max);
    }else {
      max = this.options.max;
    }
    return [min, max];
  }


  // 发射自定义事件
  private emitEvent(type: string, args: any) {
    if (this.options[type]) {
      this.options[type](args);
    }
  }


  // 最终的value
  get exportValue() {
    // step是小数就等于1，否则等于0
    const decimalCases = (String(this.options.step).split(".")[1] || "").length;
    return this.currentValue.map(nr => Number(nr.toFixed(decimalCases)));
  }
}