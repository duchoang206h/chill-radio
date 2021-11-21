const socket = io(origin);
const playlist_uri = origin + "/api/v1/video/all";
const playlist_uri_encode = encodeURI(playlist_uri);
$("#addVideo").click((e) => {
  addtoplaylist();
});
async function  start() {
  document.getElementById("start").style.display = "none";
  document.getElementById("main").style.display = "block";
 const videolist = await axios.get(playlist_uri_encode);
  console.log(videolist.data);
  let playlist = "";
  videolist.data.forEach((video) => {
   if(!video.addby) video.addby = 'unknown';
   if(video.title.length > 46 ) {
      video.title = video.title.substring(0,46) +'...';
      console.log(video.title);
    } 
    playlist += `
  <div class="box" id="${video.videoId}">
  <span id="order"><i id = "arrow-${video.videoId}" style="display:none;" class="fas fa-caret-right"></i></span>
  <div class="emotion"><i id="like-${video.videoId}" class="fas fa-arrow-up like" onclick="likeVideo('${video.videoId}')"></i>
  <span class="like_count" id="like_count-${video.videoId}">0</span>
  <i id="unlike-${video.videoId}" class="fas fa-arrow-down unlike" onclick="unLikeVideo('${video.videoId}')" ></i></div>
  <span id="img-playlist-video"><img height="75px" width="100px" src="https://i.ytimg.com/vi/${video.videoId}/default.jpg"></span>
  <div>
      <div id="title"><span >${video.title}</span></div>
      <div id="addby"><span>added by ${video.addby}</span></div>
  </div>
  </div>`
  document.getElementById('videolist').innerHTML = playlist;
  });
}
const updateUI = (playlist)=>{
 

}
async function addtoplaylist() {
  // check author
  if (decodeURIComponent(document.cookie)) {
    $("#search").css("display", "block");
  } else {
    console.log("not login");
    document.getElementById("login").style.display = "block";
  }
}
start();
function likeVideo(videoId){
  let like = document.getElementById(`like-${videoId}`)
  if(like.style.color == 'white'){
    like.style.color = 'rgb(146, 139, 139)';
    socket.emit('like_video',videoId);
  }
  else {
    like.style.color = 'white';
    socket.emit('unlike_video',videoId);
  }
}

function unLikeVideo(videoId){
  console.log(videoId);
}