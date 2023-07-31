import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../Schemas/contacts-schema.js";
import { isEmptyBody, isValidId, authenticate } from "../../middlewars/index.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsSchemas.contactAddSchema), contactsController.addContact);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put('/:contactId', isEmptyBody, isValidId, validateBody(contactsSchemas.contactAddSchema), contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', isEmptyBody, isValidId, validateBody(contactsSchemas.contactUpdateFavoriteSchema), contactsController.updateFavorite);

export default contactsRouter;
