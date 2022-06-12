const { Router } = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require('../schemas/user.schema');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const router = Router();

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);
router.patch(
  '/:id',
  validatorHandler(deleteUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);
router.delete('/:id', validatorHandler(deleteUserSchema, 'params'), deleteUser);

module.exports = router;
