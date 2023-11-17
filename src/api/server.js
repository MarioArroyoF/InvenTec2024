const express = require('express');
const cors = require('cors');
const users = require('./routes/users.js'); 
const combos = require('./routes/combos.js'); 
const inventory = require('./routes/inventory.js'); 
const departments = require('./routes/departments.js'); 

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', users);
app.use('/', combos);
app.use('/', inventory);
app.use('/', departments);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
