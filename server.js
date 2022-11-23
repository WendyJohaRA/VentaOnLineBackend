console.log('Hola Server, Proyecto!!')

const express = require('express')
const app = express(); //Con esta constante trabajamos: rutas, usos, escucha del servidor
const port = 3002
const mongoose = require('mongoose')

//crear la conexion hacia la BD
const { stringConection } = require('./DB/DBconecttion')
mongoose.connect( stringConection)//aquí va la cadena de conexión
    .then( () => console.log('Conexion a MongoDB exitosa'))
    .catch( (err) => console.log(`Error del servidor: ${err}`))

//Importar el modelo del usuario
const Cliente = require ('./models/UserModel')

//Creamos el parserBody de las peticiones HTTP - Creacion de la variable de ruta
app.use( express.urlencoded ({extended: true}))
app.use( express.json ())

//Creación del objeto de rutas para los End-points / API Rest
const router = express.Router();

//Ruta de prueba
router.get('/', (req, res) => {
    res.send( '<h1>Hello World .... My first Api rest</h1>' )
})



//Operaciones CRUD.....ToDo
//Crear Usuario - Create EndPoint -  C
router.post('/createUser', ( req, res) => {
    const { body } = req
    const newUser = new Cliente ({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Email: body.Email.toLowerCase(),
        UsuarioRol: body.UsuarioRol,
        Password: body.Password,
        PerfilDate: body.PerfilDate
   })

//Opcion 1 Guardando un usuario con el parametro async y await, no olvidar colocar async en la funcion
// const result = await newUser.save();
// console.log ( result )

//Opcion 2 Guardando un usuario con el parametro tipo promise
//   newUser.save()
//   .then(( result ) => res.send({ message: 'Usuario guardado con exito', resp: result }))
//   .catch(( err )  => res.send( { message: err }) )

//Opcion 3 Guardando un usario con el formato undefined
    //newUser.save();  - pero genera errores a futuro


    Cliente.findOne({ Email: newUser.Email}, (err, userFinded) => {
        if(userFinded){
            res.send({ messege: 'Usuario ya existe'})
        }else{
            //Opcion 4  Guardando un usuario con el parametro tipo callback
            newUser.save( ( err, userStored ) => {//Parametros opcionales para controlar la duplicidad de usuario
                if( userStored ){
                    res.send( {
                        message: 'Usuario creado con exito',
                    } )
                }
                if( err ) {
                    res.send( { messege: 'Error del servidor'})
            }
            })
        }
        if(err){
            res.send({ message: 'Usuario ya existe'})
        }
    })

})

//    console.log(req.body)
//    res.send ( req.body.Name ) - Ruta para navegar en las propiedades de la tabla 
//    res.send ( req.body )  

//Leer Usuario EndPoint - R
router.get('/getAllCliente', (req, res) => {
    Cliente.find({}, function (err, userDocs) {
        if(err){
            res.status(500).send( { message: 'Error del servidor', err} )
        }else if(userDocs){
            res.status(404).send({ message: 'Colección vacia'})
        }else{
            res.status(200).send({ users: userDocs })
        }
    });
})

//Editar Usuario EndPoint - U
router.put('/updateUser/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const { body } = req;
    const userToUpdate = {
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Email: body.Email.toLowerCase(),
        UsuarioRol: body.UsuarioRol,
        Password: body.Password,
        PerfilDate: body.PerfilDate,
    }
  
    Cliente.findOne({ Email: userToUpdate. Email}, (err, Emailfinded) => {
        if(err){
            res.send({ message: 'Error del servidor: ' + err})
        }else if(Emailfinded){
            if(Emailfinded.id !== idToUpdate){
                res.send({ message: 'Email ya se encuentra en uso', user: Emailfinded })
        }else{
            Cliente.findByIdAndUpdate(idToUpdate, userToUpdate, function (err, userUpdated) {
                if (userUpdated) {
                    res.send({ message: "Usuario actualizado satisfactoriamente 01" });
                } else if (!userUpdated) {
                    res.send({ message: "Usuario no existe" });
                } else {
                    res.status(500).send({ message: `Error del servidor: ${err}` });
                }
            });
        }
            }else{
                Cliente.findByIdAndUpdate(idToUpdate, userToUpdate, function (err, userUpdated) {
                    if (userUpdated) {
                        res.send({ message: "Usuario actualizado satisfactoriamente 02" });
                    } else if (!userUpdated) {
                        res.send({ message: "Usuario no existe" });
                    } else {
                        res.status(500).send({ message: `Error del servidor: ${err}` });
                    }
                });
            }
        });
        
    });


//Eliminar Usuario - D
router.delete('/deleteUser/:id', ( req, res) => {
    const idToDelete = req.params.id;
    Cliente.findByIdAndRemove({ _id: idToDelete }, (err, userDeleted) => {
        if (err) {
          res.send({ message: "Error del servidor: " + err });
        } else if (userDeleted) {
          res.send({ message: "Usuario elimando con exito" });
        } else {
          res.send({ message: "Usuario no encontrado " });
        }
      })
    })


//Enviar la constante del router para que la app la ejecute
app.use('/api/v1', router);

//Por medio de la const app activamos la escucha de nuestro server
app.listen(port, () => {
    console.log(`Server Port: ${port}`)
})



