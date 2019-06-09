import { Options } from './Options.ts';
import DomHandler from '../../tools/dom.ts';
import EventEmitter from "../../tools/EventEmitter.ts";

export class ScrollPanel extends EventEmitter {
  readonly options: Options;

  // 记录滚动条y的位置
  private lastPageY: number;

  // 记录滚动条x的位置
  private lastPageX: number;

  // 当前点击的滚动条
  private isXBarClicked: boolean;
  private isYBarClicked: boolean;

  // 要用到的dom集合
  private panelDoms: { [key: string]: HTMLElement };


  // 可视区height / 内容区height
  private scrollYRatio: number;

  // 可视区width / 内容区width
  private scrollXRatio: number;

  // 定时器函数
  private timeoutFrame: any = fn => setTimeout(fn, 0);

  private domHandler: DomHandler;

  // 保存一系列dom绑定事件
  private moveBarH: () => void;
  private onXBarMouseDownH: (e: MouseEvent | TouchEvent) => void;
  private onYBarMouseDownH: (e: MouseEvent | TouchEvent) => void;
  private onDocumentMouseMoveH: (e: MouseEvent | TouchEvent) => void;
  private onDocumentMouseUpH: (e: MouseEvent | TouchEvent) => void;

  private container: HTMLElement;

  constructor(el: Element | string, options?: Partial<{ [key: string]: any }>) {
    super(['dragStart', 'dragMove', 'dragEnd']);
    this.domHandler = new DomHandler();

    // 合并选项
    this.options = new Options().merge(options);
    this.container = <HTMLElement>(typeof el === 'string' ? document.querySelector(el) : el);
    if (!this.container) return;

    this.container.style.position = this.options.style.position;
    this.container.style.overflow = this.options.style.overflow;

    this.initScrollBar();
    this.initBarSize();
    this.initEvents();
  }

  private initScrollBar() {
    const barDom = ` <div class="bar-wrap bar-wrap-x">
    <div class="ui-scrollpanel-bar ui-scrollpanel-bar-x"></div>
  </div>
  <div class="bar-wrap bar-wrap-y">
    <div class="ui-scrollpanel-bar ui-scrollpanel-bar-y"></div>
  </div>`;
    this.container.innerHTML += barDom;


    this.panelDoms = {
      containerViewChild: this.container,
      contentViewChild: this.container.querySelector('.ui-scrollpanel-content'), // 第一个子节点
      xBarWrapViewChild: this.container.querySelector('.bar-wrap-x'),
      xBarViewChild: this.container.querySelector('.ui-scrollpanel-bar-x'),
      yBarWrapViewChild: this.container.querySelector('.bar-wrap-y'),
      yBarViewChild: this.container.querySelector('.ui-scrollpanel-bar-y')
    }
  }




  // 初始化x、y滚动条的尺寸
  private initBarSize() {
    const content = this.panelDoms.contentViewChild;

    // 计算x滚动条width
    // 真实宽度
    const totalWidth = content.scrollWidth;

    // 可视区宽度
    const ownWidth = content.clientWidth;

    // 显示长度（滑块长度） / 总长度（显示）
    this.scrollXRatio = ownWidth / totalWidth;
    const xBar = this.panelDoms.xBarViewChild;
    xBar.style.width = (this.scrollXRatio * 100) + '%';



    // 计算y滚动条height
    const totalHeight = content.scrollHeight;
    const ownHeight = content.clientHeight;
    this.scrollYRatio = ownHeight / totalHeight;
    const yBar = this.panelDoms.yBarViewChild;
    yBar.style.height = (this.scrollYRatio * 100) + '%';
  }


  // 绑定各种事件
  private initEvents() {
    // 用变量保存事件主要是为了保证这些dom事件里的this指向
    // 如果在每个事件函数里单独处理this，那不用这么做也行
    this.moveBarH = this.moveBar.bind(this);
    this.moveBar();
    this.onXBarMouseDownH = this.onXBarMouseDown.bind(this);
    this.onYBarMouseDownH = this.onYBarMouseDown.bind(this);
    this.onDocumentMouseMoveH = this.onDocumentMouseMove.bind(this);
    this.onDocumentMouseUpH = this.onDocumentMouseUp.bind(this);

    this.panelDoms.xBarWrapViewChild.addEventListener('mousedown', this.onXBarMouseDownH);
    this.panelDoms.xBarWrapViewChild.addEventListener('touchstart', this.onXBarMouseDownH);

    this.panelDoms.yBarWrapViewChild.addEventListener('mousedown', this.onYBarMouseDownH);
    this.panelDoms.yBarWrapViewChild.addEventListener('touchstart', this.onYBarMouseDownH);
  
    window.addEventListener('resize', this.moveBarH);
    this.panelDoms.contentViewChild.addEventListener('scroll', this.moveBarH);
  }


   // 改变滚动条位置
   private moveBar() {
    // console.log('moveBar');
    const content = this.panelDoms.contentViewChild;
    if (!this.options.disableX) {
      this.moveXbar();
    }else {
      const xBarWrapViewChild = this.panelDoms.xBarWrapViewChild;
      this.domHandler.addClass(xBarWrapViewChild, 'ui-scrollpanel-hidden');
      this.domHandler.addClass(content, 'disableX');
    }
    if (!this.options.disableY) {
      this.moveYbar();
    }else {
      const yBarWrap = this.panelDoms.yBarWrapViewChild;
      this.domHandler.addClass(yBarWrap, 'ui-scrollpanel-hidden');
      this.domHandler.addClass(content, 'disableY');
    }
  }


