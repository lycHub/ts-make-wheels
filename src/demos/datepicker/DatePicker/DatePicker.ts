import {
  isToday,
  startOfDay,
  startOfMonth,
  lastDayOfMonth,
  compareDesc,
  isAfter,
  isSameDay,
  isWithinRange
} from 'date-fns';
import {HqDate, SelectedDate, YearMonth} from "./definition-datepicker";
import {Options} from "./Options.ts";
import EventEmitter from "../../../EventEmitter.ts";

export class DatePicker extends EventEmitter {
  private currentDate = new Date();
  
  // 日历面板头部显示的年月
  private yearAndMonth: YearMonth;
  
  
  /*
   * 多月日期数据
   * 每个月都是一个日历面板
   * 每个面板都有对应的YearMonth和HqDate[][]
   * */
  private dateArrs: Array<{
    ym: YearMonth;
    date: HqDate[][]
  }>;
  
  // 选中的日期
  private _value: SelectedDate;
  
  // 配置项，一般赋值后不可修改
  private readonly options: Options;
  
  private readonly el: Element;
  
  // 计数，范围选择时，判断点了几次
  private clickNum = 0;
  
  private tempVal = [];
  
  /*
   * Partial是ts自带的映射类型，作用是把options下的每个属性都变成readonly
   * 参考：https://www.tslang.cn/docs/handbook/advanced-types.html
   * */
  constructor(el: Element | string, options?: Partial<{ [key: string]: any }>) {
    super(['change']);
    if (!el) return;
    this.el = typeof el === 'string' ? document.querySelector(el) : el;
    
    // 合并选项
    this.options = new Options().merge(options);
    
    let defaultDate = this.options.defaultDate;
    /*if (defaultDate instanceof Array) {
      defaultDate = this.validDateRange(<Date[]>defaultDate);
    }*/
    if (defaultDate instanceof Array) {
      this._value = this.validDateRange(<[Date, Date]>defaultDate);
    }else {
      this._value = new Date(<Date>defaultDate);
    }
  
    if (this.currentDate) {
      this.yearAndMonth = {
        y: this.currentDate.getFullYear(),
        m: this.currentDate.getMonth()
      };
    }
    
    // 创建日历面板
    this.createMonths();
  
    (<HTMLElement>this.el).style.width = (300 * this.options.monthNum) + 'px';
    this.el.addEventListener('click', this.onPanelClick.bind(this));
  }
  
  
  
  
  
  // 创建多个日历面板
  private createMonths() {
    this.dateArrs = [];
    const month = this.currentDate.getMonth();    // 5，注意比实际月份小1
    const year = this.currentDate.getFullYear();  // 2019
    for (let i = 0; i < this.options.monthNum; i++) {
      let m = month + i;
      let y = year;
      if (m > 11) {
        m = m % 11 - 1;
        y = year + 1;
      }
      this.yearAndMonth = {y, m};
      // console.log(this.yearAndMonth);
      // const currentDate = new Date(y, m, 1);
      
      
      this.dateArrs.push({
        ym: this.yearAndMonth,    // 每个面板的年月
        date: this.createMonth()  // HqDate[][]，是一个类似矩阵的二位数组
      });
    }
    this.initDatePicker();
  }
  
  private initDatePicker() {
    // 单个日历面板的外层dom
    let datePanel = '';
    this.dateArrs.forEach(panel => {
      // 单个日历面板的6行dom
      let dateTr = '';
      panel.date.forEach(item => {
        // 每行有7列天数dom
        let dateTd = '';
        item.forEach(day => {
          let classes = '';
          if (day.isToday) {
            classes += ' today';
          }
          if (day.actived) {
            classes += ' actived';
          }
          if (day.disabled) {
            classes += ' disabled';
          }
          if (day.notInCurrentMonth) {
            classes += ' notInCurrentMonth';
          }
          dateTd += `<td class="${classes}" value="${day.value}">${day.label}</td>`;
        });
        dateTr += `<tr>${dateTd}</tr>`;
      });
      datePanel += `<div class="hq-calendar-day">
                      <div class="hq-calendar-header">
                        <span>${panel.ym.y}年${panel.ym.m + 1}月</span>
                      </div>
                      <table>
                        <thead>
                        <tr>
                          <th>日</th>
                          <th>一</th>
                          <th>二</th>
                          <th>三</th>
                          <th>四</th>
                          <th>五</th>
                          <th>六</th>
                        </tr>
                        </thead>
                        <tbody>
                          ${dateTr}
                        </tbody>
                      </table>
                    </div>`;
    });
    // console.log('datePanel', datePanel);
    this.el.innerHTML = `
      <a class="change-arrow prev-month" dir="prev">&lt;</a>
      <a class="change-arrow next-month">&gt;</a>` + datePanel;
  
    this.emitEvent('onInit');
  }
  
  
  // 创建日历面板
  private createMonth(): HqDate[][] {
    const year = this.yearAndMonth.y;               // 2019
    const month = this.yearAndMonth.m;                 // 6
    const thisMonthDay = new Date(year, month, 1);        // 当月1号
    const thisMonthFirstDay = thisMonthDay.getDay();      // 当月1号周几（0~6）,注意日历布局第一列是周日，对应的是0
    const thisMonthFirstDate = new Date(year, month, -thisMonthFirstDay);  // 日历主体第一行第一列的日期2019-5-26
    return this.generateTable(thisMonthFirstDate, this.options.clickableDate);  //生成日历主体的日期区域
  }
  
  
  // 生成二维矩阵数组
  private generateTable(firstDate: Date, clickableDate: SelectedDate): HqDate[][] {
    const date_arr = [];
    let date = firstDate.getDate(); // 26
    // console.log('_value :', this._value);
    
    // 生成6行7列的主体部分
    for (let i = 0; i < 6; i++) { // 6行
      const line = [];
      for (let j = 0; j < 7; j++) { // 7列
        firstDate.setDate(++date);  // fitstDate不断改变
        date = firstDate.getDate();
        
        const currentMouth = new Date(this.yearAndMonth.y, this.yearAndMonth.m);
  
        // currentMouth对应的第一天和最后一天
        const currentMonthFirst = startOfMonth(currentMouth);
        const currentMonthLast = lastDayOfMonth(currentMouth);
        
        line.push({
          label: date,
          value: new Date(firstDate),
          actived: this.isActive(firstDate),
          isToday: isToday(firstDate),                            // 是当天吗
          disabled: this.isDisabled(firstDate, clickableDate),   // 小于指定日期的不可点
          notInCurrentMonth: !isWithinRange(firstDate, currentMonthFirst, currentMonthLast)   // 是否是当月日期
        });
      }
      date_arr.push(line);
    }
    // console.log(date_arr);
    return date_arr;
  }
  
