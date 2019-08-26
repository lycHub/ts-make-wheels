import "./tool-tip.less";
import ToolTip from "./Tooltip.ts";

const isCurrentPage = /tool-tip/.test(location.href);

window.addEventListener('DOMContentLoaded', function () {
  if (isCurrentPage) {
    const el = document.getElementsByClassName('demo');
    const tooltip = new ToolTip(el[0], {
      text: 'tooltip',
      postion: 'top'
    });
  
    const tooltip1 = new ToolTip(el[1], {
      text: 'tooltip1',
      postion: 'right'
    });
  
    const toolti2 = new ToolTip(el[2], {
      text: 'tooltip2',
      postion: 'left',
      tooltipEvent: 'click'
    });
  
    const tooltip3 = new ToolTip(el[3], {
      text: 'tooltip3',
      showDelay: 2000
    });
  
    const tooltip4 = new ToolTip(el[4], {
      text: 'tooltip4',
      life: 3000
    });
  }
 
});