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

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Endpoint para crear un nuevo usuario
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: User created successfully
 *                - user:
 *                    username: username001
 *
 *      400:
 *        $ref: '#/components/schemas/ValidationError'
 *
 *      409:
 *        $ref: '#/components/schemas/ConflictError'
 *
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 *
 */
router.post(
  '/',
  checkDuplicated,
  validatorHandler(createUserSchema, 'body'),
  createUser
);

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    summary: Endpoint para actualizar un usuario por id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ObjectId del usuario a editar
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: User updated successfully
 *                - user:
 *                    id: 62a594e5ce53d40c0432b5ad
 *                    username: username001
 *      400:
 *        $ref: '#/components/schemas/ValidationError'
 *
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *
 *      403:
 *        $ref: '#/components/schemas/ForbiddenError'
 *
 *      404:
 *        $ref: '#/components/schemas/NotFoundError'
 *
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 *
 */
router.patch(
  '/:id',
  verifyToken,
  validatorHandler(deleteUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Endpoint para eliminar un usuario por id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ObjectId del usuario a eliminar
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    responses:
 *      200:
 *        description: User deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: User deleted successfully
 *                - user:
 *                    id: 62a594e5ce53d40c0432b5ad
 *
 *      400:
 *        $ref: '#/components/schemas/ValidationError'
 *
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *
 *      403:
 *        $ref: '#/components/schemas/ForbiddenError'
 *
 *      404:
 *        $ref: '#/components/schemas/NotFoundError'
 *
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 */
router.delete(
  '/:id',
  verifyToken,
  validatorHandler(deleteUserSchema, 'params'),
  deleteUser
);

module.exports = router;
