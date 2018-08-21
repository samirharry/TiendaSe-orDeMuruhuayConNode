process.env.PORT = process.env.PORT||3000;
//================
//Entorno
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev' ;

//================
//Base de datos
//================
let urlDB ;

if(process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/tienda';
} else{
    urlDB = 'mongodb://samirharry:20164014I@ds125892.mlab.com:25892/tiendasenior';
}

process.env.URLDB = urlDB;