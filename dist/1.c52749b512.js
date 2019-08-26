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
/******/ 	return __webpack_require__(__webpack_require__.s = 175);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/color-picker/color-picker.less
var color_picker = __webpack_require__(169);

// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(1);

// CONCATENATED MODULE: ./src/demos/color-picker/Options.ts
var Options = /** @class */ (function () {
    function Options() {
        // 默认颜色
        this.defaultColor = '#ff0000';
        // 绑定的颜色模式，支持"hex", "rgb", "hsb
        this.format = 'hex';
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

// CONCATENATED MODULE: ./src/demos/color-picker/ColorPicker.ts
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



// 左面板尺寸
var REC = {
    width: 150,
    height: 150
};
var ColorPicker_ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(el, options) {
        var _this = _super.call(this, ['changing', 'change']) || this;
        // 是否正在左面板选取
        _this.colorDragging = false;
        // 是否正在右面板选取
        _this.hueDragging = false;
        _this.moveEvents = {};
        if (!el)
            return _this;
        _this.el = (typeof el === 'string' ? document.querySelector(el) : el);
        _this.colorSelector = _this.el.querySelector('.ui-colorpicker-color-selector');
        _this.colorHandle = _this.colorSelector.querySelector('.ui-colorpicker-color-handle');
        _this.hueSelector = _this.el.querySelector('.ui-colorpicker-hue');
        _this.hueHandle = _this.hueSelector.querySelector('.ui-colorpicker-hue-handle');
        // 合并选项
        _this.options = new Options().merge(options);
        if (_this.options.defaultColor) {
            _this.initValue(_this.options.defaultColor);
        }
        _this.domHandle = new dom["a" /* default */]();
        _this.initEvents();
        _this.emitEvent('onInit', _this.getValueToUpdate);
        return _this;
    }
    ColorPicker.prototype.initEvents = function () {
        this.colorSelector.addEventListener('mousedown', this.onColorMousedown.bind(this));
        this.hueSelector.addEventListener('mousedown', this.onHueMousedown.bind(this));
    };
    // 按下左侧面板
    ColorPicker.prototype.onColorMousedown = function (event) {
        this.bindDocumentMouseListener();
        // this.bindDocumentMouseupListener();
        this.colorDragging = true;
        this.pickColor(event);
    };
    // 点击右侧面板
    ColorPicker.prototype.onHueMousedown = function (event) {
        this.bindDocumentMouseListener();
        this.hueDragging = true;
        this.pickHue(event);
    };
    ColorPicker.prototype.bindDocumentMouseListener = function () {
        this.handleMove = this.onMouseMove.bind(this);
        this.handleEnd = this.onMouseUp.bind(this);
        this.moveEvents = {
            mousemove: this.handleMove,
            mouseup: this.handleEnd,
        };
        this.domHandle.addEvents(window, this.moveEvents);
    };
    ColorPicker.prototype.onMouseMove = function (event) {
        if (this.colorDragging) {
            this.pickColor(event);
        }
        if (this.hueDragging) {
            this.pickHue(event);
        }
    };
    ColorPicker.prototype.onMouseUp = function () {
        this.colorDragging = false;
        this.hueDragging = false;
        this.domHandle.removeEvents(window, this.moveEvents);
        this.emitEvent('change', this.getValueToUpdate);
        this.trigger('change', this.getValueToUpdate);
    };
    // 左侧取色
    ColorPicker.prototype.pickColor = function (event) {
        var rect = this.colorSelector.getBoundingClientRect();
        // console.log(rect);
        var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        var left = rect.left + document.body.scrollLeft;
        // 由于validateHSB会限制取值范围(不能>100), 所以取这种算法
        var saturation = Math.floor(100 * (Math.max(0, Math.min(REC.width, (event.pageX - left)))) / REC.width);
        var brightness = Math.floor(100 * (REC.height - Math.max(0, Math.min(REC.height, (event.pageY - top)))) / REC.height);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });
        this.updateUI();
        this.emitEvent('onChanging', this.getValueToUpdate);
        this.trigger('changing', this.getValueToUpdate);
    };
    // 右侧取色
    ColorPicker.prototype.pickHue = function (event) {
        var top = this.hueSelector.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor(360 * (REC.height - Math.max(0, Math.min(REC.height, (event.pageY - top)))) / REC.height),
            s: this.value.s,
            b: this.value.b
        });
        this.updateColorSelector();
        this.updateUI();
        this.emitEvent('onChanging', this.getValueToUpdate);
        this.trigger('changing', this.getValueToUpdate);
    };
    ColorPicker.prototype.initValue = function (value) {
        switch (this.options.format) {
            case 'hex':
                this.value = this.HEXtoHSB(value);
                break;
            case 'rgb':
                this.value = this.RGBtoHSB(value);
                break;
            case 'hsb':
                this.value = value;
                break;
        }
        this.updateColorSelector();
        this.updateUI();
    };
    Object.defineProperty(ColorPicker.prototype, "getValueToUpdate", {
        get: function () {
            var val;
            switch (this.options.format) {
                case 'hex':
                    val = '#' + this.HSBtoHEX(this.value);
                    break;
                case 'rgb':
                    val = this.HSBtoRGB(this.value);
                    break;
                default:
                    val = this.value;
                    break;
            }
            return val;
        },
        enumerable: true,
        configurable: true
    });
    // 跟新左侧背景颜色
    ColorPicker.prototype.updateColorSelector = function () {
        if (this.colorSelector) {
            var hsb = {
                s: 100,
                b: 100,
                h: this.value.h,
            };
            this.colorSelector.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
        }
    };
    ColorPicker.prototype.updateUI = function () {
        if (this.colorHandle) {
            this.colorHandle.style.left = Math.floor(REC.width * this.value.s / 100) + 'px';
            this.colorHandle.style.top = Math.floor(REC.height * (100 - this.value.b) / 100) + 'px';
            this.hueHandle.style.top = Math.floor(REC.height - (REC.height * this.value.h / 360)) + 'px';
        }
    };
    // string转HSB
    ColorPicker.prototype.HEXtoHSB = function (hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    };
    // string转RGB
    ColorPicker.prototype.HEXtoRGB = function (hex) {
        var hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
    };
    // hsb转string
    ColorPicker.prototype.HSBtoHEX = function (hsb) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    };
    // rgb转string
    ColorPicker.prototype.RGBtoHEX = function (rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        for (var key in hex) {
            if (hex[key].length === 1) {
                hex[key] = '0' + hex[key];
            }
        }
        return hex.join('');
    };
    // RGB转HSB
    ColorPicker.prototype.RGBtoHSB = function (rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            }
            else if (rgb.g == max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            }
            else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        }
        else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    };
    // hsb转rgb
    ColorPicker.prototype.HSBtoRGB = function (hsb) {
        var rgb = {
            r: null, g: null, b: null
        };
        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s * 255 / 100);
        var v = Math.round(hsb.b * 255 / 100);
        if (s === 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            };
        }
        else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h === 360)
                h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    };
    ColorPicker.prototype.validateHSB = function (hsb) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    };
    ColorPicker.prototype.validateRGB = function (rgb) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    };
    ColorPicker.prototype.validateHEX = function (hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    };
    // 发射自定义事件
    ColorPicker.prototype.emitEvent = function (type, args) {
        if (this.options[type]) {
            this.options[type](args);
        }
    };
    return ColorPicker;
}(EventEmitter["a" /* default */]));
/* harmony default export */ var color_picker_ColorPicker = (ColorPicker_ColorPicker);

// CONCATENATED MODULE: ./src/demos/color-picker/color-picker.ts


var isCurrentPage = /color-picker/.test(location.href);
window.addEventListener('DOMContentLoaded', function () {
    if (isCurrentPage) {
        var b_1 = document.getElementsByTagName('b')[0];
        var box = document.getElementsByClassName('color-box')[0];
        var cp = new color_picker_ColorPicker(box, {
            defaultColor: '#49AF4F',
            onInit: function (color) {
                b_1.innerText = color;
            },
            onChanging: function (color) {
                b_1.innerText = color;
            }
        });
    }
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
//# sourceMappingURL=1.c52749b512.js.map