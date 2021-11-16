/* let string ='https://26vod-adaptive.akamaized.net/exp=1636918423~acl=%2F251232425%2F%2A~hmac=c2a8be5dbef7d9c5927cd5204db11b5664bc5167ea3eedfe52136fd4b79bb1b4/251232425/sep/video/2613965140,2613963623,2613965141,2613965151/master.json?base64_init=1';
const name = "Module 7 - Core 3"
string = 'ffmpeg -i \"' +string.replaceAll('master.json?base64_init=1',"master.m3u8?query_string_ranges=1") + '\"'+  ' -c copy -map p:0 ' +'\"'+name+'.mp4'+ '\"';
console.log(string); */
for(let i =0;i<70;i++){
    let w = Math.floor(Math.random()*2000)
}