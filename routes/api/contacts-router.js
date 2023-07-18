import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../Schemas/contacts-schema.js";
import { isEmptyBody } from "../../middlewars/index.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.addContact);

contactsRouter.delete('/:contactId', contactsController.deleteById);

contactsRouter.put('/:contactId', isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.updateById);

export default contactsRouter;
