import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { DatabaseService } from '../core';

@Controller('/health')
export class HealthController {
    private readonly healthCheckService: HealthCheckService;
    private readonly prismaHealthIndicator: PrismaHealthIndicator;
    private readonly databaseService: DatabaseService;

    constructor(
        healthCheckService: HealthCheckService,
        prismaHealthIndicator: PrismaHealthIndicator,
        databaseService: DatabaseService,
    ) {
        this.healthCheckService = healthCheckService;
        this.prismaHealthIndicator = prismaHealthIndicator;
        this.databaseService = databaseService;
    }

    @HealthCheck()
    @Get('/live')
    public async livenessCheck() {
        return await this.healthCheckService.check([]);
    }

    @HealthCheck()
    @Get('/ready')
    public async ready() {
        return await this.healthCheckService.check([
            async () => await this.prismaHealthIndicator.pingCheck('database', this.databaseService.prisma),
        ]);
    }
}
