const express = require('express');
const app = express();

const routes = require("express").Router();

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello! Welcome, I am Jean Konan');
  });

const port = 8080;
app.listen(port, () => {
    console.log(`Server started on port on http://localhost:${port}`);
});

module.exports = routes;