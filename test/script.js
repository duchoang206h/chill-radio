/*JS FOR SCROLLING THE ROW OF THUMBNAILS*/ 
$(document).ready(function () {
    $('.vid-item').each(function(index){
      $(this).on('click', function(){
        var current_index = index+1;
        $('.vid-item .thumb').removeClass('active');
        $('.vid-item:nth-child('+current_index+') .thumb').addClass('active');
      });
    });
  });

fetch('https://www.googleapis.com/youtube/v3/search?q=chill&maxResults=50&key=AIzaSyDiqU4vPycF8KBCcwCxpgb4Qwidtiqbb-Y')
  .then(response => response.json())
  .then(data => console.log(data));