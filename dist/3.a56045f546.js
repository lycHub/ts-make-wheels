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
/******/ 	return __webpack_require__(__webpack_require__.s = 173);
/******/ })
/************************************************************************/
/******/ ({

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/scroll-panel/scroll-panel.less
var scroll_panel = __webpack_require__(165);

// CONCATENATED MODULE: ./src/demos/scroll-panel/Options.ts
var Options = /** @class */ (function () {
    function Options() {
        // 最外层dom的样式
        this.style = {
            position: 'relative',
            overflow: 'hidden'
        };
        // 禁止x,滚动
        this.disableX = false;
        this.disableY = false;
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

// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(2);

// CONCATENATED MODULE: ./src/demos/scroll-panel/ScrollPanel.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ScrollPanel_ScrollPanel = /** @class */ (function (_super) {
    __extends(ScrollPanel, _super);
    function ScrollPanel(el, options) {
        var _this = _super.call(this, ['dragStart', 'dragMove', 'dragEnd']) || this;
        // 定时器函数
        _this.timeoutFrame = function (fn) { return setTimeout(fn, 0); };
        _this.domHandler = new dom["a" /* default */]();
        // 合并选项
        _this.options = new Options().merge(options);
        _this.container = (typeof el === 'string' ? document.querySelector(el) : el);
        if (!_this.container)
            return _this;
        _this.container.style.position = _this.options.style.position;
        _this.container.style.overflow = _this.options.style.overflow;
        _this.initScrollBar();
        _this.initBarSize();
        _this.initEvents();
        return _this;
    }
    ScrollPanel.prototype.initScrollBar = function () {
        var barDom = " <div class=\"bar-wrap bar-wrap-x\">\n    <div class=\"ui-scrollpanel-bar ui-scrollpanel-bar-x\"></div>\n  </div>\n  <div class=\"bar-wrap bar-wrap-y\">\n    <div class=\"ui-scrollpanel-bar ui-scrollpanel-bar-y\"></div>\n  </div>";
        this.container.innerHTML += barDom;
        this.panelDoms = {
            containerViewChild: this.container,
            contentViewChild: this.container.querySelector('.ui-scrollpanel-content'),
            xBarWrapViewChild: this.container.querySelector('.bar-wrap-x'),
            xBarViewChild: this.container.querySelector('.ui-scrollpanel-bar-x'),
            yBarWrapViewChild: this.container.querySelector('.bar-wrap-y'),
            yBarViewChild: this.container.querySelector('.ui-scrollpanel-bar-y')
        };
    };
    // 初始化x、y滚动条的尺寸
    ScrollPanel.prototype.initBarSize = function () {
        var content = this.panelDoms.contentViewChild;
        // 计算x滚动条width
        // 真实宽度
        var totalWidth = content.scrollWidth;
        // 可视区宽度
        var ownWidth = content.clientWidth;
        // 显示长度（滑块长度） / 总长度（显示）
        this.scrollXRatio = ownWidth / totalWidth;
        var xBar = this.panelDoms.xBarViewChild;
        xBar.style.width = (this.scrollXRatio * 100) + '%';
        // 计算y滚动条height
        var totalHeight = content.scrollHeight;
        var ownHeight = content.clientHeight;
        this.scrollYRatio = ownHeight / totalHeight;
        var yBar = this.panelDoms.yBarViewChild;
        yBar.style.height = (this.scrollYRatio * 100) + '%';
    };
    // 绑定各种事件
    ScrollPanel.prototype.initEvents = function () {
        // 用变量保存事件主要是为了保证这些dom事件里的this指向
        // 如果在每个事件函数里单独处理this，那不用这么做也行，但是移除事件监听可能会有问题
        this.moveBarH = this.moveBar.bind(this);
        this.moveBar();
        this.onXBarMouseDownH = this.onXBarMouseDown.bind(this);
        this.onYBarMouseDownH = this.onYBarMouseDown.bind(this);
        this.onDocumentMouseMoveH = this.onDocumentMouseMove.bind(this);
        this.onDocumentMouseUpH = this.onDocumentMouseUp.bind(this);
        this.panelDoms.xBarWrapViewChild.addEventListener('mousedown', this.onXBarMouseDownH);
        this.panelDoms.xBarWrapViewChild.addEventListener('touchstart', this.onXBarMouseDownH);
        this.panelDoms.yBarWrapViewChild.addEventListener('mousedown', this.onYBarMouseDownH);
        this.panelDoms.yBarWrapViewChild.addEventListener('touchstart', this.onYBarMouseDownH);
        window.addEventListener('resize', this.moveBarH);
        this.panelDoms.contentViewChild.addEventListener('scroll', this.moveBarH);
    };
    // 改变滚动条位置
    ScrollPanel.prototype.moveBar = function () {
        // console.log('moveBar');
        var content = this.panelDoms.contentViewChild;
        if (!this.options.disableX) {
            this.moveXbar();
        }
        else {
            var xBarWrapViewChild = this.panelDoms.xBarWrapViewChild;
            this.domHandler.addClass(xBarWrapViewChild, 'ui-scrollpanel-hidden');
            this.domHandler.addClass(content, 'disableX');
        }
        if (!this.options.disableY) {
            this.moveYbar();
        }
        else {
            var yBarWrap = this.panelDoms.yBarWrapViewChild;
            this.domHandler.addClass(yBarWrap, 'ui-scrollpanel-hidden');
            this.domHandler.addClass(content, 'disableY');
        }
    };
    ScrollPanel.prototype.moveXbar = function () {
        var _this = this;
        // console.log('moveXbar');
        var _a = this.panelDoms.contentViewChild, scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth;
        var xBar = this.panelDoms.xBarViewChild;
        var xBarWrap = this.panelDoms.xBarWrapViewChild;
        this.requestAnimationFrame(function () {
            if (_this.scrollXRatio >= 1) { // 水平方向未超出
                _this.domHandler.addClass(xBarWrap, 'ui-scrollpanel-hidden');
            }
            else {
                _this.domHandler.removeClass(xBarWrap, 'ui-scrollpanel-hidden');
                xBar.style.left = (scrollLeft / scrollWidth) * 100 + '%';
            }
        });
    };
    ScrollPanel.prototype.moveYbar = function () {
        var _this = this;
        var _a = this.panelDoms.contentViewChild, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight;
        var yBar = this.panelDoms.yBarViewChild;
        var yBarWrap = this.panelDoms.yBarWrapViewChild;
        this.requestAnimationFrame(function () {
            if (_this.scrollYRatio >= 1) { // 垂直方向未超出
                _this.domHandler.addClass(yBarWrap, 'ui-scrollpanel-hidden');
            }
            else {
                _this.domHandler.removeClass(yBarWrap, 'ui-scrollpanel-hidden');
                yBar.style.top = (scrollTop / scrollHeight) * 100 + '%';
            }
        });
    };
    ScrollPanel.prototype.onYBarMouseDown = function (e) {
        if (e.cancelable) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.isYBarClicked = true;
        this.lastPageY = this.getPoint(e);
        this.bindDocEvent();
        this.emitEvent('onDragStart', { axis: 'y' });
        this.trigger('dragStart', { axis: 'y' });
    };
    ScrollPanel.prototype.onXBarMouseDown = function (e) {
        // console.log('onXBarMouseDown', this);
        if (e.cancelable) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.isXBarClicked = true;
        this.lastPageX = this.getPoint(e);
        this.bindDocEvent();
        this.emitEvent('onDragStart', { axis: 'x' });
        this.trigger('dragStart', { axis: 'y' });
    };
    ScrollPanel.prototype.onDocumentMouseMove = function (e) {
        // console.log('onDocumentMouseMove', this);
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else {
            this.onMouseMoveForYBar(e);
        }
    };
    // 内容滚动
    ScrollPanel.prototype.onMouseMoveForXBar = function (e) {
        var _this = this;
        // 移动的距离
        var deltaX = this.getPoint(e) - this.lastPageX;
        this.lastPageX = this.getPoint(e);
        // console.log('deltaX', deltaX);
        this.requestAnimationFrame(function () {
            /*
            * deltaX * scrollWidth / clientWidth = scrollLeft
            * deltaX * scrollWidth = scrollLeft * clientWidth
            * scrollLeft / scrollWidth = deltaX / clientWidth
            * */
            var content = _this.panelDoms.contentViewChild;
            content.scrollLeft += deltaX / _this.scrollXRatio;
            _this.emitEvent('onDragMove', { axis: 'x', scrollPoi: content.scrollLeft });
            _this.trigger('dragMove', { axis: 'x', scrollPoi: content.scrollLeft });
        });
    };
    ScrollPanel.prototype.onMouseMoveForYBar = function (e) {
        var _this = this;
        // 与鼠标按下时的差值
        var deltaY = this.getPoint(e) - this.lastPageY;
        this.lastPageY = this.getPoint(e);
        this.requestAnimationFrame(function () {
            // console.log(deltaY / this.scrollYRatio);
            var content = _this.panelDoms.contentViewChild;
            content.scrollTop += deltaY / _this.scrollYRatio;
            _this.emitEvent('onDragMove', { axis: 'y', scrollPoi: content.scrollTop });
            _this.trigger('dragMove', { axis: 'y', scrollPoi: content.scrollTop });
        });
    };
    ScrollPanel.prototype.onDocumentMouseUp = function (e) {
        // console.log('onDocumentMouseUp', this);
        document.removeEventListener('mousemove', this.onDocumentMouseMoveH);
        document.removeEventListener('mouseup', this.onDocumentMouseUpH);
        this.emitEvent('onDragEnd');
        this.trigger('dragEnd');
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    };
    ScrollPanel.prototype.getPoint = function (event) {
        return this.isYBarClicked
            ? event.type.indexOf("touch") !== -1
                ? event.touches[0].clientY
                : event.clientY
            : event.type.indexOf("touch") !== -1
                ? event.touches[0].clientX
                : event.clientX;
    };
    ScrollPanel.prototype.bindDocEvent = function () {
        var handleEvts = {
            mousemove: this.onDocumentMouseMoveH,
            touchmove: this.onDocumentMouseMoveH,
            mouseup: this.onDocumentMouseUpH,
            touchend: this.onDocumentMouseUpH
        };
        for (var evt in handleEvts) {
            document.addEventListener(evt, handleEvts[evt]);
        }
    };
    ScrollPanel.prototype.requestAnimationFrame = function (f) {
        var frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    };
    // 发射自定义事件
    ScrollPanel.prototype.emitEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.options[type]) {
            this.options[type](args);
        }
    };
    return ScrollPanel;
}(EventEmitter["a" /* default */]));


// CONCATENATED MODULE: ./src/demos/scroll-panel/scroll-panel.ts


window.addEventListener('DOMContentLoaded', function () {
    var spanEls = document.querySelectorAll('.exs .ui-scrollpanel');
    var panel = new ScrollPanel_ScrollPanel(spanEls[0]);
    var panel2 = new ScrollPanel_ScrollPanel(spanEls[1], {
        disableX: true,
        onDragStart: function (arg) {
            console.log('onDragStart', arg);
        },
        onDragMove: function (arg) {
            console.log('onDragMove', arg);
        },
        onDragEnd: function (arg) {
            console.log('onDragEnd', arg);
        }
    });
    var panel3 = new ScrollPanel_ScrollPanel(spanEls[2], {
        disableY: true
    });
    panel3.on('dragStart', function (arg) {
        console.log('DragStart', arg);
    });
    panel3.on('dragMove', function (arg) {
        console.log('DragMove', arg);
    });
    panel3.on('dragEnd', function (arg) {
        console.log('DragEnd', arg);
    });
});


/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var EventEmitter = /** @class */ (function () {
    function EventEmitter(names) {
        var _this = this;
        this.events = {};
        this.eventTypes = {};
        names.forEach(function (type) { return _this.eventTypes[type] = type; });
    }
    EventEmitter.prototype.on = function (type, fn, context) {
        if (context === void 0) { context = this; }
        if (!this.events[type]) {
            this.events[type] = [];
        }
        // 保存type事件对应的函数
        this.events[type].push([fn, context]);
    };
    // 触发type事件
    EventEmitter.prototype.trigger = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var events = this.events[type];
        if (!events)
            return;
        var len = events.length;
        var eventsCopy = events.slice();
        var ret;
        for (var i = 0; i < len; i++) {
            var event_1 = eventsCopy[i];
            var fn = event_1[0], context = event_1[1];
            if (fn) {
                ret = fn.apply(context, args);
                if (ret === true)
                    break;
            }
        }
    };
    return EventEmitter;
}());
/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);


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
//# sourceMappingURL=3.a56045f546.js.map