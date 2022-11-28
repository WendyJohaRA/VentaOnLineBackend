const express = require('express')
const router = express.Router()
const {createUser, editUser, deleteUser, getAllUsers} = require ('../Controllers/UserController')
// const {addProductCart} = require ('../Controllers/GetProductsCart')
// const {deleteProduct} = require ('../Controllers/DeleteProduct')
// const { putProduct} = require ('../Controllers/PutProduct')
// const { getProducts} = require ('../Controllers/GetProducts')


//Ruta de prueba
router.get('/', (req, res) => {
    res.send( '<h1>Hello World .... My first Api rest</h1>' )
})

//Operaciones CRUD de Clientes
router.post('/createUser', createUser);
router.get('/getAllCliente', getAllUsers);
router.put('/updateUser/:id', editUser);
router.delete('/deleteUser/:id', deleteUser);

// //Ruta para el login de usuario
// router.post('')

// //Operaciones CRUD de Productos
// /* GET */
// router.get('/products', getProducts);
// router.get("/products-cart",addProductCart);

// /* POST */
// router.post("/products-cart", createProducts);

// /* PUT */
// router.put("/products-cart/:id", putProduct);

// /* DELETE */
// router.delete("/products-cart/:id", deleteProduct);




module.exports = router;