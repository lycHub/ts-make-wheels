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
}