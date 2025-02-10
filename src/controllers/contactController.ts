import { Request, Response } from 'express';
import { ContactService } from '../services/contactService';
import { Router } from 'express';
import { ContactArchivedService } from '../services/contactArchivedService';

export const contactRouter = Router();
const contactservice = new ContactService();
const contactArchivedservice = new ContactArchivedService()
const baseUrl = '/contact'
const baseUrl2 = '/contactArchived'
/**
 * @swagger
 * tags:
 *   - name: contact
 *     description: Operaciones relacionadas con contact
 */
/**
 * @swagger
 * /api/v1/contact :
 *   get:
 *     summary: Obtiene una lista de contact
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Lista de contact
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
 */
contactRouter.get(baseUrl, (req: Request, res: Response) => {
    const contactList = contactservice.fetchAll();
    res.json(contactList);
});

contactRouter.get(baseUrl + '/:id', (req: Request, res: Response) => {
    const contact = contactservice.fetchById(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});

contactRouter.post(baseUrl, (req: Request, res: Response) => {
    const newcontact = contactservice.create(req.body);
    res.status(201).json(newcontact);
});

contactRouter.put(baseUrl + '/:id', (req: Request, res: Response) => {
    const updatedcontact = contactservice.update(parseInt(req.params.id), req.body);
    if (updatedcontact !== null) {
        res.status(204).json(updatedcontact);
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});

contactRouter.delete(baseUrl + '/:id', (req: Request, res: Response) => {
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


contactRouter.get(baseUrl2, (req: Request, res: Response) => {
    const contactList = contactArchivedservice.fetchAll();
    res.json(contactList);
});

contactRouter.get(baseUrl2 + '/:id', (req: Request, res: Response) => {
    const contact = contactArchivedservice.fetchById(parseInt(req.params.id));
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});

contactRouter.post(baseUrl2, (req: Request, res: Response) => {
    const newcontact = contactArchivedservice.create(req.body);
    res.status(201).json(newcontact);
});

contactRouter.put(baseUrl2 + '/:id', (req: Request, res: Response) => {
    const updatedcontact = contactArchivedservice.update(parseInt(req.params.id), req.body);
    if (updatedcontact !== null) {
        res.status(204).json(updatedcontact);
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});

contactRouter.delete(baseUrl2 + '/:id', (req: Request, res: Response) => {
    const deletedcontact = contactArchivedservice.delete(parseInt(req.params.id));
    if (deletedcontact) {
        res.status(204).json({ message: 'contact deleted' });
    } else {
        res.status(404).json({ message: 'contact not found' });
    }
});