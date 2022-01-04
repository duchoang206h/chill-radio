class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(value) {
    this.data.push(value);
  }
  addarray(arr) {
    this.data = [...this.data, ...arr];
  }
  dequeue() {
    return this.data.shift();
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  getAllData() {
    // Return the whole data for playlist on client
    return  this.data ;
  }
}
module.exports = Queue;
