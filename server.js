console.log('Hola Server, Proyecto!!')

const express = require('express')
const app = express(); //Con esta constante trabajamos: rutas, usos, escucha del servidor
const port = 3002
const mongoose = require('mongoose')

//Importacion de rutas para los End-points / API Rest
const router = require('./Routes/router')

//crear la conexion hacia la BD
const { stringConection } = require('./DB/DBconecttion')
mongoose.connect( stringConection)//aquí va la cadena de conexión
    .then( () => console.log('Conexion a MongoDB exitosa'))
    .catch( (err) => console.log(`Error del servidor: ${err}`))



//Creamos el parserBody de las peticiones HTTP - Creacion de la variable de ruta
app.use( express.urlencoded ({extended: true}))
app.use( express.json ())

//Enviar la constante del router para que la app la ejecute
app.use('/api/v1', router);

//Por medio de la const app activamos la escucha de nuestro server
app.listen(port, () => {
    console.log(`Server Port: ${port}`)
})

// ----------------------Carrito de compras-----------------



