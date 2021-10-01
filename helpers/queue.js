class Queue {
  constructor() {
    this.data = [];
  }
  init(arr){           // Create for my use case
    this.data = arr;
  }
  size(){               // Create for my use case
    return this.data.length;
  }
  addarray(arr){        // Create for my use case
    this.data = [...this.data,...arr]
  }
  isEmpty() {
    return this.data.length === 0;
  }

  enqueue(value) {
    this.data.push(value);
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    return this.data.shift();
  }

  peek() {
    if (this.isEmpty()) return undefined;

    return this.data[0];
  }

  rear() {
    if (this.isEmpty()) return undefined;

    return this.data[this.size - 1];
  }

  clear() {
    this.data.length = 0;
  }
}
module.exports =  Queue;
