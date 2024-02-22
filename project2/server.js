const express = require('express');
const mongodb = require('./db/connect');
const app = express();
const port = process.env.port || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

console.log('Starting server...');
app.use('/', require('./routes'));

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("DB is started");
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    });
});