const username = 'Wendy_RA'
const password = 'Lucecita1957'
const dataBase = 'VentaRopa'
const stringConection = `mongodb+srv://${username}:${password}@cluster0.9kjg5pr.mongodb.net/${dataBase}?retryWrites=true&w=majority`


module.exports = { stringConection } ;
//module.exports =  stringConection  ; //exportacion por defecto


