import './index.css'

import Snake from './js/snake'
import Ticker from 'ticker-js'

const snakeGame = new Snake();

const $ = query => document.querySelector(query)

window.onload = function() {
  snakeGame.init()
}

document.addEventListener('keydown', event => {
  console.log(event);
  
})

$('.snake-switch').addEventListener('click', () => {
  console.log('aa');
  
  snakeGame.restart()
})


$('.snake-trigger').addEventListener("click", function() {
  // if(this.checked) {
  //   snakeGame.pause(); 
  // }
  // else {
  //   snakeGame.resume(); 
  // }
  console.log(snakeGame.model.snake.body)
  snakeGame.updata()
  console.log(snakeGame.model.snake.body)
})
