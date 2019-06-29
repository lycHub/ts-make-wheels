export type ColorValue = string | { r: number; g: number; b: number } | { h: number; s: number; b: number };
export type ColorFormat = 'hex' | 'rgb' | 'hsb';

export class Options {
  // 可索引类型，该类下的所有属性的key必须是字符串，值为any
  [key: string]: any;

  // 默认颜色
  defaultColor = '#ff0000';
  
  // 绑定的颜色模式，支持"hex", "rgb", "hsb
  format: ColorFormat = 'hex';
  
  // 自定义事件
  onChanging: (value) => void;
  onChange: (value) => void;
  onInit: (value) => void;
  
  
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