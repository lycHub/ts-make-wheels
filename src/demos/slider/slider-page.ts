import './slider-page.less';
import Slider from "./Slider.ts";
import {SliderVal} from "./Options.ts";

window.addEventListener('DOMContentLoaded', function () {
  console.log('slider 6-29');
  const secs = document.getElementsByClassName('sec');
  const boxes = document.getElementsByClassName('box');
  const slider = new Slider(<HTMLElement>boxes[0], {
    value: [10, 90],
    range: true,
    onInit(val: SliderVal) {
      const b = secs[0].getElementsByTagName('b');
      b[0].innerText = val[0];
      b[1].innerText = val[1];
    }
  });

  slider.on('changing', function (val: SliderVal) {
    const b = secs[0].getElementsByTagName('b');
    b[0].innerText = val[0];
    b[1].innerText = val[1];
  });



  const slider2 = new Slider(<HTMLElement>boxes[1], {
    value: [10, 90],
    range: true,
    step: 10,
    showDots: true,
    onInit(val: SliderVal) {
      const b = secs[1].getElementsByTagName('b');
      b[0].innerText = val[0];
      b[1].innerText = val[1];
    }
  });

  slider2.on('change', function (val: SliderVal) {
    const b = secs[1].getElementsByTagName('b');
    b[0].innerText = val[0];
    b[1].innerText = val[1];
  });


  const slider3 = new Slider(<HTMLElement>boxes[2], {
    value: [2, 7],
    range: true,
    min: 1,
    max: 10,
    onInit(val: SliderVal) {
      const b = secs[2].getElementsByTagName('b');
      b[0].innerText = val[0];
      b[1].innerText = val[1];
    }
  });

  slider3.on('changing', function (val: SliderVal) {
    const b = secs[2].getElementsByTagName('b');
    b[0].innerText = val[0];
    b[1].innerText = val[1];
  });
});