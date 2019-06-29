/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 169);
/******/ })
/************************************************************************/
/******/ ({

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/tool-tip/tool-tip.less
var tool_tip = __webpack_require__(166);

// CONCATENATED MODULE: ./src/demos/tool-tip/Options.ts
var Options = /** @class */ (function () {
    function Options() {
        this.tooltipEvent = 'hover';
        this.postion = 'bottom';
        // 装载tooltip的容器, target指宿主元素（鼠标移入的dom）
        this.appendTo = 'body';
    }
    // 合并默认配置
    Options.prototype.merge = function (options) {
        if (options) {
            for (var key in options) {
                this[key] = options[key];
            }
        }
        return this;
    };
    return Options;
}());


// EXTERNAL MODULE: ./src/tools/dom.ts
var dom = __webpack_require__(3);

// CONCATENATED MODULE: ./src/demos/tool-tip/Tooltip.ts


var Tooltip_ToolTip = /** @class */ (function () {
    function ToolTip(el, options) {
        // 是否已经显示
        this.active = false;
        this.domHandler = new dom["a" /* default */]();
        // 合并选项
        this.options = new Options().merge(options);
        this.hostEl = (typeof el === 'string' ? document.querySelector(el) : el);
        if (!this.hostEl)
            return;
        this._initEvents();
    }
    ToolTip.prototype._initEvents = function () {
        if (this.options.tooltipEvent === 'hover') {
            this.mouseEnterListener = this.onMouseEnter.bind(this);
            this.mouseLeaveListener = this.onMouseLeave.bind(this);
            this.hostEl.addEventListener('mouseenter', this.mouseEnterListener);
            this.hostEl.addEventListener('mouseleave', this.mouseLeaveListener);
        }
        else {
            this.clickListener = this.onClick.bind(this);
            this.hostEl.addEventListener('click', this.clickListener);
        }
    };
    ToolTip.prototype.activate = function () {
        var _this = this;
        this.active = true;
        this.clearHideTimeout();
        if (this.options.showDelay) {
            this.showTimeout = setTimeout(function () { return _this.show(); }, this.options.showDelay);
        }
        else {
            this.show();
        }
        if (this.options.life) {
            var duration = this.options.showDelay ? this.options.life + this.options.showDelay : this.options.life;
            this.hideTimeout = setTimeout(function () { return _this.hide(); }, duration);
        }
    };
    // 显示
    ToolTip.prototype.show = function () {
        if (!this.options.text)
            return;
        this.create();
        this.align();
        this.domHandler.fadeIn(this.container, 250);
        this.bindDocumentResizeListener();
    };
    // 隐藏
    ToolTip.prototype.hide = function () {
        if (this.container && this.container.parentElement) {
            if (this.options.appendTo === 'body') {
                document.body.removeChild(this.container);
            }
            else if (this.options.appendTo === 'target') {
                this.hostEl.removeChild(this.container);
            }
            else {
                this.options.appendTo.removeChild(this.container);
            }
        }
        this.unbindDocumentResizeListener();
        this.clearShowTimeout();
        this.clearHideTimeout();
        this.container = null;
    };
    ToolTip.prototype.bindDocumentResizeListener = function () {
        this.resizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.resizeListener);
    };
    ToolTip.prototype.unbindDocumentResizeListener = function () {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
    };
    ToolTip.prototype.onWindowResize = function () {
        this.hide();
    };
    // 各方向居中对齐
    ToolTip.prototype.align = function () {
        switch (this.options.postion) {
            case 'top':
                this.alignTop();
                break;
            case 'bottom':
                this.alignBottom();
                break;
            case 'left':
                this.alignLeft();
                break;
            case 'right':
                this.alignRight();
                break;
        }
    };
    ToolTip.prototype.alignTop = function () {
        if (!this.container)
            return;
        var hostOffset = this.getHostOffset();
        // 相对宿主居中
        var left = hostOffset.left + (this.hostEl.offsetWidth - this.container.offsetWidth) / 2;
        var top = hostOffset.top - this.container.offsetHeight - 6;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    ToolTip.prototype.alignBottom = function () {
        if (!this.container)
            return;
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (this.hostEl.offsetWidth - this.container.offsetWidth) / 2;
        var top = hostOffset.top + this.hostEl.offsetHeight + 6;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    ToolTip.prototype.alignLeft = function () {
        if (!this.container)
            return;
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left - this.container.offsetWidth - 6;
        var top = hostOffset.top + (this.hostEl.offsetHeight - this.container.offsetHeight) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    ToolTip.prototype.alignRight = function () {
        if (!this.container)
            return;
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + this.hostEl.offsetWidth + 6;
        var top = hostOffset.top + (this.hostEl.offsetHeight - this.container.offsetHeight) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    // 宿主的left和top
    ToolTip.prototype.getHostOffset = function () {
        if (this.options.appendTo === 'body' || this.options.appendTo === 'target') {
            var offset = this.hostEl.getBoundingClientRect();
            var targetLeft = offset.left + this.domHandler.getWindowScrollLeft();
            var targetTop = offset.top + this.domHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    };
    // 创建tooltip元素
    ToolTip.prototype.create = function () {
        this.container = document.createElement('div');
        this.container.className = 'my-tooltip';
        this.container.innerHTML = "<div class=\"tooltip-text\">\n      <span>Tooltip</span>\n    </div>\n    <div class=\"tooltip-arrow tooltip-arrow-" + this.options.postion + "\"></div>";
        if (this.options.appendTo === 'body') {
            document.body.appendChild(this.container);
        }
        else if (this.options.appendTo === 'target') {
            this.hostEl.appendChild(this.container);
        }
        else {
            this.options.appendTo.appendChild(this.container);
        }
        this.container.style.display = 'block';
    };
    ToolTip.prototype.clearHideTimeout = function () {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    };
    ToolTip.prototype.clearShowTimeout = function () {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    };
    ToolTip.prototype.onMouseEnter = function () {
        if (!this.container && !this.showTimeout && this.options.tooltipEvent === 'hover') {
            console.log('onMouseEnter');
            this.activate();
        }
    };
    ToolTip.prototype.onMouseLeave = function () {
        this.deactivate();
    };
    ToolTip.prototype.deactivate = function () {
        var _this = this;
        this.active = false;
        this.clearShowTimeout();
        if (this.options.hideDelay) {
            this.clearHideTimeout();
            this.hideTimeout = setTimeout(function () { return _this.hide(); }, this.options.hideDelay);
        }
        else {
            this.hide();
        }
    };
    ToolTip.prototype.onClick = function () {
        if (this.options.tooltipEvent === 'click') {
            if (this.active) {
                this.deactivate();
            }
            else {
                this.activate();
            }
        }
    };
    return ToolTip;
}());
/* harmony default export */ var Tooltip = (Tooltip_ToolTip);

// CONCATENATED MODULE: ./src/demos/tool-tip/tool-tip.ts


window.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementsByClassName('demo');
    var tooltip = new Tooltip(el[0], {
        text: 'tooltip',
        postion: 'top'
    });
    var tooltip1 = new Tooltip(el[1], {
        text: 'tooltip1',
        postion: 'right'
    });
    var toolti2 = new Tooltip(el[2], {
        text: 'tooltip2',
        postion: 'left',
        tooltipEvent: 'click'
    });
    var tooltip3 = new Tooltip(el[3], {
        text: 'tooltip3',
        showDelay: 2000
    });
    var tooltip4 = new Tooltip(el[4], {
        text: 'tooltip4',
        life: 3000
    });
});


/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var DomHandler = /** @class */ (function () {
    function DomHandler() {
    }
    DomHandler.prototype.addClass = function (element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    };
    DomHandler.prototype.addMultipleClasses = function (element, className) {
        if (element.classList) {
            var styles = className.split(' ');
            for (var i = 0; i < styles.length; i++) {
                element.classList.add(styles[i]);
            }
        }
        else {
            var styles = className.split(' ');
            for (var i = 0; i < styles.length; i++) {
                element.className += ' ' + styles[i];
            }
        }
    };
    DomHandler.prototype.removeClass = function (element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    };
    DomHandler.prototype.hasClass = function (element, className) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    };
    DomHandler.prototype.appendChild = function (element, target) {
        target.appendChild(element);
    };
    DomHandler.prototype.removeChild = function (element, target) {
        target.removeChild(element);
    };
    DomHandler.prototype.getWindowScrollTop = function () {
        var doc = document.documentElement;
        // clientTop上边框距离
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    };
    DomHandler.prototype.getWindowScrollLeft = function () {
        var doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    };
    DomHandler.prototype.fadeIn = function (element, duration) {
        element.style.opacity = '0';
        var last = +new Date();
        var opacity = 0;
        var tick = function () {
            // opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
            opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity.toString();
            last = +new Date();
            if (opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    };
    DomHandler.prototype.getOuterWidth = function (el, margin) {
        var width = el.offsetWidth;
        if (margin) {
            var style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    };
    DomHandler.prototype.addEvents = function (target, obj) {
        for (var attr in obj) {
            target.addEventListener(attr, obj[attr]);
        }
    };
    DomHandler.prototype.removeEvents = function (target, obj) {
        for (var attr in obj) {
            target.removeEventListener(attr, obj[attr]);
        }
    };
    DomHandler.prototype.getStyle = function (element, styleName) {
        if (!element || !styleName)
            return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
            styleName = 'cssFloat';
        }
        try {
            var computed = document.defaultView.getComputedStyle(element, '');
            return element.style[styleName] || computed ? computed[styleName] : null;
        }
        catch (e) {
            return element.style[styleName];
        }
    };
    return DomHandler;
}());
/* harmony default export */ __webpack_exports__["a"] = (DomHandler);
function camelCase(name) {
    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(/^moz([A-Z])/, 'Moz$1');
}


/***/ })

/******/ });
//# sourceMappingURL=5.453db34c3f.js.map