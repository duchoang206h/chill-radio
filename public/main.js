$('#start').click((e)=>{
  start();
})
$('#addVideo').click((e)=>{
  addtoplaylist();
})

function start(){
  document.getElementById('start').style.display = 'none';
  document.getElementById('videoframe').src +='?autoplay=1';
  document.getElementById('main').style.display = 'block';
}