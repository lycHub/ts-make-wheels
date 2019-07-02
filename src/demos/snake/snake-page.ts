import './snake-page.less';
import Game from './js/Game.ts';


window.addEventListener('DOMContentLoaded', function () {
  const btns = document.getElementsByTagName('button');
  const h2 = document.getElementsByTagName('h2')[0];
  const map = document.getElementById('map');

  const game = new Game(map);
  game.on('score-change', function(score: number) {
    console.log('score change', score);
    h2.innerText = '当前得分：' + score;
  });
  game.on('over', function(score: number) {
    alert('over, 当前得分：' + score);
  });
  game.on('refresh', function() {
    h2.innerText = '当前得分：0';
  });

  btns[0].addEventListener('click', game.start.bind(game));
  btns[1].addEventListener('click', game.pause.bind(game));
  btns[2].addEventListener('click', game.refresh.bind(game));
});