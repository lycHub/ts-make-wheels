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
export class DatePicker {
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
  _value: SelectedDate;
  
  // 配置项，一般赋值后不可修改
  private readonly options: Options;
  
  private readonly el: Element;
  
  /*
   * Partial是ts自带的映射类型，作用是把Options下的每个属性都变成可读的
   * 参考：https://www.tslang.cn/docs/handbook/advanced-types.html
   * */
  constructor(el: Element | string, options?: Partial<Options>) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el;
    this.options = new Options().merge(options);
    this.createMonths();
  }
  
  
  // 创建多个日历面板
  private createMonths() {
    this.dateArrs = [];
    const month = this.currentDate.getMonth();    // 5
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
        ym: this.yearAndMonth,
        date: this.createMonth()  // HqDate[][]
      });
    }
    console.log('dateArrs', this.dateArrs);
    // this.enableChangeMonth = true;
    this.initDatePicker();
  }
  
  private initDatePicker() {
    let datePanel = '';
    this.dateArrs.forEach(panel => {
      let dateTr = '';
      panel.date.forEach(item => {
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
          dateTd += `<td class="${classes}">${day.label}</td>`;
        });
        dateTr += `<tr>${dateTd}</tr>`;
        datePanel = `<div class="hq-calendar-day" *ngFor="let dates of hqDate_arrs;">
                      <div class="hq-calendar-header">
                        <span>${panel.ym.y}年${panel.ym.y + 1}月</span>
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
    });
    // console.log('datePanel', datePanel);
    this.el.innerHTML = datePanel;
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
        
        // 当月第一天和最后一天
        const currentMonthFirst = startOfMonth(this.currentDate);
        const currentMonthLast = lastDayOfMonth(this.currentDate);
        // const value = format(firstDate, 'YYYY-MM-DD');
        
        // console.log('isSameDay', isSameDay(firstDate, this._value));
        line.push({
          label: date,
          value: new Date(firstDate),
          actived: this.isActive(firstDate),
          isToday: isToday(firstDate),                            // 是当天吗
          disabled: this.isDisabled(firstDate, clickableDate),   // 小于指定日期的不可点
          notInCurrentMonth: isWithinRange(firstDate, currentMonthFirst, currentMonthLast[1])   // 是否是当月日期
        });
      }
      date_arr.push(line);
    }
    // console.log(date_arr);
    return date_arr;
  }
  
  private isDisabled(date: Date, clickableDate: SelectedDate): boolean {
    if (!clickableDate) return false;
    //  minClickDate && compareDesc(firstDate, startOfDay(minClickDate)) === 1
    if (clickableDate instanceof Array) {
      return !isWithinRange(date, clickableDate[0], clickableDate[1]);
    } else {
      return compareDesc(date, startOfDay(clickableDate)) === 1;
    }
  }
  
  
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
  
  
  // 如果是范围选择，Date[0]Date[1]之前
  private validDateRange(dateRange: Date[]): Date[] {
    if (!dateRange) return [];
    const dateRangeCopy = dateRange.slice();
    if (isAfter(dateRangeCopy[0], dateRangeCopy[1])) {
      [dateRangeCopy[0], dateRangeCopy[1]] = [dateRangeCopy[1], dateRangeCopy[0]];
    }
    return dateRangeCopy;
  }
  
  
  /*private getElement(el: HTMLElement | string): HTMLElement {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }*/
}