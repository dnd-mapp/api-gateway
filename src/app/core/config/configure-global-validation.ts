import { ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { defaultTransformOptions } from '../../utils';
import { validationOptions } from './validation-options';

export function configureGlobalValidation(app: NestFastifyApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            ...validationOptions,
            transform: true,
            transformOptions: defaultTransformOptions,
            validateCustomDecorators: true,
        }),
    );
}
