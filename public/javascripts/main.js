let isLogin = false;
const playlist_uri = origin + "/api/v1/video/all";
const playlist_uri_encode = encodeURI(playlist_uri);
$("#addVideo").click((e) => {
  addtoplaylist();
});
async function  start() {
 const videolist = await axios.get(playlist_uri_encode);
  let playlist = "";
  videolist.data.forEach((video) => {
   if(!video.addby) video.addby = 'unknown';
   video.addby = video.addby.slice(0, video.addby.length -4)+"*"; 
   if(video.title.length > 46 ) {
      video.title = video.title.substring(0,46) +'...';
    } 
    playlist += `
  <div class="video_items" id="${video.videoId}">
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
  </div>
  `
  document.getElementById('videolist').innerHTML = playlist;
  });
}
const updateUI = (playlist)=>{
 

}
socket.emit('checkLogin');
socket.on('checkLogin',login =>isLogin =login)
async function addtoplaylist() {
  // check author
  
  if (isLogin) {
    $("#search").css("display", "block");
  } else {
    document.getElementById("login").style.display = "block";
  }
}
start();
function likeVideo(videoId){
  let like = document.getElementById(`like-${videoId}`)
  if(like.style.color != 'white'){
    like.style.color = 'white';
    socket.emit('like_video',videoId);
  }
  else {
    like.style.color = 'rgb(146, 139, 139)';
    socket.emit('unlike_video',videoId);
  }
}
function dislikeVideo(videoId){
  let dislike = document.getElementById(`dislike-${videoId}`)
  if(dislike.style.color != 'white'){
    dislike.style.color = 'white';
    socket.emit('dislike_video',videoId);
  }
  else {
    dislike.style.color = 'rgb(146, 139, 139)';
    socket.emit('undislike_video',videoId);
  }
}
socket.on('like_video',video =>{
  document.getElementById(`like_count-${video.videoId}`).innerHTML = video.like;
})
socket.on('dislike_video',video =>{
  document.getElementById(`dislike_count-${video.videoId}`).innerHTML = video.dislike;
})
socket.on('initLikeVideo',likevideos =>{
  if(likevideos.length !=0){
    likevideos.forEach(videoId =>{
        if(document.getElementById(`like-${videoId}`)){
            document.getElementById(`like-${videoId}`).style.color = "white";
        }
    })
  }
})
socket.on('initDislikeVideo',dislikevideos =>{
  if(dislikevideos.length !=0){
    dislikevideos.forEach(videoId =>{
      document.getElementById(`dislike-${videoId}`).style.color = "white";
    })
  }
})
