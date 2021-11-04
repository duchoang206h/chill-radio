let tag = document.createElement('script');
let currentVideo = '';
let startAt = 0;
let volume = document.querySelector("#volume-control");
const video_uri = origin +'/api/v1/video'
const video_uri_encode  = encodeURI(video_uri);
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      let player;
      async function onYouTubeIframeAPIReady() {
        const res = await axios.get(video_uri_encode)
      //  console.log(res);
        currentVideo = res.data.videoId;
        startAt = res.data.startAt;
        player = new YT.Player('videoframe', {
          height: '95%',
          width: '95%',
          videoId: res.data.videoId,
          playerVars: {
            'playsinline': 1,
            'autoplay': 1,
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      async function onPlayerReady(event) {
       event.target.mute();
       event.target.setVolume(0);
       
       event.target.loadVideoById(currentVideo,startAt);
       /*  player.cueVideoById(currentVideo,startAt); */
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        console.log(event.data);
        
      }
      function stopVideo() {
        player.stopVideo();
      }
  socket.on("new_video",(video)=>{
  console.log("toi day");
  console.log(video);
  player.loadVideoById(video.videoId,video.startAt)
  console.log("check currentVideo",currentVideo);
  document.getElementById(currentVideo).outerHTML = '';
  currentVideo = video.videoId;
  document.getElementById(`arrow-${currentVideo}`).style.display = 'block';
})
socket.on("new_listener",(listener)=>{
  $('#listerns').html(listener);
})
volume.addEventListener("change", ()=> {
  player.unMute();
        console.log(volume.value);
 player.setVolume(volume.value);
})
setTimeout(()=>document.getElementById(`arrow-${currentVideo}`).style.display = 'block',3000)