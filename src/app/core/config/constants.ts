export const ConfigNameSpaces = {
    SERVER: 'server',
    DATABASE: 'database',
} as const;

export const EnvironmentVariableNames = {
    HOST: 'HOST',
    PORT: 'PORT',
    CORS_ORIGINS: 'CORS_ORIGINS',
    DB_HOST: 'DB_HOST',
    DB_PORT: 'DB_PORT',
    DB_USER: 'DB_USER',
    DB_PASS: 'DB_PASS',
    DB_NAME: 'DB_NAME',
} as const;
