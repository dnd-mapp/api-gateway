import { ConfigNameSpaces } from './constants';

export interface ServerConfig {
    host: string;
    port: number;
    cors: {
        origins: string[];
    };
}

export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    schema: string;
}

export interface ApplicationConfig {
    [ConfigNameSpaces.SERVER]: ServerConfig;
    [ConfigNameSpaces.DATABASE]: DatabaseConfig;
}
