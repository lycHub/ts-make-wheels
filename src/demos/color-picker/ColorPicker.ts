import EventEmitter from "../../tools/EventEmitter.ts";
import {ColorValue, Options} from "./Options.ts";
import DomHandler from "../../tools/dom.ts";

// 左面板尺寸
const REC = {
  width: 150,
  height: 150
};


export default class ColorPicker extends EventEmitter {
  // 配置项
  private readonly options: Options;

  // 容器
  private el: HTMLElement;
  
  // 左侧面板
  private colorSelector: HTMLElement;
  
  // 左侧圆点
  private colorHandle : HTMLElement;
  
  // 右侧面板
  private hueSelector: HTMLElement;
  
  // 右侧圆点
  private hueHandle : HTMLElement;
  
  // 当前value
  private value: any;
  
  // 是否正在左面板选取
  private colorDragging = false;
  
  // 是否正在右面板选取
  private hueDragging = false;
  
  private moveEvents = {};

  // 事件句柄
  private handleMove: (e: MouseEvent) => void;
  private handleEnd: (e: MouseEvent) => void;
  
  private domHandle: DomHandler;

  constructor(el: HTMLElement | string, options?: Partial<Options>) {
    super(['changing', 'change']);
    if (!el) return;
    this.el = (typeof el === 'string' ? document.querySelector(el) : el) as HTMLElement;

    this.colorSelector = <HTMLElement>this.el.querySelector('.ui-colorpicker-color-selector');
    this.colorHandle = <HTMLElement>this.colorSelector.querySelector('.ui-colorpicker-color-handle');
    this.hueSelector = <HTMLElement>this.el.querySelector('.ui-colorpicker-hue');
    this.hueHandle = <HTMLElement>this.hueSelector.querySelector('.ui-colorpicker-hue-handle');
    
    // 合并选项
    this.options = new Options().merge(options);
 
    if (this.options.defaultColor) {
      this.initValue(this.options.defaultColor);
    }
  
    this.domHandle = new DomHandler();
    
    this.initEvents();
    this.emitEvent('onInit', this.getValueToUpdate);
  }
  
  
  private initEvents() {
    this.colorSelector.addEventListener('mousedown', this.onColorMousedown.bind(this));
    this.hueSelector.addEventListener('mousedown', this.onHueMousedown.bind(this));
  }
  
  
  // 按下左侧面板
  private onColorMousedown(event: MouseEvent) {
    this.bindDocumentMouseListener();
    // this.bindDocumentMouseupListener();
  
    this.colorDragging = true;
    this.pickColor(event);
  }
  
  // 点击右侧面板
  onHueMousedown(event: MouseEvent) {
    this.bindDocumentMouseListener();
    
    this.hueDragging = true;
    this.pickHue(event);
  }
  
  private bindDocumentMouseListener() {
    this.handleMove = this.onMouseMove.bind(this);
    this.handleEnd = this.onMouseUp.bind(this);
    this.moveEvents = {
      mousemove: this.handleMove,
      mouseup: this.handleEnd,
    }
    this.domHandle.addEvents(window, this.moveEvents);
  }
  
  private onMouseMove(event: MouseEvent) {
    if (this.colorDragging) {
      this.pickColor(event);
    }
  
    if (this.hueDragging) {
      this.pickHue(event);
    }
  }
  
  private onMouseUp() {
    this.colorDragging = false;
    this.hueDragging = false;
    this.domHandle.removeEvents(window, this.moveEvents);
    this.emitEvent('change', this.getValueToUpdate);
    this.trigger('change', this.getValueToUpdate);
  }
  
  // 左侧取色
  private pickColor(event: MouseEvent) {
    const rect = this.colorSelector.getBoundingClientRect();
    // console.log(rect);
    const top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    const left = rect.left + document.body.scrollLeft;
    
    // 由于validateHSB会限制取值范围(不能>100), 所以取这种算法
    const saturation = Math.floor(100 * (Math.max(0, Math.min(REC.width, (event.pageX - left)))) / REC.width);
    const brightness = Math.floor(100 * (REC.height - Math.max(0, Math.min(REC.height, (event.pageY - top)))) / REC.height);
    this.value = this.validateHSB({
      h: this.value.h,
      s: saturation,
      b: brightness
    });
    
    this.updateUI();
    this.emitEvent('onChanging', this.getValueToUpdate);
    this.trigger('changing', this.getValueToUpdate);
  }
  
  
  // 右侧取色
  private pickHue(event: MouseEvent) {
    const top: number = this.hueSelector.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
    this.value = this.validateHSB({
      h: Math.floor(360 * (REC.height - Math.max(0, Math.min(REC.height, (event.pageY - top)))) / REC.height),
      s: this.value.s,
      b: this.value.b
    });
    
    this.updateColorSelector();
    this.updateUI();
    this.emitEvent('onChanging', this.getValueToUpdate);
    this.trigger('changing', this.getValueToUpdate);
  }
  
  
  private initValue(value: ColorValue) {
    switch (this.options.format) {
      case 'hex':
        this.value = this.HEXtoHSB(value);
        break;
    
      case 'rgb':
        this.value = this.RGBtoHSB(value);
        break;
    
      case 'hsb':
        this.value = value;
        break;
    }
  
    this.updateColorSelector();
    this.updateUI();
  }
  
