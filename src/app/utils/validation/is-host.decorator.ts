import {
    isFQDN,
    isIP,
    isNotEmpty,
    isString,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
    name: 'IsHost',
    async: false,
})
export class IsHostConstraint implements ValidatorConstraintInterface {
    public validate(value: unknown) {
        return (isString(value) && isNotEmpty(value) && isIP(value, '4')) || isFQDN(value, { require_tld: false });
    }

    public defaultMessage?(args: ValidationArguments) {
        return `${args.property} must be a valid hostname or IP address`;
    }
}

export function IsHost(validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsHostConstraint,
        });
    };
}
