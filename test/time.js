function filteredArray(arr, elem) {
    let newArr = arr;
    // Only change code below this line
  arr.forEach(el=>{
      let t = true
    el.forEach(d=>{if(t && (d==elem) ) {
        t = false ;
        return newArr.splice(newArr.indexOf(el),1);}})
  })
    // Only change code above this line
    return newArr;
  }
  
 // console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));
  function reverseString(str) {
    return str.split('').reverse().join('');
  }
  
 // console.log(reverseString("hello")); 
  for(let i = 0;i<100;i++){
    if(i%15 ==0) console.log(i+'chia het cho 15');
    else if(i%5==0)  console.log(i+'chia het cho 5');
    else if(i%3 ==0 )  console.log(i+'chia het cho 3');
  }