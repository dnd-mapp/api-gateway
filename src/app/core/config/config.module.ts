import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { databaseConfig } from './database.config';
import { validateEnvironmentVariables } from './environment-validation';
import { serverConfig } from './server.config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: '.env',
            expandVariables: true,
            load: [serverConfig, databaseConfig],
            validate: validateEnvironmentVariables,
        }),
    ],
})
export class ConfigModule {}
