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
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: El nombre de usuario, debe ser único
 *        password:
 *          type: string
 *          description: La contraseña del usuario, debe contener al menos 8 caracteres
 *      required:
 *        - username
 *        - password
 *      example:
 *        username: username001
 *        password: password001'
 *    ServerError:
 *      description: Error del servidor
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              error: 'Nombre del error'
 *              stack: 'Detalle del error'
 *    NotFoundError:
 *      description: Usuario no encontrado
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              error: 'Not found'
 *              message: 'User not found'
 */

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
 *    summary: Endpoint creado para crear un nuevo usuario
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
 *    summary: Endpoint creado para actualizar un usuario por id
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
 *
 *      404:
 *        $ref: '#/components/schemas/NotFoundError'
 *
 *      500:
 *        $ref: '#/components/schemas/ServerError'
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
 *    summary: Endpoint creado para eliminar un usuario por id
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
