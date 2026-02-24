import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer';

export const defaultOptions: ClassTransformOptions = {
    enableCircularCheck: true,
    enableImplicitConversion: true,
    exposeDefaultValues: true,
};

export function transform<T>(ctor: ClassConstructor<T>, value: unknown, options = defaultOptions): T {
    return plainToInstance(ctor, value, options);
}

export function transformAll<T>(ctor: ClassConstructor<T>, value: unknown[], options = defaultOptions): T[] {
    return plainToInstance(ctor, value, options);
}
