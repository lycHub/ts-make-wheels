import './color-picker.less';
import ColorPicker from "./ColorPicker.ts";

window.addEventListener('DOMContentLoaded', function () {
  console.log('color-picker');
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
});