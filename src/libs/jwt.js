import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/secret.js";
//import { token } from "morgan";

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) {
                    // Manejo de errores al firmar el token
                    console.error('Error creating JWT token:', err);
                    return reject(err);
                }
                resolve(token);
            }
        );
    });
};