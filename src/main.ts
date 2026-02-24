import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule, parseInteger } from './app';

async function main() {
    const adapter = new FastifyAdapter();

    const app = await NestFactory.create(AppModule, adapter);

    const host = process.env['HOST'] ?? 'localhost';
    const port = parseInteger(3000, process.env['PORT']);

    app.enableShutdownHooks();

    await app.listen(port, host);
}

main().catch((error) => console.error(error));
