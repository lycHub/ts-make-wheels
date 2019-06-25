type Position = 'top' | 'bottom' | 'left' | 'right';

export class Options {
  // 可索引类型，该类下的所有属性的key必须是字符串，值为any
  [key: string]: any;


  tooltipEvent: 'hover' | 'click' = 'hover';

  postion: Position = 'bottom';

  // 装载tooltip的容器, target指宿主元素（鼠标移入的dom）
  appendTo: 'body' | 'target' | HTMLElement = 'body';

  // 显示或消失的持续时间
  showDelay: number;
  hideDelay: number;

  // 自动消失的时间
  life: number;

  text: string;
  
  
  // 合并默认配置
  merge(options?: { [key: string]: any }) {
    if (options) {
      for (let key in options) {
        this[key] = options[key];
      }
    }
    return this;
  }
}