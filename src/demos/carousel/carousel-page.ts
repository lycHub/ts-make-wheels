import './carousel-page.less';
import Carousel from './Carousel.ts';

window.addEventListener('DOMContentLoaded', function () {
  const carousels = document.getElementsByClassName('carousel');
  const carousel = new Carousel(<HTMLElement>carousels[0], {
    loop: true,
    onInit() {
      console.log('onInit');
    },
    onTransitionEnd(index: number) {
      console.log('onTransitionEnd：' + index);
    }
  });
  
  
  const carousel2 = new Carousel(<HTMLElement>carousels[1], {
    loop: true,
    autoplay: true,
    delay: 1000
  });
  carousel2.on('transitionEnd', function (index) {
    console.log('transitionEnd：' + index);
  });
});