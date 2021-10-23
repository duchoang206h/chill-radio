class Queue {
  constructor() {
    this.data = [];
  }
  size() {
    return this.data.length;
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
  addarray(arr) {
    this.data = [...this.data, ...arr];
  }
  getAllData(){              // Return the whole data for playlist on client
    return this.data;
  }
}
module.exports = Queue;
