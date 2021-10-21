let tag = document.createElement('script');
const socket = io("http://localhost:3000");
let volume = document.querySelector("#volume-control");
const video_uri = origin +'/api/v1/video'
const video_uri_encode  = encodeURI(video_uri);
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      let player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('videoframe', {
          height: '95%',
          width: '95%',
          videoId: 'M7lc1UVf-VE',
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      async function onPlayerReady(event) {
        const res = await axios.get(video_uri_encode)
      //  console.log(res);
        player.loadVideoById(res.data.videoId,res.data.startAt )
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
  videolist = document.getElementById("videolist");   // Get the <ul> element with id="myList"
  videolist.removeChild(list.childNodes[0]);
})
socket.on("new_listener",(listener)=>{
  $('#listerns').html(listener);
})
volume.addEventListener("change", ()=> {
        console.log(volume.value);
 player.setVolume(volume.value);
})