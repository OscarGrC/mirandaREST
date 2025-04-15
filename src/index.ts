import express, { Request, Response } from 'express';
import * as dotenv from "dotenv";
import { loginRouter } from './controllers/loginController';
import { bookingRouter } from './controllers/bookingController';
import { roomRouter } from './controllers/roomController';
import { contactRouter } from './controllers/contactController';
import { userRouter } from './controllers/userController';
import { connectMongoDB } from './database/connectMongoDB'
import { connectMySQL } from './database/connectSQL'
import { generateHash } from './utils/token';
import serverless from "serverless-http";
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "ejemplo@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Token JWT generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Usuario no encontrado o credenciales incorrectas
 *       500:
 *         description: Error en el servidor
 */

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
dotenv.config();
const cors = require('cors')
const app = express();
const port = 3002;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de mi API',
            version: '1.0.0',
            description: 'Descripción de mi API',
        },
        servers: [
            {
                url: 'http://localhost:3002',
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};
app.use(cors())
app.use(express.json());
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get('/live', (req: Request, res: Response) => {
    res.send(`${new Date().toISOString()}`);
});

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




connectMongoDB()
/*connectMySQL()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/
// module.exports.handler = serverless(app)
export const handler = serverless(app);

