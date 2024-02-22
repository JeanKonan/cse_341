const { body } = require('express-validator');

const validationRules = () => {
    return [
        body('name')
            .isString()
            .isLength({min: 3, max: 20})
            .withMessage('Name must contain between 3 and 20 letters.'),

        body('age')
            .isString()
            .isLength({min: 1, max: 3})
            .withMessage('Age must be between 8 and 100.'),

        body('email')
            .isEmail(),
    ]
}

const idRules = () => {
    return[
        body('id')
        .isString()
        .isLength({min: 20, max: 25})
        .withMessage('ID has to be an ObjectID')]
}

module.exports = {
    validationRules,
    idRules
}