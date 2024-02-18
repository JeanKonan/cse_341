const express = require('express');
const mongodb = require('./db/connect');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

console.log('Starting server...');
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        return;
    }

    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    });
});