// 自定义事件的函数类型，axis是拖拽的滚动条
type EventFunc = {
  (arg: { axis: string, scrollPoi: number } | string): void;
}

export class Options {
  // 可索引类型，该类下的所有属性的key必须是字符串，值为any
  [key: string]: any;
  
  
  // 最外层dom的样式
  style = {
    position: 'relative',
    overflow: 'hidden'
  };

  // 禁止x,滚动
  disableX = false;
  disableY = false;
  

  // 拖拽结束事件
  onDragEnd: EventFunc;

  // 拖拽中
  onDraging: EventFunc;

  // 开始拖拽
  onDragStart: EventFunc;


  onInit: () => void;
  
  
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