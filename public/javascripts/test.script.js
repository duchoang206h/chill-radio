const search = document.getElementById('search-video')
$(document).ready(function () {
    $('.vid-item').each(function(index){
      $(this).on('click', function(){
        var current_index = index+1;
        $('.vid-item .thumb').removeClass('active');
        $('.vid-item:nth-child('+current_index+') .thumb').addClass('active');
      });
    });
  });
  search.addEventListener('keyup', async (event)=>{
    if(event.keyCode===13) {
        event.preventDefault();
        document.getElementById('searchForm').submit()
    }
})
async function searchVideo(keyword){
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=50&key=AIzaSyDiqU4vPycF8KBCcwCxpgb4Qwidtiqbb-Y`);
const data = await response.json();
return data;
 }
