const socket = io();

const btnAddToCart = document.getElementsByClassName("btnAddToCart");
 for (const btn of btnAddToCart) {
     btn.addEventListener('click',()=>{
        socket.emit('homeClient:buyBtn', btn.dataset.id)
     })
 }