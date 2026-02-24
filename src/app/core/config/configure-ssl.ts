import { FastifyAdapter } from '@nestjs/platform-fastify';
import { readFile } from 'fs/promises';

interface ConfigureSslResult {
    ssl: boolean;
    adapter: FastifyAdapter;
}

export async function configureSSL(): Promise<ConfigureSslResult> {
    const sslCertPath = process.env['SSL_CERT_PATH'];
    const sslKeyPath = process.env['SSL_KEY_PATH'];

    if (!sslCertPath || !sslKeyPath)
        return {
            ssl: false,
            adapter: new FastifyAdapter(),
        };
    const cert = await readFile(sslCertPath, { encoding: 'utf8' });
    const key = await readFile(sslKeyPath, { encoding: 'utf8' });

    return {
        ssl: true,
        adapter: new FastifyAdapter({
            https: {
                cert: cert,
                key: key,
            },
        }),
    };
}
