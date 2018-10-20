import './index.css'

import Snake from './js/snake'
import Notice from './lib/notice'
import swal from 'sweetalert'

const snakeGame = new Snake();
const notice = new Notice();

let isAuto = true
let isFocus = false

const $ = query => document.querySelector(query)
const Number = $('#number')
const snakeTrigger = $('.snake-trigger')
const snakeSpeed = $('.snake-speed')
const levelNumber = $('#level-number')

window.snakeGame = snakeGame
window.notice = notice

window.onload = function() {
  snakeGame.init()
  notice.init()
}

// 按键事件用于pc
document.addEventListener('keydown', event => {
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
    // 空格控制暂定开始
    case 32:
      !isFocus && snakeTrigger.click()
      break
  }
})

// 重置游戏
$('.snake-switch').addEventListener('click', () => {
  snakeTrigger.checked = true;
  snakeGame.restart()
  Number.innerText = 0
  isAuto && (snakeSpeed.value = 2,levelNumber.innerText = 2)
})

// 控制四个方向的按键事件
$('.snake-up').addEventListener('click', () => snakeGame.turn('up'))
$('.snake-right').addEventListener('click', () => snakeGame.turn('right'))
$('.snake-down').addEventListener('click', () => snakeGame.turn('down'))
$('.snake-left').addEventListener('click', () => snakeGame.turn('left'))

// 控制速度
snakeSpeed.addEventListener('change', function (e) {
  !snakeTrigger.checked && snakeTrigger.click()
  isAuto && (isAuto = false)
  snakeGame.speed = parseInt(this.value)
  levelNumber.innerText = parseInt(this.value)
  notice.show('速度设为手动模式')
})
window.snakeTrigger = snakeTrigger
// 点击切换暂停状态
snakeTrigger.addEventListener("click", function toggleGameStatus() {
  if(snakeTrigger.checked) {
    snakeGame.pause();
  } else {
    snakeGame.resume(); 
  }
})
snakeTrigger.addEventListener('focus', e => isFocus = true)
snakeTrigger.addEventListener('blur', e => isFocus = false)

function setLvNumber(n) {
  levelNumber.innerText = 
  snakeSpeed.value = 
  snakeGame.speed = 10
  notice.show(`速度提升为Lv.${10}`)
}

// 吃食事件
snakeGame.event.on('eat', function(number) {
  console.log('eat')
  number++
  Number.innerText = number
  if(isAuto) {
    if(number === 30) {
      setLvNumber(10)
      return
    }
    if(number === 25) {
      setLvNumber(7)
      return
    }
    if(number === 20) {
      setLvNumber(6)
      return
    }
    if(number === 15) {
      setLvNumber(5)
      return
    }
    if(number === 10) {
      setLvNumber(4)
      return
    }
    if(number === 5) {
      setLvNumber(3)
      return
    }
  }
})

// 游戏结束事件
snakeGame.event.on('gameover', function(type) {
  let text = ''
  switch (type) {
    case 'snake':
      text = '吃到自身'
      break;
    case 'wall':
      text = '撞墙而死'
      break;

    default:
      text = '未知原因'
      break;
  }
  swal({ 
    title: "Game Over", 
    text: `${text}  分数：${Number.innerText}`, 
    showConfirmButton: true 
  })
  $('.snake-switch').click()
})
