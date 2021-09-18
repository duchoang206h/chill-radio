/*JS FOR SCROLLING THE ROW OF THUMBNAILS*/ 
async function addtoplaylist(){
  // check author
  const isAuthenticated = await auth0.isAuthenticated();
  if(isAuthenticated){
    
    document.getElementById('search').style.display = 'block';
  }else{
    console.log("not login");
    document.getElementById('login').style.display ='block';
  }
  
}
function start(){
  document.getElementById('start').style.display = 'none';
  document.getElementById('videoframe').src +='?autoplay=1';
  document.getElementById('main').style.display = 'block';
}