class PriorityQueue {
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
      return this.data.shift();
    } else {
      return this.priodata.shift();
    }
  }
  size() {
    return this.data.length + this.priodata.length;
  }
  isEmpty() {
    return this.size == 0;
  }
  getAllData() {
    // Return the whole data for playlist on client
    return [...this.priodata, ...this.data];
  }
}
const a = [1,3,4,5,6,7,8];
console.log(a.splice(0,1));
console.log(a);
const newQueue = new PriorityQueue();
newQueue.addtoprio("Thu 2");
newQueue.addtoprio("Thu 3");
newQueue.addtoprio("Thu 4");
newQueue.add("Monday");
newQueue.add(["Tuesday", "Thursday"]);
newQueue.dequeue();
newQueue.dequeue();
newQueue.dequeue();
newQueue.dequeue();
console.log(newQueue);

