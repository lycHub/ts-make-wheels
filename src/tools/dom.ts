export default class DomHandler {
  addClass(element: any, className: string): void {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }
  
  addMultipleClasses(element: any, className: string): void {
    if (element.classList) {
      const styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.classList.add(styles[i]);
      }
      
    } else {
      const styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.className += ' ' + styles[i];
      }
    }
  }
  
  removeClass(element: any, className: string): void {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  
  hasClass(element: any, className: string): boolean {
    if (element.classList)
      return element.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
  }


  appendChild(element: HTMLElement, target: HTMLElement) {
    target.appendChild(element);
  }

  removeChild(element: HTMLElement, target: HTMLElement) {
    target.removeChild(element);
  }

  getWindowScrollTop(): number {
    let doc = document.documentElement;

    // clientTop上边框距离
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  getWindowScrollLeft(): number {
    let doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }


  fadeIn(element: HTMLElement, duration: number) {
    element.style.opacity = '0';

    let last = +new Date();
    let opacity = 0;
    const tick = function () {
      // opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
      opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
      element.style.opacity = opacity.toString();
      last = +new Date();

      if (opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
    tick();
  }

  getOuterWidth(el, margin?) {
    let width = el.offsetWidth;

    if (margin) {
      const style = getComputedStyle(el);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }
}