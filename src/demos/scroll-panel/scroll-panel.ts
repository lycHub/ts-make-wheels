import "./scroll-panel.less";
import ScrollPanel from "./ScrollPanel.ts";
console.log(1);
window.addEventListener('DOMContentLoaded', function () {
  const panel = new ScrollPanel('.ui-scrollpanel', {
    // disableX: true,
    disableY: true,
  });
});