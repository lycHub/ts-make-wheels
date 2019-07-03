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

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/snake/snake-page.less
var snake_page = __webpack_require__(171);

// CONCATENATED MODULE: ./src/demos/snake/Options.ts
var Options = /** @class */ (function () {
    function Options(options) {
        this.defaultOptions = options;
    }
    // 合并默认配置
    Options.prototype.merge = function (target) {
        return Object.assign({}, this.defaultOptions, target);
    };
    return Options;
}());


// CONCATENATED MODULE: ./src/tools/number.ts
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// CONCATENATED MODULE: ./src/demos/snake/js/Food.ts
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


var Food_Food = /** @class */ (function (_super) {
    __extends(Food, _super);
    function Food(options) {
        var _this = _super.call(this, {
            // x: getRandom(0, 800),
            // y: getRandom(0, 600),
            width: 20,
            height: 20,
            color: '#f60'
        }) || this;
        _this.coordinates = { x: 0, y: 0 };
        _this.options = _super.prototype.merge.call(_this, options);
        return _this;
        // console.log('options :', this.options);
    }
    // 渲染食物对象
    Food.prototype.render = function (map) {
        this.removeFood(map);
        this.coordinates.x = getRandom(0, map.offsetWidth / this.options.width - 1) * this.options.width;
        this.coordinates.y = getRandom(0, map.offsetHeight / this.options.height - 1) * this.options.height;
        this.currentFood = document.createElement('div');
        this.currentFood.style.width = this.options.width + 'px';
        this.currentFood.style.height = this.options.height + 'px';
        this.currentFood.style.backgroundColor = this.options.color;
        this.currentFood.style.position = 'absolute';
        this.currentFood.style.left = this.coordinates.x + 'px';
        this.currentFood.style.top = this.coordinates.y + 'px';
        map.appendChild(this.currentFood);
    };
    Food.prototype.removeFood = function (map) {
        if (this.currentFood) {
            map.removeChild(this.currentFood);
            this.currentFood = null;
        }
    };
    return Food;
}(Options));
/* harmony default export */ var js_Food = (Food_Food);

// CONCATENATED MODULE: ./src/demos/snake/js/Snake.ts
var Snake_extends = (undefined && undefined.__extends) || (function () {
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
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Up"] = 2] = "Up";
    Direction[Direction["Down"] = 3] = "Down";
})(Direction || (Direction = {}));
;
var Snake = /** @class */ (function (_super) {
    Snake_extends(Snake, _super);
    function Snake(options) {
        var _this = _super.call(this, {
            width: 20,
            height: 20,
            direction: Direction.Right,
            speed: 200,
            body: [
                { x: 3, y: 2, color: 'red' },
                { x: 2, y: 2, color: 'blue' },
                { x: 1, y: 2, color: 'blue' }
            ]
        }) || this;
        _this.currentSnake = [];
        _this.options = _super.prototype.merge.call(_this, options);
        return _this;
    }
    // 渲染蛇
    Snake.prototype.render = function (map) {
        var _this = this;
        if (!this.map)
            this.map = map;
        this.remove(this.map);
        this.options.body.forEach(function (item) {
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = _this.options.width + 'px';
            div.style.height = _this.options.height + 'px';
            div.style.left = item.x * _this.options.width + 'px';
            div.style.top = item.y * _this.options.height + 'px';
            div.style.backgroundColor = item.color;
            _this.currentSnake.push(div);
            _this.map.appendChild(div);
        });
    };
    Snake.prototype.move = function (food, game, cb) {
        var body = this.options.body;
        for (var a = body.length - 1; a > 0; a--) {
            // 每一格body都移动到他前面那个body上
            body[a].x = body[a - 1].x;
            body[a].y = body[a - 1].y;
        }
        var head = this.options.body[0];
        switch (this.options.direction) {
            case Direction.Left:
                head.x--;
                break;
            case Direction.Right:
                head.x++;
                break;
            case Direction.Up:
                head.y--;
                break;
            case Direction.Down:
                head.y++;
                break;
        }
        var headX = head.x * this.options.width;
        var headY = head.y * this.options.height;
        if (headX === food.coordinates.x && headY === food.coordinates.y) {
            // 复制蛇身最后一节添加到body后面
            var lastBody = this.options.body[this.options.body.length - 1];
            this.options.body.push(__assign({}, lastBody));
            food.render(this.map);
            this.options.speed = Math.max(10, this.options.speed - 30);
            if (cb)
                cb();
            game.runSnake(this.options.speed);
        }
    };
    Snake.prototype.remove = function (map) {
        for (var a = this.currentSnake.length - 1; a >= 0; a--) {
            map.removeChild(this.currentSnake[a]);
            this.currentSnake.splice(a, 1);
        }
    };
    return Snake;
}(Options));
/* harmony default export */ var js_Snake = (Snake);

// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(1);

// CONCATENATED MODULE: ./src/demos/snake/js/Game.ts
var Game_extends = (undefined && undefined.__extends) || (function () {
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



var Game_Game = /** @class */ (function (_super) {
    Game_extends(Game, _super);
    function Game(map) {
        var _this = _super.call(this, ['init', 'pause', 'over', 'score-change', 'refresh']) || this;
        _this.moving = false;
        _this.score = 0;
        _this.map = map;
        _this.init();
        return _this;
    }
    Game.prototype.init = function () {
        this.food = new js_Food();
        this.snake = new js_Snake();
        this.food.render(this.map);
        this.snake.render(this.map);
        this.bindKeyBoardEvts();
        this.trigger('init');
    };
    Game.prototype.start = function () {
        this.runSnake();
    };
    Game.prototype.pause = function () {
        this.moving = false;
        clearInterval(this.timer);
        this.trigger('pause', this.score);
    };
    Game.prototype.refresh = function () {
        this.map.innerHTML = '';
        this.pause();
        this.init();
        this.score = 0;
        this.trigger('refresh');
    };
    Game.prototype.runSnake = function (speed) {
        var _this = this;
        if (speed === void 0) { speed = 200; }
        // console.log('speed :', speed);
        this.moving = true;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.timer = setInterval(function () {
            _this.snake.move(_this.food, _this, function () { return _this.trigger('score-change', ++_this.score); });
            _this.snake.render(_this.map);
            // 判断是否撞到边界
            var maxX = _this.map.offsetWidth / _this.snake.options.width;
            var maxY = _this.map.offsetHeight / _this.snake.options.height;
            var head = _this.snake.options.body[0];
            if (head.x < 0 || head.x >= maxX || head.y < 0 || head.y >= maxY) {
                _this.trigger('over', _this.score);
                _this.moving = false;
                clearInterval(_this.timer);
            }
        }, speed);
    };
    Game.prototype.bindKeyBoardEvts = function () {
        var _this = this;
        document.addEventListener('keydown', function (evt) {
            // console.log('code', evt);
            switch (evt.key) {
                case 'ArrowUp':
                    _this.snake.options.direction = Direction.Up;
                    break;
                case 'ArrowDown':
                    _this.snake.options.direction = Direction.Down;
                    break;
                case 'ArrowLeft':
                    _this.snake.options.direction = Direction.Left;
                    break;
                case 'ArrowRight':
                    _this.snake.options.direction = Direction.Right;
                    break;
            }
        });
    };
    return Game;
}(EventEmitter["a" /* default */]));
/* harmony default export */ var js_Game = (Game_Game);

// CONCATENATED MODULE: ./src/demos/snake/snake-page.ts


window.addEventListener('DOMContentLoaded', function () {
    var btns = document.getElementsByTagName('button');
    var h2 = document.getElementsByTagName('h2')[0];
    var map = document.getElementById('map');
    var game = new js_Game(map);
    game.on('score-change', function (score) {
        console.log('score change', score);
        h2.innerText = '当前得分：' + score;
    });
    game.on('over', function (score) {
        alert('over, 当前得分：' + score);
    });
    game.on('refresh', function () {
        h2.innerText = '当前得分：0';
    });
    btns[0].addEventListener('click', game.start.bind(game));
    btns[1].addEventListener('click', game.pause.bind(game));
    btns[2].addEventListener('click', game.refresh.bind(game));
});


/***/ })

/******/ });
//# sourceMappingURL=6.d702e6ea0f.js.map