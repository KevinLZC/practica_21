const express = require('express'); // inyectamos express
const router = express.Router(); // inyectamos router
const mongoose = require('mongoose'); // inyectamos mongoose
let Planet = require('../models/planet'); // importamos el modelo de planets

router.get('/planets', async (req, res) => { //ruta con tabla estilizada
  const Planets = await Planet.find({});
  res.render('planetList', {Planets});
});

router.get('/addPlanet', (req, res) => { // ruta para recuperar el formulario para agregar planetas
  res.render('addPlanets');
});

router.post('/addPlanet', (req, res) => { // ruta para mandar la información a la base de datos
  let rings = false;
  if(req.body.rings === 'on') {
    rings = true;
  }
  const newPlanet = Planet({
    name: req.body.name,
    orderFromSun: req.body.order,
    hasRings: rings,
    mainAtmosphere: req.body.atmosphere.split(','),
    surfaceTemperatureC: {
      min: req.body.min,
      mean: req.body.mean,
      max: req.body.max
    }
  });
  console.log(newPlanet)
  newPlanet
    .save() // se guarda el documento (función asincrona)
    .then((data) => {res.redirect('/planets')}) // nos redirecciona a la tabla con todos los planetas
    .catch((error) => {res.json({message:error})}); // nos regresa un error
});

module.exports = router; // exportamos el router de planets