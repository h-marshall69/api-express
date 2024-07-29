

const getEnv = name => {
    return process.env[name];
};

export const PORT = getEnv("PORT");
export const TOKEN_SECRET = getEnv("TOKEN_SECRET");