const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const fs = require('fs');
const yaml = require('js-yaml');

// Cargar configuración desde el archivo YAML
const configFile = fs.readFileSync('database-config.yml', 'utf8');
const config = yaml.load(configFile);

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de conexión a la base de datos
const connection = new sql.ConnectionPool(config);
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');

    // Puedes realizar operaciones adicionales aquí si es necesario

    // Cierra la conexión cuando la aplicación se cierra
    process.on('SIGINT', () => {
      connection.close();
      console.log('Conexión cerrada. Aplicación terminada.');
      process.exit();
    });
  }
});

// Rutas relacionadas con la base de datos
app.use('/', users(config, connection));
app.use('/', combos(config, connection));
app.use('/', inventory(config, connection));
app.use('/', departments(config, connection));
app.use('/', reports(config, connection));
app.use('/', vales(config, connection));

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

