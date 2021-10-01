

async function addtoplaylist(){
  // check author
  const isAuthenticated =auth0 == null ? true : await auth0.isAuthenticated()  ;
  if(isAuthenticated){
    
    $('#search').css("display",'block');
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