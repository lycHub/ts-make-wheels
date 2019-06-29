export type SliderVal = number | number[];

export class Options {
  // 可索引类型，该类下的所有属性的key必须是字符串，值为any
  [key: string]: any;

  step = 1;

  // 当设置了step时，是否按照step移动
  accordingToStep = true;
  
  // 最小值
  min = 0;

  // 最大值
  max = 100;

  value: SliderVal = 0;

  // 是否双滑块
  range = false;

  // 是否显示断点
  showDots = false;
  
  // 自定义事件
  onChanging: (value: SliderVal) => void;
  onChange: (value: SliderVal) => void;
  onInit: (value: SliderVal) => void;
  
  
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