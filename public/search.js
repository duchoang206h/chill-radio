const search_uri = origin + '/api/v1/search';
const addvideo_uri = origin + '/api/v1/video';
const search_uri_encode = encodeURI(search_uri);
const addvideo_encode = encodeURI(addvideo_uri);
let resultlist = [];
$('#search_type_input').on('keyup',(event)=>{
    if(event.keyCode ===13){
        const keyword = $('#search_type_input').val().toString();
        search(keyword);
    }
})
document.getElementById("btn_search").addEventListener("click",()=>{
    const keyword = $('#search_type_input').val().toString();
    search(keyword);
})
async function search (keyword){
        try {
            let result= '';
          const response = await axios.post(search_uri_encode,{keyword: keyword}); // Get arr Video from server
          resultlist = response.data;
       //   Display video to playlist
            resultlist.forEach(item => {
              result +=`
              <div class="video_result" id="${item.videoId}">
              <span width="10%" style="margin-right:5px;" ><button class="addtoplaylist" onclick="addtoplay('${resultlist.indexOf(item)}')">Add</button></span>
                    <span width="20%" style="margin-right:5px;"><img class="videoresult_img" width="80px" height="60px" src="https://i.ytimg.com/vi/${item.videoId}/default.jpg"></span>
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
   const response = await axios.post(addvideo_encode,{video: resultlist[index]});
    $('#search').css("display",'none');
    $('#search_result').html('');
    $('#search_type_input').val("");
    } catch (error) {
        
    }
  
}

document.getElementById("search_close").addEventListener('click',()=>{
    document.getElementById("search").style.display = 'none';
})
socket.on('addvideo',(video)=>{
if(Array.isArray(video) == false){
    video.addby = video.addby.slice(0, video.addby.length -4)+"*"; 
    let newdiv =  
    `<div class="video_items" id="${video.videoId}">
    <div class="box" >
    <span id="img-playlist-video"><img height="75px" width="100px" src="https://i.ytimg.com/vi/${video.videoId}/default.jpg"></span>
    <div>
        <div id="title"><span >${video.title}</span></div>
        <div id="addby"><span>added by ${video.addby}</span>
    </div>
    </div>
    </div>
    <div class="emotion">
    <i id="like-${video.videoId}" class="far fa-thumbs-up like" onclick="likeVideo('${video.videoId}')"></i>
    <span class="like_count" id="like_count-${video.videoId}">${video.like}</span>
    <i id="dislike-${video.videoId}" class="far fa-thumbs-down dislike" onclick="dislikeVideo('${video.videoId}')"></i>
    <span class="dislike_count" id="dislike_count-${video.videoId}">${video.dislike}</span>
    </div>
    </div>`
    document.getElementById('videolist').innerHTML += newdiv;
}else{
    let newdiv ='';
    video.forEach(item =>{
        item.addby = item.addby.slice(0, item.addby.length -4)+"*"; 
        newdiv +=  
        `<div class="video_items" id="${item.videoId}">
        <div class="box" >
        <span id="img-playlist-video"><img height="75px" width="100px" src="https://i.ytimg.com/vi/${item.videoId}/default.jpg"></span>
        <div>
            <div id="title"><span >${item.title}</span></div>
            <div id="addby"><span>added by ${item.addby}</span>
        </div>
        </div>
        </div>
        <div class="emotion">
        <i id="like-${item.videoId}" class="far fa-thumbs-up like" onclick="likeVideo('${item.videoId}')"></i>
        <span class="like_count" id="like_count-${item.videoId}">${item.like}</span>
        <i id="dislike-${item.videoId}" class="far fa-thumbs-down dislike" onclick="dislikeVideo('${item.videoId}')"></i>
        <span class="dislike_count" id="dislike_count-${item.videoId}">${item.dislike}</span>
        </div>
        </div>`

    })
    document.getElementById('videolist').innerHTML += newdiv;


}

})
