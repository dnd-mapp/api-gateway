import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
    private healthCheckService: HealthCheckService;

    constructor(healthCheckService: HealthCheckService) {
        this.healthCheckService = healthCheckService;
    }

    @Get('/live')
    public async livenessCheck() {
        return await this.healthCheckService.check([]);
    }

    @Get('/ready')
    public async ready() {
        return await this.healthCheckService.check([]);
    }
}
