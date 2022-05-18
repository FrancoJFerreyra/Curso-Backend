const socket = io();

const btnRemoveProd = document.getElementsByClassName('btnRemoveProd')
const btnBuyCart = document.getElementById("buyCart");
const btnEmptyCart = document.getElementById("emptyCart");
console.log(btnRemoveProd);
for (const btn of btnRemoveProd) {
    btn.addEventListener('click',()=>{
        const productId = btn.dataset.id
        console.log('producto a eliminar', productId);
       socket.emit('cartClient: removeProd', productId)
    })
}
btnBuyCart.addEventListener("click", ()=>{
    socket.emit("client: buyCart")
})
btnEmptyCart.addEventListener("click", ()=>{
    socket.emit("client: emptyCart")
})
