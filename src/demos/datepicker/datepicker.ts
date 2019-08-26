import './datepicker.less';
import {DatePicker} from "./DatePicker/DatePicker.ts";
import {addDays, subDays} from 'date-fns';
import {SelectedDate} from "./DatePicker/definition-datepicker";
const isCurrentPage = /datepicker/.test(location.href);
const currentDate = new Date();
const clickableDate: SelectedDate = [subDays(currentDate, 2), addDays(currentDate, 28)];
const defaultDate: SelectedDate = addDays(currentDate, 5);

const defaultDate2: SelectedDate = [currentDate, addDays(currentDate, 30)];
const clickableDate2: SelectedDate = [subDays(currentDate, 2), addDays(currentDate, 58)];


window.addEventListener('DOMContentLoaded', function () {
  if (isCurrentPage) {
    const datepickerWrap = document.getElementsByClassName('calendar-wrapper');
  
    const datepicker = new DatePicker(datepickerWrap[0], {
      clickableDate,
      defaultDate,
      monthNum: 3,
      onInit() {
        // console.log('onInit');
      },
      onChange(selectedDate: Date) {
        // console.log(selectedDate);
      }
    });
    
    datepicker.on('change', function (selectedDate: Date) {
      console.log('on change', selectedDate);
    });
    
    const datepicker2 = new DatePicker(datepickerWrap[1], {
      range: true,
      defaultDate: defaultDate2,
      clickableDate: clickableDate2,
      monthNum: 4,
      onInit() {
        // console.log('onInit');
      },
      onChange(selectedDate: [Date, Date]) {
        // console.log('range', selectedDate);
      }
    });
    
    datepicker2.on('change', function (selectedDate: [Date, Date]) {
      console.log('on change', selectedDate);
    });
  }
  
  
});