  private moveXbar() {
    // console.log('moveXbar');
    const { scrollLeft, scrollWidth } = this.panelDoms.contentViewChild;
    const xBar = this.panelDoms.xBarViewChild;
    const xBarWrap = this.panelDoms.xBarWrapViewChild;
  
    this.requestAnimationFrame(() => {
      if (this.scrollXRatio >= 1) { // 水平方向未超出
        this.domHandler.addClass(xBarWrap, 'ui-scrollpanel-hidden');
      } else {
        this.domHandler.removeClass(xBarWrap, 'ui-scrollpanel-hidden');
        xBar.style.left = (scrollLeft / scrollWidth) * 100 + '%';
      }
    });
  }


  private moveYbar() {
    const { scrollTop, scrollHeight } = this.panelDoms.contentViewChild;
    const yBar = this.panelDoms.yBarViewChild;
    const yBarWrap = this.panelDoms.yBarWrapViewChild;
  
    this.requestAnimationFrame(() => {
    
      if (this.scrollYRatio >= 1) { // 垂直方向未超出
        this.domHandler.addClass(yBarWrap, 'ui-scrollpanel-hidden');
      } else {
        this.domHandler.removeClass(yBarWrap, 'ui-scrollpanel-hidden');
        yBar.style.top = (scrollTop / scrollHeight) * 100 + '%';
      }
    });
  }



  onYBarMouseDown(e: MouseEvent) {
    if (e.cancelable) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    this.isYBarClicked = true;
    this.lastPageY = this.getPoint(e);
    this.bindDocEvent();
    this.emitEvent('onDragStart', {axis: 'y'});
    this.trigger('dragStart', {axis: 'y'});
  }
  
  onXBarMouseDown(e: MouseEvent) {
    // console.log('onXBarMouseDown', this);
    if (e.cancelable) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    this.isXBarClicked = true;
    this.lastPageX = this.getPoint(e);
    this.bindDocEvent();
    this.emitEvent('onDragStart', {axis: 'x'});
    this.trigger('dragStart', {axis: 'y'});
  }
  
  onDocumentMouseMove(e: MouseEvent) {
    // console.log('onDocumentMouseMove', this);
    if (this.isXBarClicked) {
      this.onMouseMoveForXBar(e);
    } else {
      this.onMouseMoveForYBar(e);
    }
  }
  
  // 内容滚动
  onMouseMoveForXBar(e: MouseEvent) {
    // 移动的距离
    const deltaX = this.getPoint(e) - this.lastPageX;
    this.lastPageX = this.getPoint(e);
    // console.log('deltaX', deltaX);
  
    this.requestAnimationFrame(() => {
      /*
      * deltaX * scrollWidth / clientWidth = scrollLeft
      * deltaX * scrollWidth = scrollLeft * clientWidth
      * */
      const content = this.panelDoms.contentViewChild;
      content.scrollLeft += deltaX / this.scrollXRatio;
      this.emitEvent('onDragMove', { axis: 'x', scrollPoi: content.scrollLeft });
      this.trigger('dragMove', { axis: 'x', scrollPoi: content.scrollLeft });
    });
  }
  
  onMouseMoveForYBar(e: MouseEvent) {
    // 与鼠标按下时的差值
    const deltaY = this.getPoint(e) - this.lastPageY;
    this.lastPageY = this.getPoint(e);
    
    this.requestAnimationFrame(() => {
      // console.log(deltaY / this.scrollYRatio);
      const content = this.panelDoms.contentViewChild;
      content.scrollTop += deltaY / this.scrollYRatio;
      this.emitEvent('onDragMove', { axis: 'y', scrollPoi: content.scrollTop });
      this.trigger('dragMove', { axis: 'y', scrollPoi: content.scrollTop });
    });
  }
  
  onDocumentMouseUp(e: Event) {
    // console.log('onDocumentMouseUp', this);
    document.removeEventListener('mousemove', this.onDocumentMouseMoveH);
    document.removeEventListener('mouseup', this.onDocumentMouseUpH);
    this.emitEvent('onDragEnd');
    this.trigger('dragEnd');
    this.isXBarClicked = false;
    this.isYBarClicked = false;
  }
  
  private getPoint(event) {
    return this.isYBarClicked
      ? event.type.indexOf("touch") !== -1
        ? event.touches[0].clientY
        : event.clientY
      : event.type.indexOf("touch") !== -1
        ? event.touches[0].clientX
        : event.clientX;
  }



  private bindDocEvent() {
    const handleEvts = {
      mousemove: this.onDocumentMouseMoveH,
      touchmove: this.onDocumentMouseMoveH,
      mouseup: this.onDocumentMouseUpH,
      touchend: this.onDocumentMouseUpH
    };
    for (const evt in handleEvts) {
      document.addEventListener(evt, handleEvts[evt]);
    }
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