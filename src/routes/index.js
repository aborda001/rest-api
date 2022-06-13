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
 *        password: password001
 *    Tasks:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: El nombre de la tarea, debe tener una longitud mínima de 2 caracteres y una longitud máxima de 30 caracteres
 *        description:
 *          type: string
 *          description: La descripción de la tarea, debe tener una longitud mínima de 5 caracteres y una longitud máxima de 100 caracteres
 *      required:
 *        - name
 *        - description
 *      example:
 *        name: Work something
 *        description: Working on something in the office
 *        done: false
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
 *    BadRequestError:
 *      description: Error de solicitud
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              error: 'Bad request'
 *              message: '"username" length must be at least 5 characters long'
 *
 *    BadRequestTaskError:
 *      description: Error de solicitud
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              error: 'Bad request'
 *              message: '"name" length must be at least 2 characters long'
 *
 */

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', require('./users.routes'));
  router.use('/auth', require('./auth.routes'));
  router.use('/tasks', require('./tasks.routes'));
}

module.exports = routerApi;
