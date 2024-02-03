const express = require('express');
const myConnection = require('./db/connect');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
console.log('Starting server...');
app.use('/', require('./routes'));


myConnection.initDb((err) => {
  if (err) {
    return;
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

