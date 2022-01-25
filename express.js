const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const {Router} = express;

const app = express();
const products = Router();

let productsList = [
    {
        name:"jamon",
        price: 200,
        mark: "214",
        img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fs1.eestatic.com%2F2021%2F01%2F22%2Fciencia%2Fnutricion%2F553206479_171070440_1024x576.jpg&imgrefurl=https%3A%2F%2Fwww.elespanol.com%2Fciencia%2Fnutricion%2F20210123%2Frazon-jamon-york-esconde-falso-embutido-saludable%2F553195927_0.html&tbnid=DYcZpux5Rw2-VM&vet=12ahUKEwiwwrCo6Mj1AhUSDbkGHX18Dd4QMygAegUIARDeAQ..i&docid=e5-NWh2IajKAfM&w=1024&h=576&itg=1&q=jamon&ved=2ahUKEwiwwrCo6Mj1AhUSDbkGHX18Dd4QMygAegUIARDeAQ",
        id : 1
    }, 
    {
        name:"queso",
        price: 150,
        mark: "214",
        img:"https://www.google.com/imgres?imgurl=https%3A%2F%2F918230.smushcdn.com%2F2283449%2Fwp-content%2Fuploads%2F2020%2F05%2Fqueso.jpg%3Flossy%3D1%26strip%3D1%26webp%3D1&imgrefurl=https%3A%2F%2Fthefoodtech.com%2Fingredientes-y-aditivos-alimentarios%2Fla-textura-ideal-del-queso%2F&tbnid=1UbUpgl_cSB4vM&vet=12ahUKEwiMjN3I6Mj1AhWyNbkGHeKiDXgQMygBegUIARDdAQ..i&docid=DtM9wCCjFOwGXM&w=512&h=268&itg=1&q=queso&ved=2ahUKEwiMjN3I6Mj1AhWyNbkGHeKiDXgQMygBegUIARDdAQ",
        id: 2
    },
    {
        name:"mayonesa",
        price: 60,
        mark: "bc",
        img: "https://www.google.com/imgres?imgurl=https%3A%2F%2Farcorencasa.com%2Fwp-content%2Fuploads%2F2020%2F07%2F20200722-1006741.png&imgrefurl=https%3A%2F%2Farcorencasa.com%2Fproducto%2Fmayonesa-bc%2F&tbnid=gN700E4GvlCFWM&vet=12ahUKEwjI5Ybe6Mj1AhWoNrkGHSXLC3sQMygAegUIARC5AQ..i&docid=yV9CIMsMUgITcM&w=600&h=600&q=mayonesa%20bc&ved=2ahUKEwjI5Ybe6Mj1AhWoNrkGHSXLC3sQMygAegUIARC5AQ",
        id: 3
    }, 
    {
        name:"pan",
        price: 100,
        mark: "CoderPan",
        img: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.hacerpan.net%2FImagenesHacerPan%2FImagenesHacerPan%2Fpan_trigo.jpg&imgrefurl=http%3A%2F%2Fwww.hacerpan.net%2FHacerPan%2FPanDeTrigo%2FPanDeTrigo.html&tbnid=FzZIdTDoFkl44M&vet=12ahUKEwjNg6nm6Mj1AhVPJrkGHVhyAm0QMygCegUIARD5AQ..i&docid=DSf4hx6jZ16NXM&w=250&h=200&q=pan&ved=2ahUKEwjNg6nm6Mj1AhVPJrkGHVhyAm0QMygCegUIARD5AQ",
        id: 4
    }
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//OBTENER TODOS LOS PRODUCTOS
products.get('/',(req,res) => {
    res.send(productsList);
});

//PRODUCTO SEGUN ID

products.get('/:id',(req,res) => {
    let productID = parseInt(req.params.id);
    if(productsList.find(e => e.id == productID)){
        return res.send(productsList.find(e => e.id == productID));   
    }
    else{
        return res.status(404).send("El producto no existe.")
    }

});


function middlewarePrefix(req, res, next) {
    
    const name = req.body.name
    if(name === '') res.end('Name required')
    
    next()
};
//Agregar producto con id corrrespondiente.

products.post('/', middlewarePrefix,(req,res) => {
    const name = req.body.name
    for (const product of productsList) {
        if(product.name != name){
            productsList.push({name,
            "id": productsList.length + 1});
            return res.send(productsList)
        } 
        else{
            return res.send("No se agrego el producto")
        }
    }
});

app.put('/put/:id', (req,res) => {

    res.send(`El producto con id: ${req.params.id} se actualizo. ${productsList[req.params.id - 1].name} $${productsList[req.params.id - 1].price}`);

})

app.delete('/delete/:id', (req,res) => {

    console.log(`El producto con id = ${req.params.id} fue eliminado.`);
    if(productsList.length < 1){
        return res.send(productsList = []);
    }
    else{
        let find = productsList.find(e => e.id == req.params.id);
        let position = productsList.indexOf(find);
        productsList.splice(position, 1)
            return res.send(productsList);
    }
    
})

app.use('/products',products);
app.use(('/static'), express.static('public'));

app.listen(8080);
console.log("Se inicio el server");