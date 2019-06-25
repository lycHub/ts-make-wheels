/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([169,4]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/datepicker/datepicker.less
var datepicker_datepicker = __webpack_require__(62);

// EXTERNAL MODULE: ./node_modules/date-fns/index.js
var date_fns = __webpack_require__(1);

// CONCATENATED MODULE: ./src/demos/datepicker/DatePicker/Options.ts
var Options = /** @class */ (function () {
    function Options() {
        // 默认只显示一个日历面板（input）
        this.monthNum = 1;
        // 是否范围选择（input）
        this.range = false;
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


// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(9);

// CONCATENATED MODULE: ./src/demos/datepicker/DatePicker/DatePicker.ts
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



var DatePicker_DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    /*
     * Partial是ts自带的映射类型，作用是把options下的每个属性都变成readonly
     * 参考：https://www.tslang.cn/docs/handbook/advanced-types.html
     * */
    function DatePicker(el, options) {
        var _this = _super.call(this, ['change']) || this;
        _this.currentDate = new Date();
        // 计数，范围选择时，判断点了几次
        _this.clickNum = 0;
        _this.tempVal = [];
        if (!el)
            return _this;
        _this.el = typeof el === 'string' ? document.querySelector(el) : el;
        // 合并选项
        _this.options = new Options().merge(options);
        var defaultDate = _this.options.defaultDate;
        /*if (defaultDate instanceof Array) {
          defaultDate = this.validDateRange(<Date[]>defaultDate);
        }*/
        if (defaultDate instanceof Array) {
            _this._value = _this.validDateRange(defaultDate);
        }
        else {
            _this._value = new Date(defaultDate);
        }
        if (_this.currentDate) {
            _this.yearAndMonth = {
                y: _this.currentDate.getFullYear(),
                m: _this.currentDate.getMonth()
            };
        }
        // 创建日历面板
        _this.createMonths();
        _this.el.style.width = (300 * _this.options.monthNum) + 'px';
        _this.el.addEventListener('click', _this.onPanelClick.bind(_this));
        return _this;
    }
    // 创建多个日历面板
    DatePicker.prototype.createMonths = function () {
        this.dateArrs = [];
        var month = this.currentDate.getMonth(); // 5，注意比实际月份小1
        var year = this.currentDate.getFullYear(); // 2019
        for (var i = 0; i < this.options.monthNum; i++) {
            var m = month + i;
            var y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }
            this.yearAndMonth = { y: y, m: m };
            // console.log(this.yearAndMonth);
            // const currentDate = new Date(y, m, 1);
            this.dateArrs.push({
                ym: this.yearAndMonth,
                date: this.createMonth() // HqDate[][]，是一个类似矩阵的二位数组
            });
        }
        this.initDatePicker();
    };
    DatePicker.prototype.initDatePicker = function () {
        // 单个日历面板的外层dom
        var datePanel = '';
        this.dateArrs.forEach(function (panel) {
            // 单个日历面板的6行dom
            var dateTr = '';
            panel.date.forEach(function (item) {
                // 每行有7列天数dom
                var dateTd = '';
                item.forEach(function (day) {
                    var classes = '';
                    if (day.isToday) {
                        classes += ' today';
                    }
                    if (day.actived) {
                        classes += ' actived';
                    }
                    if (day.disabled) {
                        classes += ' disabled';
                    }
                    if (day.notInCurrentMonth) {
                        classes += ' notInCurrentMonth';
                    }
                    dateTd += "<td class=\"" + classes + "\" value=\"" + day.value + "\">" + day.label + "</td>";
                });
                dateTr += "<tr>" + dateTd + "</tr>";
            });
            datePanel += "<div class=\"hq-calendar-day\">\n                      <div class=\"hq-calendar-header\">\n                        <span>" + panel.ym.y + "\u5E74" + (panel.ym.m + 1) + "\u6708</span>\n                      </div>\n                      <table>\n                        <thead>\n                        <tr>\n                          <th>\u65E5</th>\n                          <th>\u4E00</th>\n                          <th>\u4E8C</th>\n                          <th>\u4E09</th>\n                          <th>\u56DB</th>\n                          <th>\u4E94</th>\n                          <th>\u516D</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                          " + dateTr + "\n                        </tbody>\n                      </table>\n                    </div>";
        });
        // console.log('datePanel', datePanel);
        this.el.innerHTML = "\n      <a class=\"change-arrow prev-month\" dir=\"prev\">&lt;</a>\n      <a class=\"change-arrow next-month\">&gt;</a>" + datePanel;
        this.emitEvent('onInit');
    };
    // 创建日历面板
    DatePicker.prototype.createMonth = function () {
        var year = this.yearAndMonth.y; // 2019
        var month = this.yearAndMonth.m; // 6
        var thisMonthDay = new Date(year, month, 1); // 当月1号
        var thisMonthFirstDay = thisMonthDay.getDay(); // 当月1号周几（0~6）,注意日历布局第一列是周日，对应的是0
        var thisMonthFirstDate = new Date(year, month, -thisMonthFirstDay); // 日历主体第一行第一列的日期2019-5-26
        return this.generateTable(thisMonthFirstDate, this.options.clickableDate); //生成日历主体的日期区域
    };
    // 生成二维矩阵数组
    DatePicker.prototype.generateTable = function (firstDate, clickableDate) {
        var date_arr = [];
        var date = firstDate.getDate(); // 26
        // console.log('_value :', this._value);
        // 生成6行7列的主体部分
        for (var i = 0; i < 6; i++) { // 6行
            var line = [];
            for (var j = 0; j < 7; j++) { // 7列
                firstDate.setDate(++date); // fitstDate不断改变
                date = firstDate.getDate();
                var currentMouth = new Date(this.yearAndMonth.y, this.yearAndMonth.m);
                // currentMouth对应的第一天和最后一天
                var currentMonthFirst = Object(date_fns["startOfMonth"])(currentMouth);
                var currentMonthLast = Object(date_fns["lastDayOfMonth"])(currentMouth);
                line.push({
                    label: date,
                    value: new Date(firstDate),
                    actived: this.isActive(firstDate),
                    isToday: Object(date_fns["isToday"])(firstDate),
                    disabled: this.isDisabled(firstDate, clickableDate),
                    notInCurrentMonth: !Object(date_fns["isWithinRange"])(firstDate, currentMonthFirst, currentMonthLast) // 是否是当月日期
                });
            }
            date_arr.push(line);
        }
        // console.log(date_arr);
        return date_arr;
    };
    // 是否禁止点击
    DatePicker.prototype.isDisabled = function (date, clickableDate) {
        if (!clickableDate)
            return false;
        //  minClickDate && compareDesc(firstDate, startOfDay(minClickDate)) === 1
        if (clickableDate instanceof Array) {
            return !Object(date_fns["isWithinRange"])(date, clickableDate[0], clickableDate[1]);
        }
        else {
            return Object(date_fns["compareDesc"])(date, Object(date_fns["startOfDay"])(clickableDate)) === 1;
        }
    };
    // 是否被选中
    DatePicker.prototype.isActive = function (value) {
        if (!this._value)
            return false;
        var result;
        if (this.options.range) {
            result = Object(date_fns["isWithinRange"])(value, this._value[0], this._value[1]);
        }
        else {
            result = Object(date_fns["isSameDay"])(value, this._value);
        }
        // console.log('result :', result);
        return result;
    };
    // 如果是范围选择，保证Date[0]在Date[1]之前
    DatePicker.prototype.validDateRange = function (dateRange) {
        var _a;
        if (!(dateRange instanceof Array))
            return dateRange;
        var dateRangeCopy = dateRange.slice();
        if (Object(date_fns["isAfter"])(dateRangeCopy[0], dateRangeCopy[1])) {
            _a = [dateRangeCopy[1], dateRangeCopy[0]], dateRangeCopy[0] = _a[0], dateRangeCopy[1] = _a[1];
        }
        return dateRangeCopy;
    };
    // 点击事件
    DatePicker.prototype.onPanelClick = function (evt) {
        var dom = evt.target;
        if (dom.classList.contains('change-arrow')) {
            this.changeMonth(dom);
        }
        else if (dom.nodeName.toLowerCase() === 'td') {
            this.selectDay(dom);
        }
    };
    // 选中日期
    DatePicker.prototype.selectDay = function (td) {
        if (td.classList.contains('disabled'))
            return;
        var tds = this.el.querySelectorAll('td');
        // 移除所有td的actived class
        tds.forEach(function (item) { return item.classList.remove('actived'); });
        if (this.options.range) { // 如果是范围选择
            this.rangeClick(td, tds);
        }
        else {
            td.classList.add('actived');
            this._value = new Date(td.getAttribute('value'));
            // 发射选中事件
            this.emitEvent('onChange', this._value);
            // 发射选中事件，响应DatePicker.on方法
            this.trigger('change', this._value);
        }
    };
    DatePicker.prototype.rangeClick = function (td, tds) {
        var _this = this;
        var tdVal = new Date(td.getAttribute('value'));
        if (++this.clickNum % 2 !== 0) { // 第一次
            this.tempVal = [];
            td.classList.add('actived');
            this.tempVal[0] = tdVal;
        }
        else {
            if (Object(date_fns["isSameDay"])(tdVal, this.tempVal[0]))
                return;
            this.tempVal[1] = tdVal;
            this._value = this.validDateRange(this.tempVal);
            // console.log('range', this._value);
            tds.forEach(function (item) {
                var val = new Date(item.getAttribute('value'));
                if (Object(date_fns["isWithinRange"])(val, _this._value[0], _this._value[1])) {
                    item.classList.add('actived');
                }
            });
            this.emitEvent('onChange', this._value);
            this.trigger('change', this._value);
        }
    };
    // 切换月份
    DatePicker.prototype.changeMonth = function (dom) {
        var m = this.currentDate.getMonth();
        var y = this.currentDate.getFullYear();
        if (dom.getAttribute('dir') === 'prev') {
            m--;
            if (m < 0) {
                m = 11;
                y--;
            }
        }
        else {
            m++;
            if (m > 11) {
                m = m % 11 - 1;
                y++;
            }
        }
        this.currentDate = new Date(y, m);
        this.yearAndMonth = {
            y: this.currentDate.getFullYear(),
            m: this.currentDate.getMonth()
        };
        this.createMonths();
    };
    // 发射自定义事件
    DatePicker.prototype.emitEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.options[type]) {
            this.options[type](this._value, args);
        }
    };
    return DatePicker;
}(EventEmitter["a" /* default */]));


