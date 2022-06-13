const { Router } = require('express');
const { signin } = require('../controllers/auth.controller');

const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Endpoints para autenticación
 */

/**
 * @swagger
 * /auth:
 *  post:
 *    summary: Endpoint para autenticar un usuario
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: Autenticación exitosa
 *        content:
 *          application/json:
 *            schema:
 *              example:
 *                message: Signin success
 *                token: YOUR-X-ACCESS-TOKEN
 *
 *
 *      401:
 *        $ref: '#/components/schemas/UnauthorizedError'
 *      500:
 *        $ref: '#/components/schemas/ServerError'
 *
 */
router.post('/', signin);

module.exports = router;
