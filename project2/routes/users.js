const { getAll, getSingle, createUser, updateUser, deleteUser } = require('../controllers/users');
const { idRules, validationRules } = require('../middleware/user_validator');
const { auth, requiresAuth} = require('express-openid-connect');
const express = require('express');
const router = express.Router();

router.get('/', requiresAuth(), getAll);

router.get('/:id', requiresAuth(), idRules(), getSingle);

router.post('/', validationRules(), createUser);

router.put('/:id', idRules(), validationRules(), updateUser);

router.delete('/:id', idRules(), deleteUser);

module.exports = router;