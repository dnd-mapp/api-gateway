import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
    ApplicationConfig,
    AppModule,
    ConfigNameSpaces,
    configureCors,
    configureHelmet,
    configureLogger,
    configureSSL,
    configureSwagger,
    ServerConfig,
} from './app';

async function main() {
    const { ssl, adapter } = await configureSSL();
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

    const configService = app.get(ConfigService<ApplicationConfig, true>);
    const { host, port } = configService.get<ServerConfig>(ConfigNameSpaces.SERVER);

    app.enableShutdownHooks();

    configureCors(app);
    await configureHelmet(app);
    configureSwagger(app);
    configureLogger(app);

    await app.listen(port, host, () => {
        const address = `${ssl ? 'https' : 'http'}://${host}:${port}`;
        Logger.log(`Application is running on: ${address}`, 'NestApplication');
    });
}

main().catch((error) => console.error(error));
