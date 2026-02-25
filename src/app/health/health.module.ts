import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '../core';
import { HealthController } from './health.controller';

@Module({
    imports: [TerminusModule, DatabaseModule],
    controllers: [HealthController],
})
export class HealthModule {}
