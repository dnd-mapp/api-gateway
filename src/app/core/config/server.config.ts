import { registerAs } from '@nestjs/config';
import { fromStringToArray, parseInteger, readFromEnv } from '../../utils';
import { ConfigNameSpaces, EnvironmentVariableNames } from './constants';
import { ServerConfig } from './types';

export const DEFAULT_SERVER_HOST = 'localhost.api.dndmapp.dev';

export const DEFAULT_SERVER_PORT = 4550;

export const DEFAULT_CORS_ORIGINS: string[] = [
    'https://localhost.admin.dndmapp.dev:4300',
    'https://localhost.www.dndmapp.dev:4200',
];

export const serverConfig = registerAs<ServerConfig>(ConfigNameSpaces.SERVER, () => ({
    host: readFromEnv(EnvironmentVariableNames.HOST) ?? DEFAULT_SERVER_HOST,
    port: parseInteger(readFromEnv(EnvironmentVariableNames.PORT), DEFAULT_SERVER_PORT),
    cors: {
        origins: fromStringToArray(readFromEnv(EnvironmentVariableNames.CORS_ORIGINS)) ?? DEFAULT_CORS_ORIGINS,
    },
}));
