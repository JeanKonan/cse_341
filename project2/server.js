const express = require('express');
const myConnection = require('./routes/connect')
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

console.log('Starting server...');
app.use('/routes', require('./routes'));