// CONCATENATED MODULE: ./src/demos/datepicker/datepicker.ts



var currentDate = new Date();
var datepicker_clickableDate = [Object(date_fns["subDays"])(currentDate, 2), Object(date_fns["addDays"])(currentDate, 28)];
var datepicker_defaultDate = Object(date_fns["addDays"])(currentDate, 5);
var defaultDate2 = [currentDate, Object(date_fns["addDays"])(currentDate, 30)];
var clickableDate2 = [Object(date_fns["subDays"])(currentDate, 2), Object(date_fns["addDays"])(currentDate, 58)];
window.addEventListener('DOMContentLoaded', function () {
    var datepickerWrap = document.getElementsByClassName('calendar-wrapper');
    var datepicker = new DatePicker_DatePicker(datepickerWrap[0], {
        clickableDate: datepicker_clickableDate,
        defaultDate: datepicker_defaultDate,
        monthNum: 3,
        onInit: function () {
            // console.log('onInit');
        },
        onChange: function (selectedDate) {
            // console.log(selectedDate);
        }
    });
    datepicker.on('change', function (selectedDate) {
        console.log('on change', selectedDate);
    });
    var datepicker2 = new DatePicker_DatePicker(datepickerWrap[1], {
        range: true,
        defaultDate: defaultDate2,
        clickableDate: clickableDate2,
        monthNum: 4,
        onInit: function () {
            // console.log('onInit');
        },
        onChange: function (selectedDate) {
            // console.log('range', selectedDate);
        }
    });
    datepicker2.on('change', function (selectedDate) {
        console.log('on change', selectedDate);
    });
});


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 9:
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
//# sourceMappingURL=datepicker.js.map