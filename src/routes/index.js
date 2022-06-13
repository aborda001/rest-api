const express = require('express');

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: El nombre de usuario, debe ser único, debe tener una longitud mínima de 5 caracteres y una longitud máxima de 20 caracteres
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
 *    UnauthorizedError:
 *      description: Error de autorización
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              messsage: 'Invalid credentials'
 *              token: null
 *    ForbiddenError:
 *      description: Error de permisos
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              messsage: 'Permission denied'
 *              token: null
 *    ConflictError:
 *      description: Error de conflicto
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              error: 'Conflict'
 *              message: 'Username already exists'
 *    ValidationError:
 *      description: Error de validación
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              error: 'Validation failed'
 *              message: '"username" length must be at least 5 characters long'
 *
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoints para la autenticación
 *  name: Users
 *  description: Endpoints para la gestión de usuarios
 */

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', require('./users.routes'));
  router.use('/auth', require('./auth.routes'));
}

module.exports = routerApi;
