import './datepicker.less';
import {DatePicker} from "./DatePicker/DatePicker.ts";
/*const dateArr = [];
for (let a = 0; a < 6; a++) {
  dateArr.push(Array(7).fill(a));
}
console.log(dateArr);*/
window.addEventListener('DOMContentLoaded', function () {
  const datepickerWrap = document.getElementsByClassName('calendar-wrapper')[0];
  const datepicker = new DatePicker(datepickerWrap);
  
});