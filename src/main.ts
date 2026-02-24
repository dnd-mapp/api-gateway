import { NestFactory } from '@nestjs/core';
import { AppModule, configureSSL, parseInteger } from './app';

async function main() {
    const { ssl, adapter } = await configureSSL();
    const app = await NestFactory.create(AppModule, adapter);

    const host = process.env['HOST'] ?? 'localhost';
    const port = parseInteger(3000, process.env['PORT']);

    app.enableShutdownHooks();

    await app.listen(port, host);
}

main().catch((error) => console.error(error));
