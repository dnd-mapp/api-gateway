import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config';
import { HealthModule } from './health/health.module';

@Module({
    imports: [ConfigModule, HealthModule],
})
export class AppModule {}
