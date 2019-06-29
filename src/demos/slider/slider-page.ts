import './slider-page.less';
import Slider from "./Slider.ts";
import {SliderVal} from "./Options.ts";

window.addEventListener('DOMContentLoaded', function () {
  console.log('slider');
  const boxes = document.getElementsByClassName('box');
  const slider = new Slider(<HTMLElement>boxes[0], {
    // value: [10, 50],
    // range: true,
    step: 5,
    onChange(val: SliderVal) {
      console.log('val', val);
    }
  });
});