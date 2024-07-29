import dotenv from "dotenv/config";
import app from './src/app.js';

import chalk from 'chalk';
import { PORT } from "./src/config/secret.js";

app.listen(PORT, err => {
    if(!err) {
        console.log(chalk.bold.magenta(`✓ Server is running at: http://localhost:${PORT}`));
    } else {
        console.log(chalk.bold.red(`✘ Failed to start server! CAUSE: ${err}`));
    }
});