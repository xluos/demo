import './index.css'
import View from '../src/js/view'
import Model from './js/model'

const view = new View({
  width : 1000,
  height : 1000,
  row : 20,
  col : 20,
  el : '#app',
  snakeColor : '#456',
  foodColor : 'red'
})
const model = new Model()

model.init()
view.init({
  snake: model.snake.body,
  food: model.food
})

if (module.hot) {
  
  module.hot.accept(/\.\/js\/*\.js/, function () {
    console.log('asdasd');
    
    new model()
  })
  
}