import EventEmitter from "../../tools/EventEmitter.ts";
import {Options} from "./Options.ts";

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

  private timer: number;
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

    // 初始化事件
    this._initEvents();
    this.autoPlay();
  }

  // 初始化分页器
  private initPagenation() {
    this.slides = this.slideWrapEl.querySelectorAll('.carousel-slide');
    const dotNum = this.slides.length;
    let wrapLen = dotNum;

    if (this.options.loop) {
      // 复制首尾两个slide分别放在slideWrapEl的尾首
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
    arrowLeft.addEventListener('click', () => this.go(-1));
    arrowRight.addEventListener('click', () => this.go(1));

    for(let a = 0; a < pagenations.length; a++) {
      pagenations[a].addEventListener('click', () => this.navigation(a));
    }

    this.slideWrapEl.addEventListener('webkitTransitionEnd', this.onTransitionEnd.bind(this));
    this.el.addEventListener('mouseenter', this.clearInterval.bind(this));
    this.el.addEventListener('mouseleave', this.autoPlay.bind(this));
    this.emitEvent('onInit');
  }

  private go(dir: number) {
    if (this.isTransiting) return;
    this.isTransiting = true;
    this.slideWrapEl.style.transitionDuration = this.options.speed + 's';
    const len = this.slides.length;
    const index = dir > 0 ? this.activeIndex + 1 : this.activeIndex - 1;
    this.activeIndex = (index + len) % len;
      if (this.options.loop) {
        this.loop(dir);
      }else{
        this.slideWrapEl.style.left = -this.activeIndex * this.elWidth + 'px';
      }
    this.updateDots(this.activeIndex);
  }
  

  private loop(dir: number) {
    const oldLeft = this.getLeft(this.slideWrapEl);
    
    // 这里可以利用下dir的正负
    // const newLeft = dir > 0 ? oldLeft - this.elWidth : oldLeft + this.elWidth;
    const newLeft = oldLeft + this.elWidth * -dir;
    this.slideWrapEl.style.left = newLeft + 'px';
  }

  // 点击圆点导航
  private navigation(index: number) {
    if (this.activeIndex !== index) {
      this.slideWrapEl.style.transitionDuration = this.options.speed + 's';
      this.activeIndex = index;
      this.slideWrapEl.style.left = -(this.activeIndex + 1) * this.elWidth + 'px';
      this.updateDots(index);
    }
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

  private onTransitionEnd() {
    // console.log('end');
    if (this.options.loop) {
      const left = this.getLeft(this.slideWrapEl);
      if (left >= 0) {
        this.slideWrapEl.style.transitionDuration = '0s';
        this.slideWrapEl.style.left = '-4000px';
        // console.log('跳最后一个');
      }else if (left <= -(this.slides.length + 1) * this.elWidth) {
        this.slideWrapEl.style.transitionDuration = '0s';
        this.slideWrapEl.style.left = '-800px';
        // console.log('跳第一个');
      }
    }
    this.isTransiting = false;
    
    // 发射选中事件，响应DatePicker.on方法
    this.trigger('transitionEnd', this.activeIndex);
    
    this.emitEvent('onTransitionEnd', this.activeIndex);
  }
  
  private autoPlay() {
    if (this.options.autoplay) {
      this.timer = setInterval(() => this.go(1), this.options.delay);
    }
  }
  
  private clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private getLeft(el: HTMLElement): number{
    return Number(el.style.left.slice(0, -2));
  }

  // 发射自定义事件
  private emitEvent(type: string, ...args: any[]) {
    if (this.options[type]) {
      this.options[type](args);
    }
  }

}