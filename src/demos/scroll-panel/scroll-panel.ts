import "./scroll-panel.less";
import {ScrollPanel} from "./ScrollPanel.ts";

const isCurrentPage = /scroll-panel/.test(location.href);

window.addEventListener('DOMContentLoaded', function () {
  if (isCurrentPage) {
    const spanEls = document.querySelectorAll('.exs .ui-scrollpanel');
    const panel = new ScrollPanel(spanEls[0]);



    const panel2 = new ScrollPanel(spanEls[1], {
      disableX: true,
      onDragStart(arg) {
        console.log('onDragStart', arg);
      },
      onDragMove(arg) {
        console.log('onDragMove', arg);
      },
      onDragEnd(arg) {
        console.log('onDragEnd', arg);
      }
    });


    const panel3 = new ScrollPanel(spanEls[2], {
      disableY: true
    });

    panel3.on('dragStart', function(arg){
      console.log('DragStart', arg);
    });
    panel3.on('dragMove', function(arg){
      console.log('DragMove', arg);
    });
    panel3.on('dragEnd', function(arg){
      console.log('DragEnd', arg);
    });
  }
  
});