//importar el modulo para crear aplicaciones web
import express from "express";
import index from "./routers/index.js";
import db from "./BBDD/db.js";
import moment from 'moment';
moment.locale('es');


//Esta la instancia de las aplicaciones exress
const app = express();


//Definimos el puerto por defecto
const port = process.env.PORT || 13004;

//Midleware es app
//Habilitar PUG
app.set("view engine", "pug");

//Definir la carpeta pública
app.use(express.static('public'));

//añadimos moment para todos los archivos pug
app.locals.moment = moment;

// Añadido para leer los datos del formulario POST (req.body)
app.use(express.urlencoded({extended: true}));

//Agregar index
app.use("/", index);

//Para escuchar del puerto y ver que funciona
app.listen(port, () => {
    console.log(`Servidor conectado en el puerto ${port}`);
});