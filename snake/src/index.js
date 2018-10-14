import './index.css'

import Snake from './js/snake'
import swal from 'sweetalert'

const snakeGame = new Snake();

const $ = query => document.querySelector(query)
const Number = $('#number')

window.snakeGame = snakeGame

window.onload = function() {
  snakeGame.init()
}

document.addEventListener('keydown', event => {
  console.log(event.keyCode);
  switch(event.keyCode) {
    // L
    case 37:
    case 65:
      snakeGame.turn('left')
      break
    // U 
    case 38:
    case 87:
      snakeGame.turn('up')
      break
    // R 
    case 39:
    case 68:
      snakeGame.turn('right')
      break
    // D 
    case 40:
    case 83:
      snakeGame.turn('down')
      break 
  }
})

$('.snake-switch').addEventListener('click', () => {
  $('.snake-trigger').checked = true;
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

snakeGame.event.on('eat', function(number) {
  console.log('eat')
  Number.innerText = number
})

snakeGame.event.on('gameover', function(type) {
  swal({ 
    title: "Game Over", 
    text: type, 
    timer: 3000, 
    showConfirmButton: true 
  })
  $('.snake-switch').click()
})
