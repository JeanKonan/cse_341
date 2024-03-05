const express = require('express');
const mongodb = require('./db/connect');
const dotenv = require('dotenv');
const { auth, requiresAuth} = require('express-openid-connect');
dotenv.config();
const app = express();
const port = process.env.port || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  };

app.use(auth(config));

console.log('Starting server...');
app.use('/', require('./routes'));

app.use(function (err, req, res, next) {
    console.log("into error handler");
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ msg: 'Invalid token' });
    }
 
    next(err, req, res);
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
  
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

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