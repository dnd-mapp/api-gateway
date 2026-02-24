import { ValidatorOptions } from 'class-validator';

export const validationOptions: ValidatorOptions = {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    stopAtFirstError: true,
    whitelist: true,
};
