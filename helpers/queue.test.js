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
           this.data.shift();
        return this.data.slice(0,1)[0]
      } else {
        this.priodata.shift();
        if(this.priodata.length == 0) return this.dequeue();
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
const a = [1,3,4,5,6,7,8];
console.log(a.splice(0,1));
console.log(a);
const newQueue = new PriorityQueue();
newQueue.enqueue("Thu 2");
newQueue.enqueue("Thu 3");
newQueue.addarray(["Tuesday", "Thursday"]);
console.log(newQueue);
newQueue.dequeue();
console.log(newQueue);
newQueue.dequeue();
console.log(newQueue);
newQueue.dequeue();
console.log(newQueue);
newQueue.dequeue();
console.log(newQueue);

