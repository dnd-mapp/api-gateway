import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, Max, Min, validate } from 'class-validator';
import { fromStringToArray, isArrayEmpty, IsCorsOrigin, IsHost, transform } from '../../utils';
import { EnvironmentVariableNames, MAX_PORT, MIN_PORT, MIN_PORT_UNPRIVILEGED } from './constants';
import { DEFAULT_DB_HOST, DEFAULT_DB_SCHEMA, DEFAULT_DB_USER } from './database.config';
import { DEFAULT_CORS_ORIGINS, DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT } from './server.config';
import { validationOptions } from './validation-options';

export async function validateEnvironmentVariables(variables: Record<string, unknown>) {
    const parsed = transform(EnvironmentVariables, variables);

    const validationErrors = await validate(parsed, {
        ...validationOptions,
        forbidNonWhitelisted: false,
    });

    if (!isArrayEmpty(validationErrors)) throw new Error(validationErrors[0]!.toString());
    return parsed;
}

export class EnvironmentVariables {
    @IsHost()
    [EnvironmentVariableNames.HOST]: string = DEFAULT_SERVER_HOST;

    @Max(MAX_PORT)
    @Min(MIN_PORT_UNPRIVILEGED)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    [EnvironmentVariableNames.PORT]: number = DEFAULT_SERVER_PORT;

    @IsCorsOrigin({ each: true })
    @IsArray()
    @Transform(({ value }) => {
        if (!value || typeof value !== 'string') return DEFAULT_CORS_ORIGINS;
        return fromStringToArray(value)!;
    })
    [EnvironmentVariableNames.CORS_ORIGINS]: string[] = DEFAULT_CORS_ORIGINS;

    @IsHost()
    [EnvironmentVariableNames.DB_HOST]: string = DEFAULT_DB_HOST;

    @Max(MAX_PORT)
    @Min(MIN_PORT)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    [EnvironmentVariableNames.DB_PORT]: number = DEFAULT_SERVER_PORT;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariableNames.DB_NAME]: string = DEFAULT_DB_SCHEMA;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariableNames.DB_USER]: string = DEFAULT_DB_USER;

    @IsNotEmpty()
    @IsString()
    [EnvironmentVariableNames.DB_PASS]!: string;
}
