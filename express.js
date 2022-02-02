const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');


const path = require('path');
const {Router} = express;
const PORT = 8080;
const app = express();
const router = Router();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products = []

//HBS
const expHbs = require('express-handlebars');
app.engine(
    'hbs',
    expHbs.engine({
    extName: '.hbs',  
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials/',
    defaultLayout: 'main.hbs' 
}));
app.set('view engine', '.hbs');
app.set('views', 'views')


router.get('/',(req,res) => {
    res.render('index', {
        products
    });
});

router.post('/', (req,res) =>{
    products.push(req.body);
    console.log(products);
    res.redirect('/products')
})
/

//PUG
// app.set('views', 'viewsP');
// app.set('view engine', 'pug');

// router.get('/',(req,res) => {
//     res.render('historial', {
//         products
//     });
// });
// router.post('/', (req,res) =>{
//     products.push(req.body);
//     console.log(products);
//     res.redirect('/products')
// })

//EJS
// app.set('views', 'viewsEjs');
// app.set('view engine', 'ejs');

// router.get('/',(req,res) => {
//     res.render('index', {
//         products
//     });
// });
// router.post('/', (req,res) =>{
//     products.push(req.body);
//     console.log(products);
//     res.redirect('/products')
// })

app.use('/products',router);

app.listen(PORT, () =>{
    console.log(`Se inicio el server en el puerto: ${PORT}`);
});


// function middlewarePrefix(req, res, next) {
    
//     const name = req.body.name
//     if(name === '') res.end('Name required')
    
//     next()
// };
// //Agregar producto con id corrrespondiente.

// products.post('/', middlewarePrefix,(req,res) => {
//     const name = req.body.name
//     for (const product of productsList) {
//         if(product.name != name){
//             productsList.push({name,
//             "id": productsList.length + 1});
//             return res.send(productsList)
//         } 
//         else{
//             return res.send("No se agrego el producto")
//         }
//     }
// });
