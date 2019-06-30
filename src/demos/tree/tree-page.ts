import './tree-page.less';
import Tree from './Tree.ts';
import { Flat, DataTree } from './Options';
const data: DataTree[] = [
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
  const treeBox = <HTMLElement>document.querySelector('.tree-box');
  const b = treeBox.getElementsByTagName('b')[0];
  const tree = new Tree(treeBox, {
    data,
    onInit(node: Flat[]) {
      console.log('onInit', node);
      b.innerText = '当前选中（按住ctrl可多选）：' + JSON.stringify(node);
    },
    onSelectChange(node: Flat[]) {
      console.log('onSelectChange', node);
      b.innerText = '当前选中（按住ctrl可多选）：' + JSON.stringify(node);
    }
  });
});