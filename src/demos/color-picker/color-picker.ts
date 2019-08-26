import './color-picker.less';
import ColorPicker from "./ColorPicker.ts";

const isCurrentPage = /color-picker/.test(location.href);

window.addEventListener('DOMContentLoaded', function () {
  if (isCurrentPage) {
    const b = document.getElementsByTagName('b')[0];
    const box = document.getElementsByClassName('color-box')[0] as HTMLElement;
    const cp = new ColorPicker(box, {
      defaultColor: '#49AF4F',
      onInit(color) {
        b.innerText = color;
      },
      onChanging(color) {
        b.innerText = color;
      }
    });
  }
  
});