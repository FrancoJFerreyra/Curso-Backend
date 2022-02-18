const socket = io();

const html = document.querySelector('#htmlContainer');
const productForm = document.querySelector('#productsForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productImg = document.querySelector('#productImg');
const card = document.querySelector('#cards-container');
const chatForm = document.querySelector('#chatForm');
const divMsj = document.querySelector('#chatMsj');

const admin = true;

//VERIFICA SI ADMIN=TRUE O FALSE
if (admin == true) {
    //CAPTURA EVENTO PARA CREAR OBJ
    productForm.addEventListener('submit', e =>{
        console.log(e);
        e.preventDefault();
        socket.emit('client:newProduct',{
            productName : productName.value,
            productPrice : productPrice.value,
            productImg : productImg.value
        })

    })
    //CREA CARD PARA ADMIN
    socket.on('server:newProduct', (data) =>{

        console.log(data);
        card.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img src="${data.productImg}" class="card-img-top" alt="${data.productName}">
            <div class="card-body">
                <h5 class="card-title">${data.productName}</h5>
                <p class="card-text">$${data.productPrice}</p>
                <p class="card-text">${data.id}</p>
                <a class="btn btn-dark" type="button">Editar</a>
                <a class="btn btn-secondary" type="button">Eliminar</a>
            </div>
        </div>`

    })
    //RECIBE LA DATA PARA ELIMINAR OBJ
    socket.on('server:obj+array', (obj,array)=>{

        let find = array.find(e => e.id === obj.id);
        const btnDelete = document.querySelector(`#${find.value}`);                   
        btnDelete.addEventListener('click', (e) =>{
            console.log(e);

            // let position = array.indexOf(find);
            // array.splice(position,1);
            // html.innerHTML='';
            // for (const object of array) {
            //     html.innerHTML +=   `
            //     <div class="card" style="width: 18rem;">
            //         <img src="${object.productImg}" class="card-img-top" alt="${object.productName}">
            //             <div class="card-body">
            //                 <h5 class="card-title">${object.productName}</h5>
            //                 <p class="card-text">$${object.productPrice}</p>
            //                 <p class="card-text">${object.id}</p>
            //                 <a class="btn btn-dark" type="button">Editar</a>
            //                 <a class="btn btn-secondary" type="button">Eliminar</a>
            //             </div>
            //     </div>`;
            // }
        })
    })
}
//SI NO ES ADMIN
else{ 
    html.innerHTML= '';
    socket.on('server:notAdmin', (data) =>{
        console.log(data);
        html.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img src="${data.productImg}" class="card-img-top" alt="${data.productName}">
            <div class="card-body">
                <h5 class="card-title">${data.productName}</h5>
                <p class="card-text">$${data.productPrice}</p>
                <a class="btn btn-primary">Comprar</a>
            </div>
        </div>`
    })
       
        
}

