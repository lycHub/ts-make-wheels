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
/******/ 	return __webpack_require__(__webpack_require__.s = 172);
/******/ })
/************************************************************************/
/******/ ({

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/slider/slider-page.less
var slider_page = __webpack_require__(168);

// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(2);

// CONCATENATED MODULE: ./src/demos/slider/Options.ts
var Options = /** @class */ (function () {
    function Options() {
        this.step = 1;
        // 当设置了step时，是否按照step移动
        this.accordingToStep = true;
        // 最小值
        this.min = 0;
        // 最大值
        this.max = 100;
        this.value = 0;
        // 是否双滑块
        this.range = false;
        // 是否显示断点
        this.showDots = false;
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

// CONCATENATED MODULE: ./src/demos/slider/Slider.ts
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



var Slider_Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(el, options) {
        var _this = _super.call(this, ['changing', 'change']) || this;
        // 是否正在拖拽
        _this.dragging = false;
        // 鼠标按下的位置
        _this.start = 0;
        _this.startVal = 0;
        // 移动时的位置
        _this.current = 0;
        _this.moveEvents = {};
        if (!el)
            return _this;
        _this.el = (typeof el === 'string' ? document.querySelector(el) : el);
        // 合并选项
        _this.options = new Options().merge(options);
        // 赋初始值
        var initVal = _this.options.value;
        _this.currentValue = initVal ? _this.checkLimits(Array.isArray(initVal) ? initVal : [initVal]) : _this.checkLimits([0]);
        _this.init();
        return _this;
    }
    Slider.prototype.init = function () {
        this.domHandle = new dom["a" /* default */]();
        this.valueRange = this.options.max - this.options.min;
        var dots = '';
        if (this.options.showDots) {
            // 获取断点
            var dotsArr = this.getDots();
            dotsArr.forEach(function (dot) {
                var className = dot.active ? 'v-slider-dot active' : 'v-slider-dot';
                dots += "<div class=\"" + className + "\" style=\"left: " + dot.val + "%\"></div>";
            });
        }
        // 渲染dom
        var maxBtnClass = this.options.range ? 'v-slider-button-wrap' : 'v-slider-button-wrap hide';
        this.el.innerHTML = "<div class=\"v-slider-wrap\">\n        <!-- \u8272\u6761 -->\n        <div class=\"v-slider-bar\"></div>\n\n        <!-- \u65AD\u70B9 -->\n        " + dots + "\n\n        <!-- \u8272\u5757 -->\n        <div class=\"v-slider-button-wrap\" data-type=\"min\">\n          <div class=\"v-slider-button\"></div>\n        </div>\n\n        <div class=\"" + maxBtnClass + "\" data-type=\"max\">\n          <div class=\"v-slider-button\"></div>\n        </div>\n      </div>";
        this.bar = this.el.querySelector('.v-slider-bar');
        this.btns = this.el.getElementsByClassName('v-slider-button-wrap');
        this.dots = this.el.querySelectorAll('.v-slider-dot');
        this.sliderWidth = this.domHandle.getOuterWidth(this.el.querySelector('.v-slider-wrap'));
        this.initEvents();
        // 初始化滑块和色条的位置
        this.changeButtonPosition();
        this.changeBarStyle();
        var value = this.options.range ? this.exportValue : this.exportValue[0];
        this.emitEvent('onInit', value);
    };
    Slider.prototype.initEvents = function () {
        this.el.addEventListener('click', this.sliderClick.bind(this));
        this.bar.addEventListener('click', this.sliderClick.bind(this));
        for (var a = 0; a < this.btns.length; a++) {
            this.btns[a].addEventListener('mousedown', this.handleStart.bind(this));
            this.btns[a].addEventListener('touchstart', this.handleStart.bind(this));
            this.btns[a].addEventListener('click', this.sliderClick.bind(this));
        }
    };
    // 计算断点个数和位置
    Slider.prototype.getDots = function () {
        var dotCount = this.valueRange / this.options.step;
        var dots = [];
        var barStyle = this.changeBarStyle();
        // (刻度间隔 / 100) = (this.step / this.valueRange)
        var stepWidth = (100 * this.options.step) / this.valueRange;
        for (var i = 1; i < dotCount; i++) {
            var val = i * stepWidth;
            var active = this.isDotActive(val, barStyle);
            dots.push({ val: val, active: active });
        }
        return dots;
    };
    // 点击slider
    Slider.prototype.sliderClick = function (event) {
        var current = this.getPointer(event);
        var sliderOffsetLeft = this.el.getBoundingClientRect().left;
        // 新值
        var newVal = ((current - sliderOffsetLeft) / this.sliderWidth) * this.valueRange + this.options.min;
        // console.log('newPos :', newPos);
        var _a = this.btnPosition, minBtnPoi = _a.minBtnPoi, maxBtnPoi = _a.maxBtnPoi;
        if (!this.options.range || newVal <= minBtnPoi) {
            this.changeVal(newVal, "min");
        }
        else if (newVal >= maxBtnPoi) {
            this.changeVal(newVal, "max");
        }
        else {
            this.changeVal(newVal, newVal - this.currentValue[0] <= this.currentValue[1] - newVal ? "min" : "max");
        }
    };
    // 滑块按下
    Slider.prototype.handleStart = function (event) {
        this.pointerDown = event.currentTarget.dataset.type || 'min';
        this.onDragStart(event);
        this.handleMove = this.onDragMove.bind(this);
        this.handleEnd = this.onDragEnd.bind(this);
        this.moveEvents = {
            mousemove: this.handleMove,
            touchmove: this.handleMove,
            mouseup: this.handleEnd,
            touchend: this.handleEnd
        };
        this.domHandle.addEvents(window, this.moveEvents);
    };
    Slider.prototype.onDragStart = function (event) {
        this.dragging = false;
        // 按下的位置
        this.start = this.getPointer(event);
        this.startVal = this.currentValue[this.pointerDown === "min" ? 0 : 1];
    };
    Slider.prototype.onDragMove = function () {
        console.log('mousemove');
        this.dragging = true;
        this.current = this.getPointer(event);
        // (变化的值diff / 数值范围) = (鼠标当前位置 - 鼠标起始位置) / 总长
        var diff = ((this.current - this.start) / this.sliderWidth) * this.valueRange;
        var newVal = this.startVal + diff;
        this.changeVal(newVal);
    };
    Slider.prototype.onDragEnd = function () {
        if (this.dragging) {
            this.dragging = false;
            var value = this.options.range ? this.exportValue : this.exportValue[0];
            this.emitEvent('onChange', value);
            this.trigger('change', value);
        }
        this.pointerDown = null;
        this.domHandle.removeEvents(window, this.moveEvents);
    };
    // 改变值
    Slider.prototype.changeVal = function (newVal, type) {
        if (type === void 0) { type = this.pointerDown; }
        var index = type === "min" ? 0 : 1;
        if (type === "min") {
            newVal = this.checkLimits([newVal, this.options.max])[0];
        }
        else {
            newVal = this.checkLimits([this.options.min, newVal])[1];
        }
        //      console.log('newVal :', newVal);
        var modulus = newVal % this.options.step;
        var value = this.currentValue;
        // 当accordingToStep === true时，newVal - modulus保证是整数
        value[index] = this.options.accordingToStep ? newVal - modulus : newVal;
        value = this.checkValue(value);
        // console.log("move :", newVal, value, modulus);
        this.currentValue = value.slice();
        this.changeButtonPosition();
        this.changeBarStyle();
        this.changeDotStyle();
        this.emitEvent('onChanging', value);
        this.trigger('changing', value);
        /* if (!this.dragging) {
           if (this.currentValue[index] !== this.oldValue[index]) {
             this.emitChange();
             this.oldValue[index] = this.currentValue[index];
           }
         }*/
    };
    // 保证currentValue的大小关系
    Slider.prototype.checkValue = function (value) {
        var _a;
        var val = value.slice();
        if (val[0] > val[1]) {
            _a = [val[1], val[0]], val[0] = _a[0], val[1] = _a[1];
        }
        return val;
    };
    // 根据当前值改变按钮位置
    Slider.prototype.changeButtonPosition = function () {
        var val = this.currentValue;
        // (当前位置 / 100) = (当前数值 - 最小数值) / 数值范围
        var _a = this.btnPosition, minBtnPoi = _a.minBtnPoi, maxBtnPoi = _a.maxBtnPoi;
        this.btns[0].style.left = minBtnPoi + '%';
        if (this.btns[1]) {
            this.btns[1].style.left = maxBtnPoi + '%';
        }
    };
    // 根据值改变色条样式
    Slider.prototype.changeBarStyle = function () {
        var style = { width: 0, left: 0 };
        if (this.options.range) {
            style.left = ((this.currentValue[0] - this.options.min) / this.valueRange) * 100;
            style.width = ((this.currentValue[1] - this.currentValue[0]) / this.valueRange) * 100;
        }
        else {
            style.width = ((this.currentValue[0] - this.options.min) / this.valueRange) * 100;
        }
        if (this.bar) {
            this.bar.style.width = style.width + '%';
            this.bar.style.left = style.left + '%';
        }
        return style;
    };
    // 改变断点样式
    Slider.prototype.changeDotStyle = function () {
        this.dots = this.el.querySelectorAll('.v-slider-dot');
        var barStyle = this.changeBarStyle();
        for (var i = 0; i < this.dots.length; i++) {
            // 每个dot的left值， +4是因为每个dot都设置了margin-left: 4px。
            // 也可以直接用getComputedStyle获取
            // console.log(this.domHandle.getStyle(dots[i], 'left').slice(0, -2));
            var left = ((this.dots[i].offsetLeft + 4) / this.sliderWidth) * 100;
            var active = this.isDotActive(left, barStyle);
            if (active) {
                this.dots[i].classList.add('active');
            }
            else {
                this.dots[i].classList.remove('active');
            }
        }
    };
    Slider.prototype.isDotActive = function (left, barStyle) {
        return this.options.range
            ? left > barStyle.left && left < barStyle.left + barStyle.width
            : left < barStyle.width;
    };
    Slider.prototype.getPointer = function (event) {
        return event.type.indexOf("touch") !== -1 ? event.touches[0].clientX : event.clientX;
    };
    Slider.prototype.checkLimits = function (_a) {
        var min = _a[0], max = _a[1];
        min = Math.max(this.options.min, min);
        min = Math.min(this.options.max, min);
        if (max) {
            max = Math.max(this.options.min, min, max);
            max = Math.min(this.options.max, max);
        }
        else {
            max = this.options.max;
        }
        return [min, max];
    };
    // 发射自定义事件
    Slider.prototype.emitEvent = function (type, args) {
        if (this.options[type]) {
            this.options[type](args);
        }
    };
    Object.defineProperty(Slider.prototype, "exportValue", {
        // 最终的value
        get: function () {
            // step是小数就等于1，否则等于0
            var decimalCases = (String(this.options.step).split(".")[1] || "").length;
            return this.currentValue.map(function (nr) { return Number(nr.toFixed(decimalCases)); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "btnPosition", {
        // 获取左右滑块的位置
        get: function () {
            var val = this.currentValue;
            // (当前位置 / 100) = (当前数值 - 最小数值) / 数值范围
            var minBtnPoi = ((val[0] - this.options.min) / this.valueRange) * 100; // 左滑块
            var maxBtnPoi = ((val[1] - this.options.min) / this.valueRange) * 100; // 右滑块
            return { minBtnPoi: minBtnPoi, maxBtnPoi: maxBtnPoi };
        },
        enumerable: true,
        configurable: true
    });
    return Slider;
}(EventEmitter["a" /* default */]));
/* harmony default export */ var slider_Slider = (Slider_Slider);

// CONCATENATED MODULE: ./src/demos/slider/slider-page.ts


window.addEventListener('DOMContentLoaded', function () {
    console.log('slider 6-29');
    var secs = document.getElementsByClassName('sec');
    var boxes = document.getElementsByClassName('box');
    var slider = new slider_Slider(boxes[0], {
        value: [10, 90],
        range: true,
        onInit: function (val) {
            var b = secs[0].getElementsByTagName('b');
            b[0].innerText = val[0];
            b[1].innerText = val[1];
        }
    });
    slider.on('changing', function (val) {
        var b = secs[0].getElementsByTagName('b');
        b[0].innerText = val[0];
        b[1].innerText = val[1];
    });
    var slider2 = new slider_Slider(boxes[1], {
        value: [10, 90],
        range: true,
        step: 10,
        showDots: true,
        onInit: function (val) {
            var b = secs[1].getElementsByTagName('b');
            b[0].innerText = val[0];
            b[1].innerText = val[1];
        }
    });
    slider2.on('change', function (val) {
        var b = secs[1].getElementsByTagName('b');
        b[0].innerText = val[0];
        b[1].innerText = val[1];
    });
    var slider3 = new slider_Slider(boxes[2], {
        value: [2, 7],
        range: true,
        min: 1,
        max: 10,
        onInit: function (val) {
            var b = secs[2].getElementsByTagName('b');
            b[0].innerText = val[0];
            b[1].innerText = val[1];
        }
    });
    slider3.on('changing', function (val) {
        var b = secs[2].getElementsByTagName('b');
        b[0].innerText = val[0];
        b[1].innerText = val[1];
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
//# sourceMappingURL=5.509ef0e915.js.map