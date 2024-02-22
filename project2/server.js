const express = require('express');
const mongodb = require('./db/connect');
const app = express();
const port = process.env.port || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

console.log('Starting server...');
app.use('/', require('./routes'));

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        return;
    }

    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    });
});