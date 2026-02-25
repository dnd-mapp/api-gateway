import { PrismaClient } from '@dnd-mapp/api-gateway/prisma/client';
import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ApplicationConfig, ConfigNameSpaces, DatabaseConfig } from '../config';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly configService: ConfigService<ApplicationConfig, true>;
    private readonly logger = new Logger(DatabaseService.name);

    private prismaClient: PrismaClient | null = null;

    public get prisma() {
        return this.prismaClient!;
    }

    constructor(configService: ConfigService<ApplicationConfig, true>) {
        this.configService = configService;
    }

    public async onApplicationBootstrap() {
        await this.initializePrismaClient();
    }

    public async onApplicationShutdown() {
        await this.prismaClient!.$disconnect();
    }

    private async initializePrismaClient() {
        const { host, port, schema, user, password } = this.configService.get<DatabaseConfig>(
            ConfigNameSpaces.DATABASE,
        );

        const adapter = new PrismaMariaDb({
            host: host,
            port: port,
            database: schema,
            user: user,
            password: password,
            logger: {
                query: (message) => this.logger.debug(message),
                network: (message) => this.logger.debug(message),
                warning: (message) => this.logger.warn(message),
                error: (error) => this.logger.error(error.message, error.stack),
            },
        });

        this.prismaClient = new PrismaClient({ adapter: adapter });

        await this.prismaClient.$connect();
    }
}
