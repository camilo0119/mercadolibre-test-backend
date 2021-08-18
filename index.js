const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

// Crear el servidor
const app = express();

// CORS config
app.use(cors());

// Public directory
app.use(
  express.static('public')
);

// middleWares Response
app.use(express.json());

// Rutas
app.use('/api/categories', require('./routes/category'));
app.use('/api/items', require('./routes/item'));

// Escuchar peticiones en puerto
app.listen(process.env.PORT || 4000, () => {
  console.log(`Servidor inicializado en el puerto: ${process.env.PORT}`);
});