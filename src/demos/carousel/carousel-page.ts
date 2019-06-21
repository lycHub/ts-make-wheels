import './carousel-page.less';
import Carousel from './Carousel.ts';

window.addEventListener('DOMContentLoaded', function () {
  console.log('carousel');
  const carousel = new Carousel('.carousel', {
    loop: true,
    onInit() {
      console.log('onInit');
    }
  });
});