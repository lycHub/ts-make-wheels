import {Options} from "./Options.ts";
import DomHandler from "../../tools/dom.ts";
import Timeout = NodeJS.Timeout;
import Timer = NodeJS.Timer;

export default class ToolTip {
  readonly options: Options;

  // 宿主元素
  private hostEl: HTMLElement;

  // 动态创建的tooltip元素
  private container: HTMLElement;

  private domHandler: DomHandler;

  private mouseEnterListener: (e: MouseEvent) => void;
  private mouseLeaveListener: (e: MouseEvent) => void;
  private clickListener: (e: MouseEvent) => void;
  private resizeListener: (e: Event) => void;

  // 是否已经显示
  private active = false;

  private showTimeout: any;
  private hideTimeout: any;

  constructor(el: Element | string, options?: Partial<Options>) {
    this.domHandler = new DomHandler();

    // 合并选项
    this.options = new Options().merge(options);
    this.hostEl = <HTMLElement>(typeof el === 'string' ? document.querySelector(el) : el);
    if (!this.hostEl) return;
    this._initEvents();
  }

  private _initEvents() {
    if (this.options.tooltipEvent === 'hover') {
      this.mouseEnterListener = this.onMouseEnter.bind(this);
      this.mouseLeaveListener = this.onMouseLeave.bind(this);
      this.hostEl.addEventListener('mouseenter', this.mouseEnterListener);
      this.hostEl.addEventListener('mouseleave', this.mouseLeaveListener);
    } else {
      this.clickListener = this.onClick.bind(this);
      this.hostEl.addEventListener('click', this.clickListener);
    }
  }

  private activate() {
    this.active = true;
    this.clearHideTimeout();

    if (this.options.showDelay){
      this.showTimeout = setTimeout(() => this.show(), this.options.showDelay);
    } else{
      this.show();
    }

    if (this.options.life) {
      const duration = this.options.showDelay ? this.options.life + this.options.showDelay : this.options.life;
      this.hideTimeout = setTimeout(() => this.hide(), duration);
    }
  }


  private show() {
    if (!this.options.text) return;

    this.create();
    this.align();
    this.domHandler.fadeIn(this.container, 250);
    this.bindDocumentResizeListener();
  }
  private hide() {
    if (this.container && this.container.parentElement) {
      if (this.options.appendTo === 'body') {
        document.body.removeChild(this.container);
      } else if (this.options.appendTo === 'target') {
        this.hostEl.removeChild(this.container);
      } else {
        (<HTMLElement>this.options.appendTo).removeChild(this.container);
      }
    }

    this.unbindDocumentResizeListener();
    this.clearShowTimeout();
    this.clearHideTimeout();
    this.container = null;
  }


  bindDocumentResizeListener() {
    this.resizeListener = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  unbindDocumentResizeListener() {
    window.removeEventListener('resize', this.resizeListener);
    this.resizeListener = null;
  }

  private onWindowResize() {
    this.hide();
  }


  private align() {
    switch (this.options.postion) {
      case 'top':
        this.alignTop();
        break;

      case 'bottom':
        this.alignBottom();
        break;

      case 'left':
        this.alignLeft();
        break;

      case 'right':
        this.alignRight();
        break;
    }
  }

  private alignTop() {
    if (!this.container) return;
    const hostOffset = this.getHostOffset();

    // 相对宿主居中
    const left = hostOffset.left + (this.hostEl.offsetWidth - this.container.offsetWidth) / 2;
    const top = hostOffset.top - this.container.offsetHeight - 6;
    this.container.style.left = left + 'px';
    this.container.style.top = top + 'px';
  }

  private alignBottom() {
    if (!this.container) return;
    const hostOffset = this.getHostOffset();

    // 相对宿主居中
    const left = hostOffset.left + (this.hostEl.offsetWidth - this.container.offsetWidth) / 2;
    // console.log('left', left);
    const top = hostOffset.top + this.hostEl.offsetHeight + 6;
    this.container.style.left = left + 'px';
    this.container.style.top = top + 'px';
  }

  private alignLeft() {
    if (!this.container) return;
    const hostOffset = this.getHostOffset();

    // 相对宿主居中
    const left = hostOffset.left - this.container.offsetWidth - 6;
    const top = hostOffset.top +  (this.hostEl.offsetHeight - this.container.offsetHeight) / 2;
    this.container.style.left = left + 'px';
    this.container.style.top = top + 'px';
  }

  private alignRight() {
    if (!this.container) return;
    const hostOffset = this.getHostOffset();

    // 相对宿主居中
    const left = hostOffset.left + this.hostEl.offsetWidth + 6;
    const top = hostOffset.top +  (this.hostEl.offsetHeight - this.container.offsetHeight) / 2;
    this.container.style.left = left + 'px';
    this.container.style.top = top + 'px';
  }

  // 宿主的left和top
  private getHostOffset(): { left: number; top: number; } {
    if (this.options.appendTo === 'body' || this.options.appendTo === 'target') {
      const offset = this.hostEl.getBoundingClientRect();
      const targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
      const targetTop = offset.top + this.domHandler.getWindowScrollTop();
      return { left: targetLeft, top: targetTop };
    } else {
      return { left: 0, top: 0 };
    }
  }



  // 创建tooltip元素
  private create() {
    this.container = document.createElement('div');
    this.container.className = 'my-tooltip';
    this.container.innerHTML = `<div class="tooltip-text">
      <span>Tooltip</span>
    </div>
    <div class="tooltip-arrow tooltip-arrow-${this.options.postion}"></div>`;


    if (this.options.appendTo === 'body') {
      document.body.appendChild(this.container);
    } else if (this.options.appendTo === 'target') {
      this.hostEl.appendChild(this.container);
    } else {
      (<HTMLElement>this.options.appendTo).appendChild(this.container);
    }
    this.container.style.display = 'block';
  }

  private clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }


  private onMouseEnter() {
    if (!this.container && !this.showTimeout && this.options.tooltipEvent === 'hover') {
      console.log('onMouseEnter');
      this.activate();
    }
  }
  private onMouseLeave() {
    this.deactivate();
  }

  private deactivate() {
    this.active = false;
    this.clearShowTimeout();

    if (this.options.hideDelay) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => this.hide() , this.options.hideDelay);
    } else {
      this.hide();
    }
  }
  private onClick() {
    if (this.options.tooltipEvent === 'click') {
      if (this.active) {
        this.deactivate();
      }else {
        this.activate();
      }
    }
  }
}