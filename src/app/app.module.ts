import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule } from './core';
import { HealthModule } from './health/health.module';
import { SpellModule } from './spell';

@Module({
    imports: [ConfigModule, HealthModule, DatabaseModule, SpellModule],
})
export class AppModule {}
