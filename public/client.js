const socket = io();

const email = document.querySelector('#email');
const inputChat = document.querySelector('#inputChat')
const productForm = document.querySelector('#productsForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productImg = document.querySelector('#productImg');
const tbody = document.querySelector('#tbody');
const chatForm = document.querySelector('#chatForm');
const divMsj = document.querySelector('#chatMsj');

productForm.addEventListener('submit', e =>{
    e.preventDefault();
    socket.emit('client:newProduct',{
       productName : productName.value,
       productPrice : productPrice.value,
       productImg : productImg.value
    })

})
socket.on('server:newProduct', (data) =>{
    console.log(data);
    tbody.innerHTML+=`   
    <tr>
        <td>${data.id}</td>
        <td>${data.productName}</td>
        <td>${data.productPrice}</td>
        <td><img src="${data.productImg}"></td>
    </tr>`;
})

chatForm.addEventListener('submit', e =>{
    e.preventDefault();    
    socket.emit('client:chat',{
        email: email.value,
        message: inputChat.value
    })
})
socket.on('server:chat', (data) =>{
    console.log(data, 'email');
    divMsj.innerHTML += `
    <p>${data.email} dice: ${data.message} </p>`
    })