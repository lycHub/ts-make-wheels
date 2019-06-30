import './tree-page.less';
import Tree from './Tree.ts';
import { Flat } from './Options';
const data = [
  {
    title: 'parent 1',
    expand: true,
    children: [
      {
        title: 'parent 1-1',
        expand: true,
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
            title: 'leaf 2-1-2'
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
  const tree = new Tree(treeBox, {
    data,
    onSelectChange(node: Flat[]) {
      const b = treeBox.getElementsByTagName('b')[0];
      console.log('onSelectChange', node);
      b.innerText = '当前选中：' + JSON.stringify(node);
    }
  });
});