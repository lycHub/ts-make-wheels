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

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/carousel/carousel-page.less
var carousel_page = __webpack_require__(167);

// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(2);

// CONCATENATED MODULE: ./src/demos/carousel/Options.ts
var Options = /** @class */ (function () {
    function Options() {
        this.loop = false;
        // 切换速度
        this.speed = 0.3;
        // 自动播放间隔
        this.delay = 2000;
        this.autoplay = false;
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


// CONCATENATED MODULE: ./src/demos/carousel/Carousel.ts
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


var Carousel_Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel(el, options) {
        var _this = _super.call(this, ['transitionEnd']) || this;
        _this.activeIndex = 0;
        // 是否正在过度
        _this.isTransiting = false;
        if (!el)
            return _this;
        _this.el = (typeof el === 'string' ? document.querySelector(el) : el);
        _this.elWidth = _this.el.offsetWidth;
        _this.slideWrapEl = _this.el.querySelector('.carousel-wrap');
        // 合并选项
        _this.options = new Options().merge(options);
        _this.init();
        return _this;
    }
    Carousel.prototype.init = function () {
        var _this = this;
        this.initPagenation();
        // 左箭头
        var arrowLeft = document.createElement('div');
        arrowLeft.className = 'carousel-arrow left';
        // 右箭头
        var arrowRight = document.createElement('div');
        arrowRight.className = 'carousel-arrow right';
        [this.pagenationWrapEl, arrowLeft, arrowRight].forEach(function (item) { return _this.el.appendChild(item); });
        // 初始化事件
        this._initEvents();
        this.autoPlay();
    };
    // 初始化分页器
    Carousel.prototype.initPagenation = function () {
        this.slides = this.slideWrapEl.querySelectorAll('.carousel-slide');
        var dotNum = this.slides.length;
        var wrapLen = dotNum;
        if (this.options.loop) {
            // 复制首尾两个slide分别放在slideWrapEl的尾首
            var firstNodeCopy = this.slideWrapEl.firstElementChild.cloneNode(true);
            var lastNodeCopy = this.slideWrapEl.lastElementChild.cloneNode(true);
            this.slideWrapEl.insertBefore(lastNodeCopy, this.slideWrapEl.firstElementChild);
            this.slideWrapEl.appendChild(firstNodeCopy);
            wrapLen += 2;
            this.slideWrapEl.style.left = -this.elWidth + 'px';
        }
        this.slideWrapEl.style.width = wrapLen * 100 + '%';
        // 分页器
        this.pagenationWrapEl = document.createElement('div');
        this.pagenationWrapEl.className = 'carousel-pagination-wrap';
        var iEl = '';
        for (var a = 0; a < dotNum; a++) {
            iEl += "<i class=\"" + (a === this.activeIndex ? 'active' : '') + "\"></i>";
        }
        this.pagenationWrapEl.innerHTML = iEl;
    };
    // 绑定事件
    Carousel.prototype._initEvents = function () {
        var _this = this;
        var pagenations = this.pagenationWrapEl.children;
        var arrowLeft = this.el.querySelector('.carousel-arrow.left');
        var arrowRight = this.el.querySelector('.carousel-arrow.right');
        arrowLeft.addEventListener('click', function () { return _this.go(-1); });
        arrowRight.addEventListener('click', function () { return _this.go(1); });
        var _loop_1 = function (a) {
            pagenations[a].addEventListener('click', function () { return _this.navigation(a); });
        };
        for (var a = 0; a < pagenations.length; a++) {
            _loop_1(a);
        }
        this.slideWrapEl.addEventListener('webkitTransitionEnd', this.onTransitionEnd.bind(this));
        this.el.addEventListener('mouseenter', this.clearInterval.bind(this));
        this.el.addEventListener('mouseleave', this.autoPlay.bind(this));
        this.emitEvent('onInit');
    };
    Carousel.prototype.go = function (dir) {
        if (this.isTransiting)
            return;
        this.isTransiting = true;
        this.slideWrapEl.style.transitionDuration = this.options.speed + 's';
        var len = this.slides.length;
        var index = dir > 0 ? this.activeIndex + 1 : this.activeIndex - 1;
        this.activeIndex = (index + len) % len;
        if (this.options.loop) {
            this.loop(dir);
        }
        else {
            this.slideWrapEl.style.left = -this.activeIndex * this.elWidth + 'px';
        }
        this.updateDots(this.activeIndex);
    };
    Carousel.prototype.loop = function (dir) {
        var oldLeft = this.getLeft(this.slideWrapEl);
        // 这里可以利用下dir的正负
        // const newLeft = dir > 0 ? oldLeft - this.elWidth : oldLeft + this.elWidth;
        var newLeft = oldLeft + this.elWidth * -dir;
        this.slideWrapEl.style.left = newLeft + 'px';
    };
    // 点击圆点导航
    Carousel.prototype.navigation = function (index) {
        if (this.activeIndex !== index) {
            this.slideWrapEl.style.transitionDuration = this.options.speed + 's';
            this.activeIndex = index;
            this.slideWrapEl.style.left = -(this.activeIndex + 1) * this.elWidth + 'px';
            this.updateDots(index);
        }
    };
    // 底部圆点
    Carousel.prototype.updateDots = function (index) {
        // console.log(index);
        var dots = this.pagenationWrapEl.childNodes;
        for (var a = 0; a < dots.length; a++) {
            dots[a].classList.remove('active');
        }
        dots[index].classList.add('active');
    };
    Carousel.prototype.onTransitionEnd = function () {
        // console.log('end');
        if (this.options.loop) {
            var left = this.getLeft(this.slideWrapEl);
            if (left >= 0) {
                this.slideWrapEl.style.transitionDuration = '0s';
                this.slideWrapEl.style.left = '-4000px';
                // console.log('跳最后一个');
            }
            else if (left <= -(this.slides.length + 1) * this.elWidth) {
                this.slideWrapEl.style.transitionDuration = '0s';
                this.slideWrapEl.style.left = '-800px';
                // console.log('跳第一个');
            }
        }
        this.isTransiting = false;
        // 发射选中事件，响应DatePicker.on方法
        this.trigger('transitionEnd', this.activeIndex);
        this.emitEvent('onTransitionEnd', this.activeIndex);
    };
    Carousel.prototype.autoPlay = function () {
        var _this = this;
        if (this.options.autoplay) {
            this.timer = setInterval(function () { return _this.go(1); }, this.options.delay);
        }
    };
    Carousel.prototype.clearInterval = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    Carousel.prototype.getLeft = function (el) {
        return Number(el.style.left.slice(0, -2));
    };
    // 发射自定义事件
    Carousel.prototype.emitEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.options[type]) {
            this.options[type](args);
        }
    };
    return Carousel;
}(EventEmitter["a" /* default */]));
/* harmony default export */ var carousel_Carousel = (Carousel_Carousel);

// CONCATENATED MODULE: ./src/demos/carousel/carousel-page.ts


window.addEventListener('DOMContentLoaded', function () {
    var carousels = document.getElementsByClassName('carousel');
    var carousel = new carousel_Carousel(carousels[0], {
        loop: true,
        onInit: function () {
            console.log('onInit');
        },
        onTransitionEnd: function (index) {
            console.log('onTransitionEnd：' + index);
        }
    });
    var carousel2 = new carousel_Carousel(carousels[1], {
        loop: true,
        autoplay: true,
        delay: 1000
    });
    carousel2.on('transitionEnd', function (index) {
        console.log('transitionEnd：' + index);
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


/***/ })

/******/ });
//# sourceMappingURL=0.fae053680a.js.map