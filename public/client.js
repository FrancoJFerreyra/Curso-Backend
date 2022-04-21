const socket = io();

const btnLogout = document.querySelector("#logout");
const idChat = document.querySelector("#chat");
const email = document.querySelector("#email");
const userName = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const age = document.querySelector("#age");
const alias = document.querySelector("#alias");
const avatar = document.querySelector("#avatar");
const inputChat = document.querySelector("#inputChat");
const chatForm = document.querySelector("#chatForm");
const divMsj = document.querySelector("#chatMsj");

btnLogout.addEventListener("click", (e) => {
  socket.emit("client:logout", console.log("logout req recibied"));
  console.log('click');
});
socket.on('server:redirect', (logoutHbs)=>{
  window.location.href = logoutHbs;
})

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("client:chat", {
    id: email.value,
    name: userName.value,
    lastname: lastname.value,
    age: age.value,
    alias: alias.value,
    avatar: avatar.value,
    message: inputChat.value,
  });
  email.value = "";
  userName.value = "";
  lastname.value = "";
  age.value = "";
  alias.value = "";
  avatar.value = "";
  inputChat.value = "";
});
// socket.on('Mensajes almacenados', (data)=>{
//   for (const message of data) {

//   }
// })
socket.on("server:chat", (data) => {
  console.log(data, "email");
  divMsj.innerHTML += `
    <p>${data.id} dice: ${data.message} </p>`;
});
