import Model from './model'

import View from './view'

import Control from './control'

export default class Snake extends Control {
    constructor(option) {
        super(new View(option), new Model(option))
    }
}