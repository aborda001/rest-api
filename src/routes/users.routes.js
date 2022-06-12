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
const { verifyToken } = require('../middlewares/auth.handler');
const { checkDuplicated } = require('../middlewares/signup.handler');

const router = Router();

router.post(
  '/',
  checkDuplicated,
  validatorHandler(createUserSchema, 'body'),
  createUser
);
router.patch(
  '/:id',
  verifyToken,
  validatorHandler(deleteUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);
router.delete(
  '/:id',
  verifyToken,
  validatorHandler(deleteUserSchema, 'params'),
  deleteUser
);

module.exports = router;
