const { getAll, getSingle, createUser } = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.get('/', getAll());

router.get('/:id', getSingle());

router.post('/', createUser());

module.exports = router;