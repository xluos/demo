import './index.css'

import Snake from './js/snake'
import Ticker from 'ticker-js'

const snakeGame = new Snake();

const $ = query => document.querySelector(query)

window.onload = function() {
  snakeGame.init()
}

document.addEventListener('keydown', event => {
  console.log(event.keyCode);
  switch(event.keyCode) {
    // L
    case 37:
      snakeGame.turn('left')
      break
    // U 
    case 38:
      snakeGame.turn('up')
      break
    // R 
    case 39:
      snakeGame.turn('right')
      break
    // D 
    case 40:
      snakeGame.turn('down')
      break 
  }
})

$('.snake-switch').addEventListener('click', () => {
  console.log('aa');
  
  snakeGame.restart()
})


$('.snake-trigger').addEventListener("click", function() {
  if(this.checked) {
    snakeGame.pause(); 
  }
  else {
    snakeGame.resume(); 
  }
})


