const express = require('express'); // inyectamos express
const mongoose = require('mongoose'); // inyectamos mongoose
const planetsRoutes = require('./routes/planet'); // inyectamos las router de planets
require('dotenv').config(); // inyectamos las variables de ambiente

mongoose.Promise = global.Promise;
const app = express(); // instanciamos aplicación de express
const port = process.env.PORT || 3000; //configuramos el puerto de escucha

app.set('view engine', 'ejs'); // establecemos el valor para el motor de vistas
app.set('views', './src/views') // establecemos la ruta en donde se renderizarán las vistas
app.use(express.urlencoded({extended:true})); // se cambia a true cuando hay objetos dentro del objeto a enviar
app.use('/assets', express.static(__dirname + '/../public')); // establecemos la carpeta de estilos
app.use(planetsRoutes); //utilizamos el router de planetas

mongoose
  .connect(process.env.MONGODB_URI) // conectamos con la base de datos
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error(error));

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`)); // levantamos el servidor