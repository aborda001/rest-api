const { Router } = require('express');
const { signin } = require('../controllers/auth.controller');

const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');

const router = Router();

router.post('/', validatorHandler(createUserSchema, 'body'), signin);

module.exports = router;
