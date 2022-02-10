const socket = io();

const productForm = document.querySelector('#productsForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productImg = document.querySelector('#productImg');
const tbody = document.querySelector('#tbody');

productForm.addEventListener('submit', e =>{
    e.preventDefault();
    socket.emit('client:newProduct',{
       productName : productName.value,
       productPrice : productPrice.value,
       productImg : productImg.value
    })
    socket.on('server:newProduct', (data) =>{
        // if (data.length > 0) {
            
        // }
        if(tbody != null){
            return tbody.innerHTML+= `   
                <tr>
                    <td> ${data.productName} </td>
                    <td> ${data.productPrice}</td>
                    <td><img src="${data.productImg}" > </td>
                </tr>`;   
        }
        else{
            console.log('error');
        }   
    })
})