import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../Schemas/contacts-schema.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', validateBody(contactsSchemas.contactAddSchema), contactsController.addContact);

contactsRouter.delete('/:contactId', contactsController.deleteById);

contactsRouter.put('/:contactId', validateBody(contactsSchemas.contactAddSchema), contactsController.updateById);

export default contactsRouter;
