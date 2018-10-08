import Model from '../src/js/model.js'
// import {add, multi} from './index'

describe("Model模块单元测试",function(){
  let model = new Model()
  it("初始化函数测试",function(){
    model.init() 
    expect(model.food.index).toBeLessThan(400);
    expect(model.food.x).toBe(model.food.index%20);
    expect(model.food.y).toBe(Math.floor(model.food.index/20));
  });

  it("updataMap函数测试", function(){
    let model = new Model({width: 20, height: 20})
    model.updataMap(0, 'food')
    expect(model.map[0]).toBe('food')
  });

  it('随机函数测试', function() {
    let model = new Model({width: 20, height: 20})
    model.randomFoodIndex()
    expect(model.randomFoodIndex()).toBeLessThan(400)
  });

  it("投喂函数测试",function(){
    let model = new Model({width: 20, height: 20})
    model.feed()
    expect(model.food.index).toBeLessThan(400);
    expect(model.food.x).toBe(model.food.index%20);
    expect(model.food.y).toBe(Math.floor(model.food.index/20));
  });

})