import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigNameSpaces } from './constants';
import { ApplicationConfig, ServerConfig } from './types';

export function configureCors(app: NestFastifyApplication) {
    const configService = app.get(ConfigService<ApplicationConfig, true>);
    const { cors } = configService.get<ServerConfig>(ConfigNameSpaces.SERVER);

    app.enableCors({
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: [...cors.origins],
        maxAge: 3_600,
    });
}
