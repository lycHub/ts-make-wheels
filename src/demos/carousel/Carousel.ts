import EventEmitter from "../../tools/EventEmitter.ts";
import {Options} from "./Options.ts";
import animate from "animateplus";

export default class Carousel extends EventEmitter {
  // 配置项
  private readonly options: Options;


  private readonly el: HTMLElement;
  private pagenationWrapEl: HTMLElement;
  private slideWrapEl: HTMLElement;
  private slides: NodeListOf<Element>;
  private readonly elWidth: number;

  private activeIndex = 0;

  // 是否正在过度
  private isTransiting = false;

  // 定时器函数
  private timeoutFrame: any = fn => setTimeout(fn, 0);

  constructor(el: HTMLElement | string, options?: Partial<Options>) {
    super(['transitionEnd']);
    if (!el) return;
    this.el = (typeof el === 'string' ? document.querySelector(el) : el) as HTMLElement;
    this.elWidth = this.el.offsetWidth;
    this.slideWrapEl = this.el.querySelector('.carousel-wrap') as HTMLElement;

    // 合并选项
    this.options = new Options().merge(options);
    this.init();
  }

  private init() {
    this.initPagenation();

    // 左箭头
    const arrowLeft = document.createElement('div');
    arrowLeft.className = 'carousel-arrow left';

    // 右箭头
    const arrowRight = document.createElement('div');
    arrowRight.className = 'carousel-arrow right';
    [this.pagenationWrapEl, arrowLeft, arrowRight].forEach(item => this.el.appendChild(item));
    this.emitEvent('onInit');

    this._initEvents();
  }

  // 初始化分页器
  private initPagenation() {
    this.slides = this.slideWrapEl.querySelectorAll('.carousel-slide');
    const dotNum = this.slides.length;
    let wrapLen = dotNum;

    if (this.options.loop) {
      const firstNodeCopy = this.slideWrapEl.firstElementChild.cloneNode(true);
      const lastNodeCopy = this.slideWrapEl.lastElementChild.cloneNode(true);
      this.slideWrapEl.insertBefore(lastNodeCopy, this.slideWrapEl.firstElementChild);
      this.slideWrapEl.appendChild(firstNodeCopy);
      wrapLen += 2;
      this.slideWrapEl.style.left = -this.elWidth + 'px';
    }

    this.slideWrapEl.style.width = wrapLen * 100 + '%';

    // 分页器
    this.pagenationWrapEl = document.createElement('div');
    this.pagenationWrapEl.className = 'carousel-pagination-wrap';
    let iEl = '';

    for (let a = 0; a < dotNum; a++) {
      iEl += `<i class="${a === this.activeIndex ? 'active' : ''}"></i>`;
    }
    this.pagenationWrapEl.innerHTML = iEl;
  }


  // 绑定事件
  private _initEvents() {
    const pagenations = this.pagenationWrapEl.children;
    const arrowLeft = this.el.querySelector('.carousel-arrow.left');
    const arrowRight = this.el.querySelector('.carousel-arrow.right');
    arrowLeft.addEventListener('click', () => this.go(this.elWidth));
    arrowRight.addEventListener('click', () => this.go(-this.elWidth));

    for(let a = 0; a < pagenations.length; a++) {
      pagenations[a].addEventListener('click', () => this.go(a));
    }
  }

  private go(offset: number) {
    // const len = this.slideWrapEl.children.length;
    const len = this.slides.length;
    // const newLeft = Number.parseInt(this.slideWrapEl.style.left) + offset + 'px';
      if (this.options.loop) {
        this.loop(offset);
      }else{
        this.slideWrapEl.style.transition = 'left .3s';
        this.changePoi(offset);
      }

      // 01234
      // 0123456

  }

  private changePoi(offset: number) {
    let index = offset < 0 ? this.activeIndex + 1 : this.activeIndex - 1;
    this.activeIndex = (index + this.slides.length) % this.slides.length;
    console.log(this.activeIndex);
    this.slideWrapEl.style.left = -this.activeIndex * this.elWidth + 'px';
    this.updateDots(this.activeIndex);
  }

  private loop(offset: number) {
    if (this.isTransiting) return;
    this.isTransiting = true;
    let index = offset < 0 ? this.activeIndex + 1 : this.activeIndex - 1;
    this.activeIndex = (index + this.slides.length) % this.slides.length;
    const newLeft = this.getLeft(this.slideWrapEl) + offset;
    const time = 300;
    const interval = 10;
    const speed = offset / (time / interval);
    const that = this;
    function go() {
      if ((speed < 0 && that.getLeft(that.slideWrapEl) > newLeft) || (speed > 0 && that.getLeft(that.slideWrapEl) < newLeft)) {
        that.slideWrapEl.style.left = that.getLeft(that.slideWrapEl) + speed + 'px';
        // that.requestAnimationFrame(go);
        setTimeout(go, interval);
      }else {
        // that.slideWrapEl.style.left = newLeft + 'px';
        console.log(newLeft);
        const len = that.slides.length;
        if (newLeft < -(that.elWidth * (len + 1))) {
          that.slideWrapEl.style.left = -that.elWidth + 'px';
          that.activeIndex = 0;
        }
        if (newLeft > -that.elWidth) {
          that.slideWrapEl.style.left = -that.elWidth * len + 'px';
          that.activeIndex = len - 1;
        }
        that.isTransiting = false;
      }
      that.updateDots(that.activeIndex);
    }
    go();
  }


  // 底部圆点
  private updateDots(index: number) {
    // console.log(index);
    const dots = this.pagenationWrapEl.childNodes;
    for (let a = 0; a < dots.length; a++) {
      (<HTMLElement>dots[a]).classList.remove('active');
    }
    (<HTMLElement>dots[index]).classList.add('active');
  }


  private getLeft(el: HTMLElement): number{
    return Number(el.style.left.slice(0, -2));
  }


  private requestAnimationFrame(f: Function) {
    const frame = window.requestAnimationFrame || this.timeoutFrame;
    frame(f);
  }

  // 发射自定义事件
  private emitEvent(type: string, ...args: any[]) {
    if (this.options[type]) {
      this.options[type](args);
    }
  }

}