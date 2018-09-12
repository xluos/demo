// 职责链包装节点类

class Chain {
  constructor(fn,self) {
    this.self = self
    this.fn = fn;
    this.successor = null;
  }
  setNextSuccessor(successor) {
    return this.successor = successor;
  }
  passRequest() {
    let ret = this.fn.apply(this.self, arguments);
    if (ret === 'nextSuccessor') {
      return this.successor
          && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
  }
  next() {
    return this.successor
        && this.successor.passRequest.apply(this.successor, arguments);
  }
}

export default Chain