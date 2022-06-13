const { Router } = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
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
 * tags:
 *  name: Users
 *  description: Endpoints para la gestión de usuarios
 */

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
 *        description: Usuario creado satisfactoriamente
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: User created successfully
 *                - user:
 *                    id: 5e9f8f8f8f8f8f8f8f8f8f8
 *                    username: username001
 *
 *      400:
 *        $ref: '#/components/schemas/BadRequestError'
 *      409:
 *        $ref: '#/components/schemas/ConflictError'
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
 * /users:
 *  patch:
 *    summary: Endpoint para actualizar un usuario
 *    tags: [Users]
 *    parameters:
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
 *        description: Usuario actualizado satisfactoriamente
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: User updated successfully
 *                - user:
 *                    id: 62a594e5ce53d40c0432b5ad
 *                    username: username001
 *      400:
 *        $ref: '#/components/schemas/BadRequestError'
 *
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *
 *      404:
 *        $ref: '#/components/schemas/NotFoundError'
 *
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 *
 */
router.patch(
  '/',
  verifyToken,
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

/**
 * @swagger
 * /users:
 *  delete:
 *    summary: Endpoint para eliminar un usuario
 *    tags: [Users]
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    responses:
 *      200:
 *        description: Usuario eliminado satisfactoriamente
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
 *      404:
 *        $ref: '#/components/schemas/NotFoundError'
 *
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 */
router.delete('/', verifyToken, deleteUser);

module.exports = router;