  // 是否禁止点击
  private isDisabled(date: Date, clickableDate: SelectedDate): boolean {
    if (!clickableDate) return false;
    //  minClickDate && compareDesc(firstDate, startOfDay(minClickDate)) === 1
    if (clickableDate instanceof Array) {
      return !isWithinRange(date, clickableDate[0], clickableDate[1]);
    } else {
      return compareDesc(date, startOfDay(clickableDate)) === 1;
    }
  }
  
  
  // 是否被选中
  isActive(value: Date): boolean {
    if (!this._value) return false;
    let result: boolean;
    if (this.options.range) {
      result = isWithinRange(value, this._value[0], this._value[1])
    } else {
      result = isSameDay(value, <Date>this._value);
    }
    // console.log('result :', result);
    return result;
  }
  
  
  // 如果是范围选择，保证Date[0]在Date[1]之前
  private validDateRange(dateRange: [Date, Date]): [Date, Date] {
    if (!(dateRange instanceof Array)) return dateRange;
    const dateRangeCopy = <[Date, Date]>dateRange.slice();
    if (isAfter(dateRangeCopy[0], dateRangeCopy[1])) {
      [dateRangeCopy[0], dateRangeCopy[1]] = [dateRangeCopy[1], dateRangeCopy[0]];
    }
    return dateRangeCopy;
  }
  
  
  // 点击事件
  onPanelClick(evt: MouseEvent) {
    const dom = <HTMLElement>evt.target;
    if (dom.classList.contains('change-arrow')) {
      this.changeMonth(dom);
    }else if (dom.nodeName.toLowerCase() === 'td') {
      this.selectDay(dom);
    }
  }
  
  
  // 选中日期
  selectDay(td: Element) {
    if (td.classList.contains('disabled')) return;
    const tds = this.el.querySelectorAll('td');
    
    // 移除所有td的actived class
    tds.forEach(item => item.classList.remove('actived'));
    if (this.options.range) { // 如果是范围选择
      this.rangeClick(td, tds);
    }else {
      td.classList.add('actived');
      this._value = new Date(td.getAttribute('value'));
      
      // 发射选中事件
      this.emitEvent('onChange', this._value);
  
      // 发射选中事件，响应DatePicker.on方法
      this.trigger('change', this._value);
    }
  }
  
  private rangeClick(td: Element, tds: NodeList) {
    const tdVal = new Date(td.getAttribute('value'));
    if (++this.clickNum % 2 !== 0) {  // 第一次
      this.tempVal = [];
      td.classList.add('actived');
      this.tempVal[0] = tdVal;
    } else {
      if (isSameDay(tdVal, this.tempVal[0]))  return;
      this.tempVal[1] = tdVal;
      this._value = this.validDateRange(<[Date, Date]>this.tempVal);
      // console.log('range', this._value);
      tds.forEach((item: Element) => {
        const val = new Date(item.getAttribute('value'));
        if(isWithinRange(val, this._value[0], this._value[1])) {
          item.classList.add('actived');
        }
      });
      this.emitEvent('onChange', this._value);
      this.trigger('change', this._value);
    }
  }
  
  // 切换月份
  changeMonth(dom: Element) {
    let m = this.currentDate.getMonth();
    let y = this.currentDate.getFullYear();
    
    if (dom.getAttribute('dir') === 'prev') {
      m--;
      if (m < 0) {
        m = 11;
        y--;
      }
    } else {
      m++;
      if (m > 11) {
        m = m % 11 - 1;
        y++;
      }
    }
    
    this.currentDate = new Date(y, m);
    this.yearAndMonth = {
      y: this.currentDate.getFullYear(),
      m: this.currentDate.getMonth()
    };
    this.createMonths();
  }
  
  // 发射自定义事件
  private emitEvent(type: string, ...args: any[]) {
    if (this.options[type]) {
      this.options[type](this._value, args);
    }
  }
}