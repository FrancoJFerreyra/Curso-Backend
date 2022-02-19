const socket = io();

const html = document.querySelector('#htmlContainer');
const productForm = document.querySelector('#productsForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productImg = document.querySelector('#productImg');
const cardContainer = document.querySelector('#cards-container');
const chatForm = document.querySelector('#chatForm');
const divMsj = document.querySelector('#chatMsj');

const admin = true;

//OBTIENE UN ID AL CLICKEAR UPDATE Y A TRAVES DE ESTE UTILIZO IF
let savedID = ''

//CREA LA CARD Y CAPTURA LOS EVENTOS
const cardUI = obj =>{
    const div = document.createElement('div')
    div.innerHTML+=`
        <div class="card" style="width: 18rem;">
            <img src="${obj.productImg}" class="card-img-top" alt="${obj.productName}">
            <div class="card-body">
                <h5 class="card-title">${obj.productName}</h5>
                <p class="card-text">$${obj.productPrice}</p>
                <p class="card-text">${obj.id}</p>
                <a class="btn btn-dark update" type="button" data-id="${obj.id}">Editar</a>
                <a class="btn btn-danger delete" type="button" data-id="${obj.id}">Eliminar</a>
            </div>
        </div>`;
    const btnUpdate = div.querySelector('.update');
    const btnDelete = div.querySelector('.delete');

    btnDelete.addEventListener('click', ()=>{
        deleteProd(btnDelete.dataset.id);
    })
    btnUpdate.addEventListener('click', ()=>{
        getUpdateID(btnUpdate.dataset.id);
    })
    return div
}
//RENDERIZA ARRAY DE CARDS
const renderCards = (products) => {
    cardContainer.innerHTML='';
    products.forEach(note => {
        cardContainer.append(cardUI(note))
    })
}
//RENDERIZA EL OBJETO
const appendCard = (product) => {
    cardContainer.append(cardUI(product))
}
// CAPTURA EL ID DEL BTNDELETE
const deleteProd = (id) =>{
    socket.emit('client:deleteProd', id)
}
//CAPTURA EL ID DEL BTNUPDATE
const getUpdateID = (id) =>{
    socket.emit('client:updateId',id)
}
//CON LOS VALUES NUEVOS ENVIA COMO OBJ AL SERVER
const updateProd = (id,title,price,img) =>{
    socket.emit('client:updateProd', {
        id,
        title,
        price,
        img
    })
}

//VERIFICA SI ADMIN=TRUE O FALSE
if (admin == true) {
    //CAPTURA EVENTO PARA CREAR OBJ
    productForm.addEventListener('submit', e =>{
        console.log(e);
        e.preventDefault();
        //SI SAVEDID TIENE CONTENIDO DENTRO CREAR OBJETO CON LAS VALUES ACTUALIZADAS
        if (savedID){
            updateProd(savedID,productName.value, productPrice.value, productImg.value )
        }
        else{
        //SI SAVEDID = '' ENVIAR UN OBJETO CON LA INFO DE LOS INPUT
        socket.emit('client:newProduct',{
            productName : productName.value,
            productPrice : productPrice.value,
            productImg : productImg.value
        })
        }
        productName.value = '';
        productPrice.value = '';
        productImg.value = '';
        productName.focus()
    })
    //CREA CARD PARA ADMIN
    socket.on('server:newProduct', appendCard)
    //RECIBE LA DATA PARA ELIMINAR OBJ
    socket.on('server:products', renderCards)
    //RECIBE OBJETO PARA ACTUALIZAR SU VALOR EN EL INPUT
    socket.on('server:selectedProd', data =>{
        productName.value = data.productName;
        productPrice.value = data.productPrice;
        productImg.value = data.productImg;
        savedID = data.id
        console.log(savedID);
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

