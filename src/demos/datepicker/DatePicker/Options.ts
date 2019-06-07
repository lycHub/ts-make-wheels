// 日历的配置选项
import {SelectedDate} from "./definition-datepicker";
export class Options {
  // 可索引类型，该类下的所有属性的key必须是字符串，值为any
  [key: string]: any;
  
  
  // 默认只显示一个日历面板（input）
  monthNum = 1;
  
  // 是否范围选择（input）
  range = false;
  
  // 默认选中的日期
  defaultDate: SelectedDate;
  
  // 可点的日期(范围)
  clickableDate: SelectedDate;
  
  onChange: (arg: SelectedDate) => SelectedDate;
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