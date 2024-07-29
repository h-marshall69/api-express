import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config/secret.js";

console.log(TOKEN_SECRET);

export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if(!token)
            return res
                .status(401)
                .json({ message:  "No token, authorization denied"});

    } catch (error) {
        return res.ststus(500).json({ message: error.message });
    }
};