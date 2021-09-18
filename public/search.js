const inputsearch = document.getElementById('search_type');
inputsearch.addEventListener('keyup',(event)=>{
if(event.keyCode ===13){
    const keyword = inputsearch.value.toString();
    console.log(keyword);
    search(keyword);
}
})
async function search (keyword){
        try {
            let result= '';
            const encodedURI = encodeURI('http://localhost:3000/search/video');
          const response = await axios.post(encodedURI,{keyword: keyword});
          console.log(response);
          response.data.forEach(item => {
              result +=`
              <div id="video_result" >
              <span width="10%" style="margin-right:5px;" ><button onclick="addtoplay('${item.videoId}')">Add</button></span>
                    <span width="20%" style="margin-right:5px;"><img width="80px" height="60px" src="https://i.ytimg.com/vi/${item.videoId}/default.jpg"></span>
                   <span  height="100%" style="margin-right:5px;"> <span >${item.title}</span></span>
              </div>
              `


          });
          document.getElementById('search_result').innerHTML += result;
        } catch (error) {

        }
}
function addtoplay(videoId){
    document.getElementById('videoframe').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    document.getElementById('search').style.display = 'none';
    document.getElementById('search_result').innerHTML = '';
    document.getElementById('search_type') = '';
}
/* document.body.addEventListener('click',()=>) */