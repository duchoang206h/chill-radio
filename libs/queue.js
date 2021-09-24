class Queue {
  constructor(capacity) {
    this.data = [];
    this.capacity = capacity;
  }

  isFull() {
    return this.data.length === this.capacity;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  enqueue(value) {
    if (this.isFull()) return false;

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
    this.size = 0;
  }
}
module.exports = Queue;
