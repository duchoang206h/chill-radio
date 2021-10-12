let tag = document.createElement('script');
const URL_GETVIDEO = 'http://localhost:3000/api/getCurrentVideo'
console.log(URL_GETVIDEO)
const URL_GETVIDEO_ENCODE  = encodeURI(URL_GETVIDEO);
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
        const res = await axios.get(URL_GETVIDEO_ENCODE)
        console.log(res);
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