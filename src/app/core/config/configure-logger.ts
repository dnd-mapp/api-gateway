import { NestFastifyApplication } from '@nestjs/platform-fastify';

export function configureLogger(app: NestFastifyApplication) {
    app.useLogger(['log', 'warn', 'error', 'fatal']);
}
