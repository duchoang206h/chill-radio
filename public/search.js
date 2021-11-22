const search_uri = origin + '/api/v1/search';
const addvideo_uri = origin + '/api/v1/video';
const search_uri_encode = encodeURI(search_uri);
const addvideo_encode = encodeURI(addvideo_uri);
console.log("cookie",decodeURIComponent(document.cookie));
let resultlist = [];
$('#search_type').on('keyup',(event)=>{
    if(event.keyCode ===13){
        const keyword = $('#search_type').val().toString();
      console.log(keyword)
        search(keyword);
    }
})
async function search (keyword){
        try {
            let result= '';
          const response = await axios.post(search_uri_encode,{keyword: keyword}); // Get arr Video from server
          resultlist = response.data;
          console.log(resultlist);
       //   Display video to playlist
            resultlist.forEach(item => {
              result +=`
              <div class="video_result" id="${item.videoId}">
              <span width="10%" style="margin-right:5px;" ><button onclick="addtoplay('${resultlist.indexOf(item)}')">Add</button></span>
                    <span width="20%" style="margin-right:5px;"><img width="80px" height="60px" src="https://i.ytimg.com/vi/${item.videoId}/default.jpg"></span>
                   <span  height="100%" style="margin-right:5px;"> <span >${item.title}</span></span>
              </div>
              `
          });
          $('#search_result').html(result);
        } catch (error) {
            console.log(error);
        }
}
async function addtoplay(index){
    try {
    console.log(resultlist[index]);
   const response = await axios.post(addvideo_encode,{video: resultlist[index]});
   console.log(response);
    //  player.loadVideoById(videoId);
   // $('#videoframe').attr("src",`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    $('#search').css("display",'none');
    $('#search_result').html('');
    $('#search_type').html('');
    } catch (error) {
        
    }
  
}
function closeSearch(){
    $('#search').css("display",'none');
}
socket.on('addvideo',(video)=>{
let newdiv =  
`<div class="box" id="${video.videoId}">
<span id="order"><i id = "arrow-${video.videoId}" style="display:none;" class="fas fa-caret-right"></i></span>
<div class="emotion"><i id="like-${video.videoId}" class="far fa-heart like" onclick="likeVideo('${video.videoId}')"></i>
<span class="like_count" id="like_count-${video.videoId}">0</span>
<i id="unlike-${video.videoId}" class="fas fa-arrow-down unlike" onclick="unLikeVideo('${video.videoId}')" ></i></div>
<span id="img-playlist-video"><img height="75px" width="100px" src="https://i.ytimg.com/vi/${video.videoId}/default.jpg"></span>
<div>
    <div id="title"><span >${video.title}</span></div>
    <div id="addby"><span>added by ${video.addby}</span></div>
</div>
</div>`
document.getElementById('videolist').innerHTML += newdiv;
})
