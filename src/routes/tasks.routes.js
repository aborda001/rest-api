const { Router } = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} = require('../schemas/task.schema');
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
} = require('../controllers/tasks.controller');
const { verifyToken } = require('../middlewares/auth.handler');

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Endpoints para la gestión de tareas
 */

/**
 * @swagger
 * /tasks:
 *  get:
 *    summary: Endpoint para obtener todas las tareas de un usuario
 *    tags: [Tasks]
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: false
 *        description: Número de tareas a mostrar por página, si no se especifica se mostrarán todas
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: false
 *        description: Número de página, por defecto es la primera
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    responses:
 *      200:
 *        description: Tareas obtenidas
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                rows: 2
 *                message: Tasks fetched successfully
 *                tasks:
 *                  - _id: 5e9f8f8f8f8f8f8f8f8f8f8
 *                    name: Work task
 *                    description: Task to do work
 *                    done: false
 *                  - _id: 6e9f8f8f8f8f8f8f8f8f8f8
 *                    name: Work task 2
 *                    description: Task to do work
 *                    done: true
 *
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 */
router.get('/', verifyToken, getTasks);

/**
 * @swagger
 * /tasks:
 *  post:
 *    summary: Endpoint para crear una nueva tarea para un usuario
 *    tags: [Tasks]
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tasks'
 *    responses:
 *      201:
 *        description: Tarea creada satisfactoriamente
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: Task created successfully
 *                - task:
 *                    name: Work something
 *                    description: Working on something in the office
 *                    done: false
 *
 *
 *      400:
 *        $ref: '#/components/schemas/BadRequestTaskError'
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 */
router.post(
  '/',
  verifyToken,
  validatorHandler(createTaskSchema, 'body'),
  createTask
);

/**
 * @swagger
 * /tasks:
 *  patch:
 *    summary: Endpoint para actualizar una tarea de un usuario por su id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id de la tarea a actualizar
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tasks'
 *    responses:
 *      200:
 *        description: Tarea actualizada satisfactoriamente
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: Task updated successfully
 *                - task:
 *                    name: Work something
 *                    description: Working on something in the office
 *                    done: false
 *
 *
 *      400:
 *        $ref: '#/components/schemas/BadRequestTaskError'
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *      404:
 *        $ref: '#/components/schemas/NotFoundTaskError'
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 */
router.patch(
  '/:id',
  verifyToken,
  validatorHandler(deleteTaskSchema, 'params'),
  validatorHandler(updateTaskSchema, 'body'),
  updateTask
);

/**
 * @swagger
 * /tasks:
 *  delete:
 *    summary: Endpoint para eliminar una tarea de un usuario por su id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id de la tarea a eliminar
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación
 *    responses:
 *      200:
 *        description: Tarea eliminada satisfactoriamente
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                - message: Task deleted successfully
 *                - task:
 *                    name: Work something
 *                    description: Working on something in the office
 *                    done: false
 *
 *
 *      400:
 *        $ref: '#/components/schemas/BadRequestTaskError'
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *      404:
 *        $ref: '#/components/schemas/NotFoundTaskError'
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 */
router.delete(
  '/:id',
  verifyToken,
  validatorHandler(deleteTaskSchema, 'params'),
  deleteTask
);

module.exports = router;
