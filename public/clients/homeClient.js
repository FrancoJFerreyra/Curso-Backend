const socket = io();

const btnAddToCart = document.getElementsByClassName("btnAddToCart");
 for (const btn of btnAddToCart) {
     btn.addEventListener('click',()=>{
         const productId = btn.dataset.id
         console.log('producto id', btn.dataset.id);
        socket.emit('homeClient:buyBtn', productId)
     })
 }