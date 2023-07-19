import contactsService from "../models/contacts.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getAll = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result)
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
        throw HttpError(404)
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.status(200).json({
        message: "Contact deleted",
    });
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
        throw HttpError(404)
    };
    res.json(result);
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
}