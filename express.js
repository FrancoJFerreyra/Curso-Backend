const port = 8080
const res = require('express/lib/response')

let express = require('express')
let fs = require('fs')
let app = express()
let data = fs.readFileSync('./products.txt', 'utf-8')
let parseData = JSON.parse(data)

fs.readFile('./products.txt', 'utf-8', (err, content) => {
    if(err){
        content.send('No pudo leerse el archivo')
    }
    else{
        console.log('El archivo se leyo con exito');
        }
    }
)

app.get('/productos', function(req, res){
    res.send(JSON.parse(data))
})

app.get('/productoRandom', function(req, res){  
    res.send(parseData[Math.floor(Math.random() * parseData.length)])
})

const connectedServer = app.listen(port, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})