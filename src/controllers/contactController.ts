import { ContactService } from '../services/contactService';
import { Router } from 'express';
import { ContactArchivedService } from '../services/contactArchivedService';
import { ContactValidator } from '../validators/contactValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { GetFun } from '../common/genericFuntions/getfun';
import { GetIdFun } from '../common/genericFuntions/getIdfun';
import { PutFun } from '../common/genericFuntions/putfun';
import { PostFun } from '../common/genericFuntions/postfun';
import { DeleteFun } from '../common/genericFuntions/deletefun';

/**
 * @swagger
 * tags:
 *   - name: Contact
 *     description: Operaciones relacionadas con los contactos
 *   - name: ContactArchived
 *     description: Operaciones relacionadas con los contactos archivados
 */

/**
 * @swagger
 * /api/v1/contact:
 *   get:
 *     summary: Obtiene una lista de contactos
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Lista de contactos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2024-02-10"
 *                   customer:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12345
 *                       name:
 *                         type: string
 *                         example: "Juan"
 *                       last_name:
 *                         type: string
 *                         example: "Pérez"
 *                   asunto:
 *                     type: string
 *                     example: "Consulta sobre reserva"
 *                   comment:
 *                     type: string
 *                     example: "Quisiera cambiar mi fecha de check-in"
 *   post:
 *     summary: Crea un nuevo contacto
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contacto creado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 */

/**
 * @swagger
 * /api/v1/contact/{id}:
 *   get:
 *     summary: Obtiene un contacto por ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Datos del contacto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto no encontrado
 *   put:
 *     summary: Actualiza un contacto por ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       204:
 *         description: Contacto actualizado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Contacto no encontrado
 *   delete:
 *     summary: Elimina un contacto por ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto a eliminar
 *     responses:
 *       204:
 *         description: Contacto eliminado correctamente
 *       404:
 *         description: Contacto no encontrado
 */

/**
 * @swagger
 * /api/v1/contactArchived:
 *   get:
 *     summary: Obtiene una lista de contactos archivados
 *     tags: [ContactArchived]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contactos archivados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *   post:
 *     summary: Crea un nuevo contacto archivado
 *     tags: [ContactArchived]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contacto archivado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 */

/**
 * @swagger
 * /api/v1/contactArchived/{id}:
 *   get:
 *     summary: Obtiene un contacto archivado por ID
 *     tags: [ContactArchived]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto archivado
 *     responses:
 *       200:
 *         description: Datos del contacto archivado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contacto archivado no encontrado
 *   put:
 *     summary: Actualiza un contacto archivado por ID
 *     tags: [ContactArchived]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto archivado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       204:
 *         description: Contacto archivado actualizado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Contacto archivado no encontrado
 *   delete:
 *     summary: Elimina un contacto archivado por ID
 *     tags: [ContactArchived]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto archivado a eliminar
 *     responses:
 *       204:
 *         description: Contacto archivado eliminado correctamente
 *       404:
 *         description: Contacto archivado no encontrado
 */
export const contactRouter = Router();
const contactservice = new ContactService();
const contactArchivedservice = new ContactArchivedService()
const baseUrl = '/contact'
const baseUrl2 = '/contactArchived'

contactRouter.get(baseUrl, authenticateJWT, GetFun(contactservice));
contactRouter.get(baseUrl + '/:id', authenticateJWT, GetIdFun(contactservice, "Contact"));
contactRouter.post(baseUrl, authenticateJWT, PostFun(contactservice, ContactValidator))
contactRouter.put(baseUrl + '/:id', authenticateJWT, PutFun(contactservice, ContactValidator, "Contact"))
contactRouter.delete(baseUrl + '/:id', authenticateJWT, DeleteFun(contactservice, "Contact"))

contactRouter.get(baseUrl2, GetFun(contactArchivedservice));
contactRouter.get(baseUrl2 + '/:id', authenticateJWT, GetIdFun(contactArchivedservice, "Contact"));
contactRouter.post(baseUrl2, authenticateJWT, PostFun(contactArchivedservice, ContactValidator))
contactRouter.put(baseUrl2 + '/:id', authenticateJWT, PutFun(contactArchivedservice, ContactValidator, "Contact"))
contactRouter.delete(baseUrl2 + '/:id', authenticateJWT, DeleteFun(contactArchivedservice, "Contact"))

