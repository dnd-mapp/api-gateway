import { registerAs } from '@nestjs/config';
import { parseInteger, readFromEnv } from '../../utils';
import { ConfigNameSpaces, EnvironmentVariableNames } from './constants';
import { DatabaseConfig } from './types';

export const DEFAULT_DB_HOST = 'localhost';

export const DEFAULT_DB_PORT = 3600;

export const DEFAULT_DB_SCHEMA = 'dma_api_dev';

export const DEFAULT_DB_USER = 'root';

export const databaseConfig = registerAs<DatabaseConfig>(ConfigNameSpaces.DATABASE, () => ({
    host: readFromEnv(EnvironmentVariableNames.HOST) ?? DEFAULT_DB_HOST,
    port: parseInteger(readFromEnv(EnvironmentVariableNames.PORT), DEFAULT_DB_PORT),
    user: readFromEnv(EnvironmentVariableNames.DB_USER) ?? DEFAULT_DB_USER,
    password: readFromEnv(EnvironmentVariableNames.DB_PASS)!,
    schema: readFromEnv(EnvironmentVariableNames.DB_NAME) ?? DEFAULT_DB_SCHEMA,
}));
