// 每一个日期（td）该有的属性
export type HqDate = {
  label: number;
  value: Date;
  isToday: boolean;
  disabled: boolean;
  actived: boolean;
  notInCurrentMonth: boolean;
}

export type YearMonth = {
  y: number;
  m: number
}

// 因为日历支持范围选择，所有最终选定的值可能是个Date元祖
export type SelectedDate = Date | [Date, Date];