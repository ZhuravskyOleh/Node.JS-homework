import Contact from "../models/contact.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
    res.json(result)
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404)
    }
    res.json(result);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404);
    }
    res.status(200).json({
        message: "Contact deleted",
    });
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(404)
    };
    res.json(result);
};

const updateStatusContact = async (contactId, body) => {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateFavorite = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            "message": "missing field favorite"
        });
    };
    const { contactId } = req.params;
    const result = await updateStatusContact(contactId, req.body);
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
    updateFavorite: ctrlWrapper(updateFavorite),
};