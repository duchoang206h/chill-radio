/* const request = require('request');
request('https://www.googleapis.com/youtube/v3/search?q=chill&maxResults=50&key=AIzaSyDiqU4vPycF8KBCcwCxpgb4Qwidtiqbb-Y', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log(response); // Print the response status code if a response was received
}); */
/* let ipsConnected = {}
ipsConnected.name = 'hoang'
console.log(ipsConnected.hasOwnProperty('name'));
if(!ipsConnected.) */
let string ='';
for(let i = 0;i<50;i++){
    let w = Math.floor(Math.random()*2000);
    let d  = Math.floor(Math.random()*2000);
    string+=`${w}px ${d}px #fff ,`
}
console.log(string);