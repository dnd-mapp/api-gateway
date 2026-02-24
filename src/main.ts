import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApplicationConfig, AppModule, ConfigNameSpaces, configureSSL, ServerConfig } from './app';

async function main() {
    const { ssl, adapter } = await configureSSL();
    const app = await NestFactory.create(AppModule, adapter);

    const configService = app.get(ConfigService<ApplicationConfig, true>);
    const { host, port } = configService.get<ServerConfig>(ConfigNameSpaces.SERVER);

    app.enableShutdownHooks();

    await app.listen(port, host, () => {
        const address = `${ssl ? 'https' : 'http'}://${host}:${port}`;
        Logger.log(`Application is running on: ${address}`, 'NestApplication');
    });
}

main().catch((error) => console.error(error));
