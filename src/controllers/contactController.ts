import { Request, Response } from 'express';
import { ContactService } from '../services/contactService';
import { Router } from 'express';
import { ContactArchivedService } from '../services/contactArchivedService';
import { ContactValidator } from '../validators/contactValidator';
import { authenticateJWT } from '../middleware/authenticateJWT';

export const contactRouter = Router();
const contactservice = new ContactService();
const contactArchivedservice = new ContactArchivedService()
const baseUrl = '/contact'
const baseUrl2 = '/contactArchived'

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
contactRouter.get(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const contactList = contactservice.fetchAll();
    res.json(contactList);
});

contactRouter.get(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const contact = contactservice.fetchById(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});

contactRouter.post(baseUrl, authenticateJWT, (req: Request, res: Response) => {
    const validation = ContactValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const newcontact = contactservice.create(req.body);
        res.status(201).json(newcontact);
    }
});

contactRouter.put(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const validation = ContactValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const updatedcontact = contactservice.update(parseInt(req.params.id), req.body);
        if (updatedcontact !== null) {
            res.status(204).json(updatedcontact);
        } else {
            res.status(404).json({ message: 'contact not found' });
        }
    }
});

contactRouter.delete(baseUrl + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const contact = contactservice.fetchById(parseInt(req.params.id));
    if (contact != undefined) {
        const addArchived = contactArchivedservice.create(contact);
        if (addArchived != undefined) {
            const deletedcontact = contactservice.delete(parseInt(req.params.id));
            if (deletedcontact) {
                res.status(204).json({ message: 'contact deleted' });
            }
        }
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});


contactRouter.get(baseUrl2, authenticateJWT, (req: Request, res: Response) => {
    const contactList = contactArchivedservice.fetchAll();
    res.json(contactList);
});

contactRouter.get(baseUrl2 + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const contact = contactArchivedservice.fetchById(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});

contactRouter.post(baseUrl2, authenticateJWT, (req: Request, res: Response) => {
    const validation = ContactValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const newcontact = contactArchivedservice.create(req.body);
        res.status(201).json(newcontact);
    }
});

contactRouter.put(baseUrl2 + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const validation = ContactValidator.validate(req.body);
    if (!validation.valid) {
        res.status(400).json({ errors: validation.errors });
    } else {
        const updatedcontact = contactArchivedservice.update(parseInt(req.params.id), req.body);
        if (updatedcontact !== null) {
            res.status(204).json(updatedcontact);
        } else {
            res.status(404).json({ message: 'contact not found' });
        }
    }
});

contactRouter.delete(baseUrl2 + '/:id', authenticateJWT, (req: Request, res: Response) => {
    const deletedcontact = contactArchivedservice.delete(parseInt(req.params.id));
    if (deletedcontact) {
        res.status(204).json({ message: 'contact deleted' });
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});