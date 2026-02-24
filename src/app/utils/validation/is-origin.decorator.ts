import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { tryCatchSync } from '../try-catch';

@ValidatorConstraint({
    name: 'isCorsOrigin',
    async: false,
})
export class IsCorsOriginConstraint implements ValidatorConstraintInterface {
    public validate(value: unknown) {
        // CORS origins must be strings
        if (typeof value !== 'string') return false;

        // Allow wildcard
        if (value === '*') return true;

        // Use the native URL constructor for strict origin parsing
        const { data: url, error } = tryCatchSync(() => new URL(value));

        // If URL parsing fails, it's not a valid origin string
        if (error) return false;

        /**
         * A valid CORS origin must:
         * 1. Have no path (the browser default is '/')
         * 2. Have no search parameters
         * 3. Have no fragments (#)
         */
        const hasPath = url.pathname !== '/';
        const hasSearch = !!url.search;
        const hasHash = !!url.hash;

        return !hasPath && !hasSearch && !hasHash;
    }

    public defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid CORS origin (e.g., "https://example.com" or "*")`;
    }
}

export function IsCorsOrigin(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCorsOriginConstraint,
        });
    };
}
