const express = require('express');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const myConnection = require('./db/connect');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
console.log('Starting server...');
app.use('/', require('./routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

myConnection.initDb((err) => {
  if (err) {
    return;
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