  get getValueToUpdate() {
    let val: any;
    switch (this.options.format) {
      case 'hex':
        val = '#' + this.HSBtoHEX(this.value);
        break;
    
      case 'rgb':
        val = this.HSBtoRGB(this.value);
        break;
    
      default:
        val = this.value;
        break;
    }
  
    return val;
  }
  
  // 跟新左侧背景颜色
  private updateColorSelector() {
    if (this.colorSelector) {
      const hsb = {
        s: 100,
        b: 100,
        h: this.value.h,
      };
   
      this.colorSelector.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
    }
  }
  
  private updateUI() {
    if (this.colorHandle) {
      this.colorHandle.style.left =  Math.floor(REC.width * this.value.s / 100) + 'px';
      this.colorHandle.style.top =  Math.floor(REC.height * (100 - this.value.b) / 100) + 'px';
      this.hueHandle.style.top = Math.floor(REC.height - (REC.height * this.value.h / 360)) + 'px';
    }
  }
  
  
  // string转HSB
  private HEXtoHSB(hex) {
    return this.RGBtoHSB(this.HEXtoRGB(hex));
  }
  
  // string转RGB
  private HEXtoRGB(hex) {
    let hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
    return {r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF)};
  }
  
  
  // hsb转string
  private HSBtoHEX(hsb) {
    return this.RGBtoHEX(this.HSBtoRGB(hsb));
  }
  
  
  // rgb转string
  private RGBtoHEX(rgb) {
    const hex = [
      rgb.r.toString(16),
      rgb.g.toString(16),
      rgb.b.toString(16)
    ];
    
    for (const key in hex) {
      if (hex[key].length === 1) {
        hex[key] = '0' + hex[key];
      }
    }
    return hex.join('');
  }
  
  // RGB转HSB
  private RGBtoHSB(rgb) {
    const hsb = {
      h: 0,
      s: 0,
      b: 0
    };
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const delta = max - min;
    hsb.b = max;
    
    hsb.s = max != 0 ? 255 * delta / max : 0;
    if (hsb.s != 0) {
      if (rgb.r == max) {
        hsb.h = (rgb.g - rgb.b) / delta;
      } else if (rgb.g == max) {
        hsb.h = 2 + (rgb.b - rgb.r) / delta;
      } else {
        hsb.h = 4 + (rgb.r - rgb.g) / delta;
      }
    } else {
      hsb.h = -1;
    }
    hsb.h *= 60;
    if (hsb.h < 0) {
      hsb.h += 360;
    }
    hsb.s *= 100/255;
    hsb.b *= 100/255;
    return hsb;
  }
  
  // hsb转rgb
  private HSBtoRGB(hsb) {
    let rgb = {
      r: null, g: null, b: null
    };
    let h = Math.round(hsb.h);
    let s = Math.round(hsb.s * 255 / 100);
    let v = Math.round(hsb.b * 255 / 100);
    
    if (s === 0) {
      rgb = {
        r: v,
        g: v,
        b: v
      };
    } else {
      const t1 = v;
      const t2 = (255 - s) * v / 255;
      const t3 = (t1 - t2) * ( h % 60) / 60;
      if (h === 360) h = 0;
      if (h < 60) {rgb.r = t1;	rgb.b = t2; rgb.g = t2 + t3}
      else if (h < 120) {rgb.g = t1; rgb.b = t2;	rgb.r = t1 - t3}
      else if (h < 180) {rgb.g = t1; rgb.r = t2;	rgb.b = t2 + t3}
      else if (h < 240) {rgb.b = t1; rgb.r = t2;	rgb.g = t1 - t3}
      else if (h < 300) {rgb.b = t1; rgb.g = t2;	rgb.r = t2 + t3}
      else if (h < 360) {rgb.r = t1; rgb.g = t2;	rgb.b = t1 - t3}
      else {rgb.r = 0; rgb.g = 0;	rgb.b = 0}
    }
    return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
  }
  
  
  private validateHSB(hsb) {
    return {
      h: Math.min(360, Math.max(0, hsb.h)),
      s: Math.min(100, Math.max(0, hsb.s)),
      b: Math.min(100, Math.max(0, hsb.b))
    };
  }
  
  private validateRGB(rgb) {
    return {
      r: Math.min(255, Math.max(0, rgb.r)),
      g: Math.min(255, Math.max(0, rgb.g)),
      b: Math.min(255, Math.max(0, rgb.b))
    };
  }
  
  private validateHEX(hex) {
    const len = 6 - hex.length;
    if (len > 0) {
      const o = [];
      for (let i = 0; i < len; i++) {
        o.push('0');
      }
      o.push(hex);
      hex = o.join('');
    }
    return hex;
  }
  
  
  // 发射自定义事件
  private emitEvent(type: string, args: any) {
    if (this.options[type]) {
      this.options[type](args);
    }
  }
}