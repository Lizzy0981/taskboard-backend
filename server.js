require('dotenv').config();
const { app, syncDatabase } = require('./src/app');

const PORT = process.env.PORT || 5000;

// Iniciar servidor
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
});