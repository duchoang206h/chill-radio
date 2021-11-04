class Queue {
  constructor() {
    this.data = [];
    this.priodata = [];
  }
  enqueue(value) {
    this.priodata.push(value);
  }
  addarray(arr) {
    this.data = [...this.data, ...arr];
  }
  dequeue() {
    if (this.priodata.length == 0) {
      /* if (this.data.length == 0) return undefined; */
         this.data.shift();
      return this.data.slice(0,1)[0]
    } else {
      this.priodata.shift();
      return this.priodata.slice(0,1)[0]
    }
  }
  size() {
    return this.data.length + this.priodata.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  getAllData() {
    // Return the whole data for playlist on client
    return [...this.priodata, ...this.data];
  }
}
module.exports = Queue;
