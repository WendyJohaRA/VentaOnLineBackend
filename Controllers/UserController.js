const Cliente = require('../models/UserModel')
const bcrypt = require('bcrypt')
const saltRounds = 10 ;
const salt = 'EncriptacionGrupo4';


//Crear Usuario - Create EndPoint -  C
const createUser = ( req, res) => {
    const { body } = req
    const newUser = new Cliente ({
        Nombre: body.Nombre,
        Apellido: body.Apellido,
        Email: body.Email.toLowerCase(),
        UsuarioRol: body.UsuarioRol,
        Password: body.Password,
        PerfilDate: body.PerfilDate
   })

    Cliente.findOne({ Email: newUser.Email}, (err, userFinded) => {
        if(userFinded){
            res.send({ messege: 'Usuario ya existe'})
        }else if (!userFinded){
           //Antes de guardar el usuario debemos encryptar el password
            const passToEncrypt = newUser.Password + salt;
            bcrypt.hash(passToEncrypt, saltRounds, (err, hash) => {
                if(err){
                    res.send({ message: 'Error del servidor' + err})
                }else if(!hash){
                    res.send({ message: 'Error al intentar encryptar el password'})
                }else{
                    newUser.Password = hash;
                    newUser.save( ( err, userStored ) => {
                        if( userStored ){
                            res.send( {message: 'Usuario creado con exito', status: 200} )
                        }if( err ) {
                            res.send( { messege: 'Error del servidor'})
                        }
                    })
                }
            })

        }else{
            res.send({ message: 'Error del servidor' + err})
        }
    })

};

//Leer Usuario EndPoint - R
const getAllUsers = (req, res) => {
    Cliente.find({}, function (err, userDocs) {
        if(err){
            res.status(500).send( { message: 'Error del servidor', err} )
        }else if(!userDocs){
            res.status(404).send({ message: 'Colección vacia'})
        }else{
            res.status(200).send({ users: userDocs })
        }
    });
};

//Editar Usuario EndPoint - U
const editUser = (req, res) => {
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
            userIsUpdate(idToUpdate, userToUpdate, res)
        }
            }else{
                userIsUpdate(idToUpdate, userToUpdate, res)
    
            }
        });
        
    };

//Eliminar Usuario - D
const deleteUser = ( req, res) => {
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
    }

//Funcion para mejorar el proceso de actualizacion de usuario
function userIsUpdate (id, Update, res){
    Cliente.findByIdAndUpdate(id, Update, function (err, userUpdated) {
        if (userUpdated) {
            res.send({ message: 'Usuario actualizado satisfactoriamente ' });
        } else if (!userUpdated) {
            res.send({ message: "Usuario no existe" });
        } else {
            res.status(500).send({ message: `Error del servidor: ${err}` });
        }
    });
}

    const userLogin = (req, res) => {
        res.send('User On')
    };

module.exports = {
    createUser ,
    editUser,
    deleteUser,
    getAllUsers
}