const socket = io();

const productForm = document.querySelector('#productsForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productImg = document.querySelector('#productImg');
const table = document.querySelector('#table')
const tbody = document.querySelector('#tbody');

productForm.addEventListener('submit', e =>{
    e.preventDefault();
    socket.emit('client:newProduct',{
       productName : productName.value,
       productPrice : productPrice.value,
       productImg : productImg.value
    })
    socket.on('server:newProduct', (data) =>{
        if (data.length > 0) {
            table.innerHTML+=`<div class="table-responsive">
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th class="col">#</th>
                        <th class="col">Nombre del producto</th>
                        <th class="col">Precio </th>
                        <th class="col">imagen </th>
                    </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </div>`;
        }
        else{
            table.innerHTML+='<h3 class="text-danger bg-red">No se encontraron productos</h3>'
        }
        if(tbody != null){
            for (const product of data) {
                return tbody.innerHTML+= `   
                <tr>
                    <td> ${product.productName} </td>
                    <td> ${product.productPrice}</td>
                    <td><img src="${product.productImg}" > </td>
                </tr>`;   
            }
            
        }
        else{
            console.log('error');
        }   
    })
})