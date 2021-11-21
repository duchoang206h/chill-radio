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
 function search(array, video){
   return array.find(v => v.videoId == video.videoId);
 }

const a = [{
  videoId : "Zzn9-ATB9aU",
  duration : 322,
  title : "Nàng Thơ | Hoàng Dũng | Official MV",
  addby : "HOÀNG ĐỨC",
  like : 0,
}

,
{
  videoId: "VaExN-H5vCc",
  duration : 195,
  title: "LEMON TREE ANIMATION WITH LYRICS",
  addby : "HOÀNG ĐỨC",
  like : 0,
}

,
{
  videoId : "e9oxsf3NWMs",
  duration : 245,
  title : "[VietSub+Effect] Until You -  Shayne Ward",
 addby : "HOÀNG ĐỨC",
  like : 0,
 
}

,
{
  
  videoId : "F5tS5m86bOI",
  duration : 262,
  title : "LẠ LÙNG / Vũ. (Original)",
 addby : "HOÀNG ĐỨC",
  like : 0,
 
},
{
  videoId : "ixdSsW5n2rI",
  duration : 337,
  title : "BƯỚC QUA NHAU / Vũ. (Official MV)",
 addby : "HOÀNG ĐỨC",
  like : 0,
  
}];
const obj = search(a,{
  videoId : "ixdSsW5n2rI",
  duration : 337,
  title : "BƯỚC QUA NHAU / Vũ. (Official MV)",
 addby : "HOÀNG ĐỨC",
  like : 0,
});
obj.title = "Hoang cute";
console.log(a);
/* console.log(a.splice(0,1));
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
 */
