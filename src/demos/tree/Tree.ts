import EventEmitter from "../../tools/EventEmitter.ts";
import {Options} from "./Options.ts";
import { DataTree, Flat } from "./Options";


export default class Tree extends EventEmitter {
  // 配置项
  private readonly options: Options;


  // 容器
  private readonly el: HTMLElement;

  // 遍历用户传入的data，给每个节点都加上nodeKey，并为每个节点关联其父子关系
  private flatState: Flat[];

  // 选中的node
  private selectedNodes: Flat[] = [];
  
  constructor(el: HTMLElement | string, options?: Partial<Options>) {
    super(['select']);
    if (!el) return;
    this.el = (typeof el === 'string' ? document.querySelector(el) : el) as HTMLElement;

    // 合并选项
    this.options = new Options().merge(options);
    this.init();
  }

  private init() {
    this.flatState = this.compileFlatState(this.options.data);


    const container = document.createElement('div');
    container.className = 'ts-tree';
    this.digui(this.options.data, container);
    this.el.appendChild(container);
    
    this.initEvents();
  }


  private initEvents() {
    const arrows = this.el.querySelectorAll('.ts-tree-arrow');
    const titles = this.el.querySelectorAll('.ts-tree-title');
    for (let a = 0; a < arrows.length; a++) {
      arrows[a].addEventListener('click', this.onToggleOpen.bind(this));
    }
    for (let a = 0; a < titles.length; a++) {
      titles[a].addEventListener('click', this.onSelect.bind(this));
    }
  }

  // 展开/收起
  private onToggleOpen(event: MouseEvent) {
    const target = <HTMLElement>event.target;
    const parent = this.findParentOfUl(target);
    if (parent) {
      target.classList.toggle('expand');
      parent.classList.toggle('expand');
    }
  }

  // 选中节点（支持多选）
  private onSelect(event: MouseEvent) {
    const multipleSelect = event.ctrlKey || false;
    const target = <HTMLElement>event.target;
    const nodeKey = Number(target.dataset.nodeKey);
    if (multipleSelect) {
      this.multipleSelect(nodeKey);
      target.classList.toggle('selected');
    }else{
      const titles = this.el.querySelectorAll('.ts-tree-title');
      for (let a = 0; a < titles.length; a++) {
        titles[a].classList.remove('selected');
      }
      target.classList.add('selected');
      this.selectedNodes = [this.flatState.find(item => item.nodeKey === nodeKey)];
    }
    
    this.emitEvent('onSelectChange', this.selectedNodes);
    this.trigger('selectChange', this.selectedNodes);
  }

  // 多选
  private multipleSelect(nodeKey: number) {
    const index = this.selectedNodes.findIndex(item => item.nodeKey === nodeKey);
    if (index === -1) {
      this.selectedNodes.push(this.flatState.find(item => item.nodeKey === nodeKey));
    }else{
      this.selectedNodes.splice(index, 1);
    }
  }

  private digui(data: DataTree[], container: HTMLElement) {
    for (let a = 0; a < data.length; a++) {
      const item = data[a];
      
      const children = item.children;
      const ul = document.createElement('ul');
      ul.className = item.expand ? 'ts-tree-children expand' : 'ts-tree-children';

      const li = document.createElement('li');
      const arrowClassName = children ? item.expand ? 'expand' : '' : 'hide';
      li.innerHTML = `<i class="ts-tree-arrow ${arrowClassName}">&gt;</i>
      <span class="ts-tree-title" data-node-key="${item.nodeKey}">${item.title}</span>`;
      if (children && children.length) {
        this.digui(item.children, li);
      }
      ul.appendChild(li);
      container.appendChild(ul);
    }
  }

  private findParentOfUl(target: HTMLElement): HTMLElement {
    const parent = target.parentElement;
    if (parent.nodeName.toLocaleLowerCase() === 'ul') {
      return parent;
    }else{
      return this.findParentOfUl(parent);
    }
  }


  private compileFlatState (stateTree): Flat[] {
    // so we have always a relation parent/children of each node
      let keyCounter = 0;
      let childrenKey = 'children';
      const flatTree: Flat[] = [];
      function flattenChildren(node, parent?) {
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
              node[childrenKey].forEach(child => flattenChildren(child, node));
          }
      }
      stateTree.forEach(rootNode => {
          flattenChildren(rootNode);
      });
      return flatTree;
  }


  // 发射自定义事件
  private emitEvent(type: string, args: Flat[]) {
    if (this.options[type]) {
      this.options[type](args);
    }
  }
}