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

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/demos/tree/tree-page.less
var tree_page = __webpack_require__(170);

// EXTERNAL MODULE: ./src/tools/EventEmitter.ts
var EventEmitter = __webpack_require__(2);

// CONCATENATED MODULE: ./src/demos/tree/Options.ts
var Options = /** @class */ (function () {
    function Options() {
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


// CONCATENATED MODULE: ./src/demos/tree/Tree.ts
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


var Tree_Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(el, options) {
        var _this = _super.call(this, ['select']) || this;
        // 选中的node
        _this.selectedNodes = [];
        if (!el)
            return _this;
        _this.el = (typeof el === 'string' ? document.querySelector(el) : el);
        // 合并选项
        _this.options = new Options().merge(options);
        _this.init();
        return _this;
    }
    Tree.prototype.init = function () {
        this.flatState = this.compileFlatState(this.options.data);
        var container = document.createElement('div');
        container.className = 'ts-tree';
        this.digui(this.options.data, container);
        this.el.appendChild(container);
        this.initEvents();
        this.emitEvent('onInit', this.selectedNodes);
    };
    Tree.prototype.initEvents = function () {
        var arrows = this.el.querySelectorAll('.ts-tree-arrow');
        var titles = this.el.querySelectorAll('.ts-tree-title');
        for (var a = 0; a < arrows.length; a++) {
            arrows[a].addEventListener('click', this.onToggleOpen.bind(this));
        }
        for (var a = 0; a < titles.length; a++) {
            titles[a].addEventListener('click', this.onSelect.bind(this));
        }
    };
    // 展开/收起
    Tree.prototype.onToggleOpen = function (event) {
        var target = event.target;
        var parent = this.findParentOfUl(target);
        if (parent) {
            target.classList.toggle('expand');
            parent.classList.toggle('expand');
        }
    };
    // 选中节点（支持多选）
    Tree.prototype.onSelect = function (event) {
        var multipleSelect = event.ctrlKey || false;
        var target = event.target;
        var nodeKey = Number(target.dataset.nodeKey);
        if (multipleSelect) {
            this.multipleSelect(nodeKey);
            target.classList.toggle('selected');
        }
        else {
            var titles = this.el.querySelectorAll('.ts-tree-title');
            for (var a = 0; a < titles.length; a++) {
                titles[a].classList.remove('selected');
            }
            target.classList.add('selected');
            this.selectedNodes = [this.flatState.find(function (item) { return item.nodeKey === nodeKey; })];
        }
        this.emitEvent('onSelectChange', this.selectedNodes);
        this.trigger('selectChange', this.selectedNodes);
    };
    // 多选
    Tree.prototype.multipleSelect = function (nodeKey) {
        var index = this.selectedNodes.findIndex(function (item) { return item.nodeKey === nodeKey; });
        if (index === -1) {
            this.selectedNodes.push(this.flatState.find(function (item) { return item.nodeKey === nodeKey; }));
        }
        else {
            this.selectedNodes.splice(index, 1);
        }
    };
    Tree.prototype.digui = function (data, container) {
        var _loop_1 = function (a) {
            var item = data[a];
            var children = item.children;
            var ul = document.createElement('ul');
            ul.className = item.expand ? 'ts-tree-children expand' : 'ts-tree-children';
            var li = document.createElement('li');
            var arrowClassName = children ? item.expand ? 'expand' : '' : 'hide';
            var titleClassName = item.selected ? 'ts-tree-title selected' : 'ts-tree-title';
            li.innerHTML = "<i class=\"ts-tree-arrow " + arrowClassName + "\">&gt;</i>\n      <span class=\"" + titleClassName + "\" data-node-key=\"" + item.nodeKey + "\">" + item.title + "</span>";
            if (item.selected) {
                this_1.selectedNodes.push(this_1.flatState.find(function (i) { return i.nodeKey === item.nodeKey; }));
            }
            if (children && children.length) {
                this_1.digui(item.children, li);
            }
            ul.appendChild(li);
            container.appendChild(ul);
        };
        var this_1 = this;
        for (var a = 0; a < data.length; a++) {
            _loop_1(a);
        }
    };
    Tree.prototype.findParentOfUl = function (target) {
        var parent = target.parentElement;
        if (parent.nodeName.toLocaleLowerCase() === 'ul') {
            return parent;
        }
        else {
            return this.findParentOfUl(parent);
        }
    };
    Tree.prototype.compileFlatState = function (stateTree) {
        // so we have always a relation parent/children of each node
        var keyCounter = 0;
        var childrenKey = 'children';
        var flatTree = [];
        function flattenChildren(node, parent) {
            node.nodeKey = keyCounter++;
            // 给每个node添加属性
            flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey };
            if (typeof parent != 'undefined') {
                flatTree[node.nodeKey].parent = parent.nodeKey;
                // nodekey存到父级children里
                flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
            }
            if (node[childrenKey]) {
                // 保存子节点的nodekey
                flatTree[node.nodeKey][childrenKey] = [];
                node[childrenKey].forEach(function (child) { return flattenChildren(child, node); });
            }
        }
        stateTree.forEach(function (rootNode) {
            flattenChildren(rootNode);
        });
        return flatTree;
    };
    // 发射自定义事件
    Tree.prototype.emitEvent = function (type, args) {
        if (this.options[type]) {
            this.options[type](args);
        }
    };
    return Tree;
}(EventEmitter["a" /* default */]));
/* harmony default export */ var tree_Tree = (Tree_Tree);

// CONCATENATED MODULE: ./src/demos/tree/tree-page.ts


var data = [
    {
        title: 'parent 1',
        expand: true,
        children: [
            {
                title: 'parent 1-1',
                expand: true,
                selected: true,
                children: [
                    {
                        title: 'leaf 1-1-1'
                    },
                    {
                        title: 'leaf 1-1-2'
                    }
                ]
            },
            {
                title: 'parent 1-2',
                children: [
                    {
                        title: 'leaf 1-2-1'
                    },
                    {
                        title: 'leaf 1-2-1'
                    }
                ]
            }
        ]
    },
    {
        title: 'parent 2',
        expand: true,
        children: [
            {
                title: 'parent 2-1',
                children: [
                    {
                        title: 'leaf 2-1-1'
                    },
                    {
                        title: 'leaf 2-1-2',
                        selected: true
                    }
                ]
            },
            {
                title: 'parent 2-2',
                expand: true,
                children: [
                    {
                        title: 'leaf 2-2-1'
                    },
                    {
                        title: 'leaf 2-2-2'
                    }
                ]
            }
        ]
    }
];
window.addEventListener('DOMContentLoaded', function () {
    var treeBox = document.querySelector('.tree-box');
    var b = treeBox.getElementsByTagName('b')[0];
    var tree = new tree_Tree(treeBox, {
        data: data,
        onInit: function (node) {
            console.log('onInit', node);
            b.innerText = '当前选中（按住ctrl可多选）：' + JSON.stringify(node);
        },
        onSelectChange: function (node) {
            console.log('onSelectChange', node);
            b.innerText = '当前选中（按住ctrl可多选）：' + JSON.stringify(node);
        }
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
//# sourceMappingURL=7.d5bc1d8586.js.map