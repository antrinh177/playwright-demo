import * as dotenv from 'dotenv';
import * as path from "node:path";

export const getEnv = () => {
    const environment = process.env.ENV ?? "prod";

    if (environment !== "prod") {
        throw new Error(`Unsupported ENV "${environment}".`);
    }

    const { error } = dotenv.config({
        override: true,
        path: path.resolve(`src/helper/env/.env.${environment}`)
    });

    if (error) {
        throw error;
    }

    if (!process.env.BASEURL || !process.env.BROWSER) {
        throw new Error(`BASEURL and BROWSER must be set in .env.${environment}`);
    }
};