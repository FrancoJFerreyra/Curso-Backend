const socket = io();

const productForm = document.querySelector('#productsForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productImg = document.querySelector('#productImg');
const table = document.querySelector('#table');

productForm.addEventListener('submit', e =>{
    e.preventDefault();
    socket.emit('client:newProduct',{
       productName : productName.value,
       productPrice : productPrice.value,
       productImg : productImg.value
    })
    socket.on('server:newProduct', (data) =>{
        if (products.length > 0) {
            table.innerHTML+= `
        <table class="table table-dark">
            <thead>
                <tr>
                    <th class="col">#</th>
                    <th class="col">Nombre del producto</th>
                    <th class="col">Precio </th>
                    <th class="col">imagen </th>
                </tr>
            </thead>
            <tbody>
            {{#each products}}
                <tr>
                    <th scope="row" >${data.indexOf}</th>
                    <td> ${data.productName} </td>
                    <td> ${data.productPrice}</td>
                    <td><img src="${data.productImg}" > </td>
                </tr>
            </tbody>
        </table>;`
        }
        
    })
})