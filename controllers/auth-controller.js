import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from 'jimp';


const avatarPath = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    };
    const avatarURL = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({
        email: newUser.email,
    })
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    };

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });
    
    res.json({
        token,
    })
};

const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({
        message: 'No Content',
    });
};

const updateAvatar = async (req, res) => {
    const { user } = req;
    const { path: oldPath, filename } = req.file;
    
    const image = await Jimp.read(oldPath);
    await image.resize(250, 250).writeAsync(oldPath);
     
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);

    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(user._id, { avatarURL });

    res.json({
        avatarURL,
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
};