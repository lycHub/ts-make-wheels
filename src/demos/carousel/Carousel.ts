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
      this.slideWrapEl.insertBefore(firstNodeCopy, this.slideWrapEl.firstElementChild);
      this.slideWrapEl.appendChild(lastNodeCopy);
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
    arrowLeft.addEventListener('click', () => this.go(this.activeIndex - 1));
    arrowRight.addEventListener('click', () => this.go(this.activeIndex + 1));

    for(let a = 0; a < pagenations.length; a++) {
      pagenations[a].addEventListener('click', () => this.go(a));
    }
  }

  private go(index: number) {
    // const len = this.slideWrapEl.children.length;
    const len = this.slides.length;
    /*const target = (index + len) % len;
    console.log(target);
    this.activeIndex = target;*/
    if (index !== this.activeIndex) {
      if (this.options.loop) {

      }else{
        const target = (index + len) % len;
        console.log('target', target);
        this.slideWrapEl.style.left = -this.elWidth * target + 'px';
        this.updateDots(target);
      }

      this.activeIndex = index;

      // 01234
      // 0123456
    }
  }


  // 底部圆点
  private updateDots(index: number) {
    const dots = this.pagenationWrapEl.childNodes;
    for (let a = 0; a < dots.length; a++) {
      (<HTMLElement>dots[a]).classList.remove('active');
    }
    (<HTMLElement>dots[index]).classList.add('active');
  }


  // 发射自定义事件
  private emitEvent(type: string, ...args: any[]) {
    if (this.options[type]) {
      this.options[type](args);
    }
  }

}