//Para crear un modelo, necesitas una const tipo mongoose
const mongoose = require('mongoose');
const { stringConection } = require('../DB/DBconecttion')
const { Schema } = mongoose

//Definicion del modelo
let UserSchema = new Schema({
    Nombre: String,
    Apellido: String,
    Email: String,
    UsuarioRol: { type: Number, default: 2 },
    Password: String,
    PerfilDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Cliente', UserSchema, 'Clientes')
