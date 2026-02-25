import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule } from './core';
import { HealthModule } from './health/health.module';

@Module({
    imports: [ConfigModule, HealthModule, DatabaseModule],
})
export class AppModule {}
