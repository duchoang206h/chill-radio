let tag = document.createElement("script");
let currentVideo = {};
const socket = io(origin);
let volume = document.querySelector("#volume-control");
const video_uri = origin + "/api/v1/video";
const video_uri_encode = encodeURI(video_uri);
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
async function getCurrentVideo(){
  const res = await axios({
    url:video_uri_encode,
    method:'get'
  })
  currentVideo.videoId = res.data.videoId;
  currentVideo.startAt = res.data.startAt;
  window.YT.ready(function() {
    player = new YT.Player("videoframe", {
      height: "95%",
      width: "95%",
      videoId: currentVideo.videoId,
      playerVars: {
        'playsinline': 1,
        'controls': 0,
        'autoplay': 1,
        'mute':1,
        'start':Math.floor(currentVideo.startAt)
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  })
}
getCurrentVideo();
function onPlayerReady(event) {
  event.target.mute();
  event.target.setVolume(0);
  event.target.playVideo();
}
function stopVideo() {
  player.stopVideo();
}
socket.on("new_video", (video) => {
  if(player == undefined || player == null){

    window.YT.ready(function() {
    player = new YT.Player("videoframe", {
      height: "95%",
      width: "95%",
      videoId: video.videoId,
      playerVars: {
        'playsinline': 1,
        'controls': 0,
        'autoplay': 1,
        
        'mute':1,
        'start':Math.floor(video.startAt)
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  })
  }
  else{
    player.loadVideoById(video.videoId, video.startAt);
  }
  document.getElementById(currentVideo.videoId).outerHTML = "";
  currentVideo.videoId = video.videoId;
});
socket.on("new_listener", (listener) => {
  $("#listerns").html(listener);
});
let previou_volume;
let muteIcon = document.getElementById("muted");
document.getElementById("btn-muted").addEventListener("click", () => {
  if (player.isMuted()) {
    player.unMute();
    muteIcon.className = "fas fa-volume-up";
    volume.value = previou_volume || 30;
    player.setVolume(volume.value);
  } else {
    player.mute();
    volume.value = 0;
    muteIcon.className = "fas fa-volume-mute";
  }
});

volume.addEventListener("change", () => {
  if (player.isMuted()) player.unMute();
  if (muteIcon.classList.contains("fa-volume-mute"))
    muteIcon.className = "fas fa-volume-up";
  if (volume.value == 0) muteIcon.className = "fas fa-volume-mute";
  previou_volume = volume.value;
  player.setVolume(volume.value);
});

