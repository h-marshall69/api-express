import Joi from 'joi';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emjgjuomqrvfhutsxlqh.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    birth_year: Joi.number()
        .integer()
        .min(1950)
        .max(2040),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

class User {
    constructor({ username, password, birth_year, email }) {
        this.username = username;
        this.password = password;
        this.birth_year = birth_year;
        this.email = email;
    }

    static validate(user) {
        return userSchema.validate(user);
    }

    async save() {
        const { data, error } = await supabase
            .from('users')
            .insert([{username: this.username, email: this.email, password: this.password}])
            .select()
            .single();
        
        if (error) {
            throw error;
        }
        
        return data;
    }

    // Método estático para buscar usuario por correo electrónico
    static async findByEmail(email) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single(); // Cambia `.single()` a `.maybeSingle()` si el correo puede no estar presente
        
        return { data, error };
    }
};

export default User;