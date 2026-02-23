import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';

function parseNumber(fallback: number, value?: string) {
    if (!value) return fallback;
    const parsed = Number.parseInt(value);

    if (Number.isNaN(parsed)) return fallback;
    return parsed;
}

async function main() {
    const adapter = new FastifyAdapter();
    const app = await NestFactory.create(AppModule, adapter);

    const host = process.env['HOST'] ?? 'localhost';
    const port = parseNumber(3000, process.env['PORT']);

    await app.listen(port, host);
}

main().catch((error) => console.error(error));
