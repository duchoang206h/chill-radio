var message = document.getElementById('message');
var messageChat = document.getElementById('message-chat');
var user ={};
function newMessage(message, user){
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute('src',user.picture)
    img.setAttribute('width','25px');
    img.setAttribute('height','25px');
    img.setAttribute('style','border-radius: 50%');
    let name = document.createElement("span");
    
    let node = document.createElement("span");
   let textnode= document.createTextNode(message);
   name.appendChild(document.createTextNode(user.name))
  node.appendChild(textnode);
  div.appendChild(img)
  div.appendChild(name)
  div.appendChild(node);
  messageChat.appendChild(div);
}
message.addEventListener('keyup',(event)=>{
    if(event.keyCode===13) {
        event.preventDefault();
        let newM = message.value.toString();
        socket.emit('client-message',{newM, user})
        message.value = null;
    }
})
socket.on('server-message',  data => newMessage(data.message,data.user))
setTimeout(async() => {
    user = await auth0.getUser(); 
    console.log(user);
}, 3000);


