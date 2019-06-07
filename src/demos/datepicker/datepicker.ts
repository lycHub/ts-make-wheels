import './datepicker.less';
import {DatePicker} from "./DatePicker/DatePicker.ts";
import {addDays, subDays} from 'date-fns';
const currentDate = new Date();
const clickableDate = [subDays(currentDate, 2), addDays(currentDate, 28)];
const defaultDate = addDays(currentDate, 5);

const defaultDate2 = [currentDate, addDays(currentDate, 30)];
const clickableDate2 = [subDays(currentDate, 2), addDays(currentDate, 58)];


window.addEventListener('DOMContentLoaded', function () {
  const datepickerWrap = document.getElementsByClassName('calendar-wrapper');
  
  const datepicker = new DatePicker(datepickerWrap[0], {
    clickableDate,
    defaultDate,
    monthNum: 3,
    onInit() {
      console.log('onInit');
    },
    onChange(selectedDate: Date) {
      console.log(selectedDate);
    }
  });
  
  datepicker.on('change', function (selectedDate: Date) {
    console.log('change', selectedDate);
  });
  
  const datepicker2 = new DatePicker(datepickerWrap[1], {
    range: true,
    defaultDate: defaultDate2,
    clickableDate: clickableDate2,
    monthNum: 4,
    onInit() {
      console.log('onInit');
    },
    onChange(selectedDate: [Date, Date]) {
      console.log('range', selectedDate);
    }
  });
  
  datepicker2.on('change', function (selectedDate: [Date, Date]) {
    console.log('change', selectedDate);
  });
  
});