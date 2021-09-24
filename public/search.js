const search_type = $('#search_type');
const search_result = $('#search_result');
const search_div = $('#search');
search_type.on('keyup',(event)=>{
if(event.keyCode ===13){
    const keyword = search_type.val().toString();
   // console.log(keyword);
    search(keyword);
}
})
async function search (keyword){
        try {
            let result= '';
            const encodedURI = encodeURI('http://localhost:3000/search/video');
          const response = await axios.post(encodedURI,{keyword: keyword}); // Get arr Video from server
       //   Display video to playlist
          response.data.forEach(item => {
              result +=`
              <div class="video_result" id="${item.videoId}">
              <span width="10%" style="margin-right:5px;" ><button onclick="addtoplay('${item.videoId}')">Add</button></span>
                    <span width="20%" style="margin-right:5px;"><img width="80px" height="60px" src="https://i.ytimg.com/vi/${item.videoId}/default.jpg"></span>
                   <span  height="100%" style="margin-right:5px;"> <span >${item.title}</span></span>
              </div>
              `


          });
          search_result.html(result);
        } catch (error) {

        }
}
function addtoplay(videoId){
    $('#videoframe').attr("src",`https://www.youtube.com/embed/${videoId}?autoplay=1`);
    search_div.css("display",'none');
    search_result.html('');
    search_type.html('');
}
function closeSearch(){
    search_div.css("display",'none');
}

/* document.body.addEventListener('click',()=>) */