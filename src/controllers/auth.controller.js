import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { username, password, r_password, birth_year, email } = req.body;


        // Validar las contraseñas
        if (password !== r_password) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Validar los datos del usuario
        const { error } = User.validate({ username, password, birth_year, email });
        if (error) {
            return res.status(400).json({ error: error.details.map(detail => detail.message) });
        }

        // Verificar si el usuario ya existe
        // const existingUser = await User.findByEmail(email);
        // if (existingUser) {
        //     return res.status(400).json({ error: "User with this email already exists" });
        // }

        const passwordHash = await bcryptjs.hash(password, 10);

        // Crear una instancia de User
        const user = new User({ username, password: passwordHash, birth_year, email });


        // Guardar el usuario en la base de datos
        const data = await user.save();

        const token = await createAccessToken({id: data.id});

        // Enviar una respuesta exitosa
        // res.status(201).json({ message: "User registered successfully", data });

        res.cookie('token', token);
        res.json({
            id: data.id,
            username: data.username,
            email: data.email
        })

    } catch (error) {
        // Manejar errores (por ejemplo, errores de base de datos)
        console.error(error);
        res.status(500).json({ error: "An error occurred while registering the user" });
    }
};

export const login1 = async (req, res) => {
    try {
        const {email, password} = req.body;
        return res.json({
            email,
            password
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Verificar si el usuario existe
        const { data: user, error } = await User.findByEmail(email);
        if (error) {
            return res.status(400).json({ message: 'Error fetching user', error: error.message });
        }
        // return res.json({
        //     user
        // });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generar un token de acceso JWT
        const token = await createAccessToken({ id: user.id });

        // Enviar una respuesta exitosa
        res.cookie('token', token);
        res.json({
            id: user.id,
            username: user.username,
            email: user.email
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async  (req, res) => {};