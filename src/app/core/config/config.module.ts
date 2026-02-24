import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            envFilePath: '.env',
            expandVariables: true,
            load: [],
            // validate: validateEnvironmentVariables
        }),
    ],
})
export class ConfigModule {}
