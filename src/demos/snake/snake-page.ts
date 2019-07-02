import './snake-page.less';
import Game from './js/Game.ts';


window.addEventListener('DOMContentLoaded', function () {
  const map = document.getElementById('map');
  console.log('snake');
  const game = new Game(map);
  game.start();
});