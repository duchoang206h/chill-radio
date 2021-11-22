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
  console.log(res.data);
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
function onPlayerStateChange(event) {
  console.log(event.data);
}
function stopVideo() {
  player.stopVideo();
}
socket.on("new_video", (video) => {
  if(!player){
   
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
  }
  else{
    player.loadVideoById(video.videoId, video.startAt);
  }
  document.getElementById(currentVideo.videoId).outerHTML = "";
  currentVideo.videoId = video.videoId;
  document.getElementById(`arrow-${currentVideo.videoId}`).style.display = "block";
});
socket.on("new_listener", (listener) => {
  $("#listerns").html(listener);
});
let previou_volume;
let muteIcon = document.getElementById("muted");
document.getElementById("btn-muted").addEventListener("click", () => {
  if (player.isMuted()) {
    player.unMute();
    muteIcon.className = "fal fa-volume fa-lg";
    volume.value = previou_volume || 30;
    player.setVolume(volume.value);
  } else {
    player.mute();
    volume.value = 0;
    muteIcon.className = "fal fa-volume-mute fa-lg";
  }
});
/* function setCookie(cname, cvalue, expSeconds) {
  const d = new Date();
  d.setTime(d.getTime() + (expSeconds));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
} */
volume.addEventListener("change", () => {
  if (player.isMuted()) player.unMute();
  if (muteIcon.classList.contains("fa-volume-mute"))
    muteIcon.className = "fal fa-volume fa-lg";
  if (volume.value == 0) muteIcon.className = "fal fa-volume-mute fa-lg";
  previou_volume = volume.value;
  console.log(volume.value);
  player.setVolume(volume.value);
});

