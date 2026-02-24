import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, configureSSL, parseInteger } from './app';

async function main() {
    const { ssl, adapter } = await configureSSL();
    const app = await NestFactory.create(AppModule, adapter);

    const host = process.env['HOST'] ?? 'localhost.api.dndmapp.dev';
    const port = parseInteger(3000, process.env['PORT']);

    app.enableShutdownHooks();

    await app.listen(port, host, () => {
        const address = `${ssl ? 'https' : 'http'}://${host}:${port}`;
        Logger.log(`Application is running on: ${address}`, 'NestApplication');
    });
}

main().catch((error) => console.error(error));
