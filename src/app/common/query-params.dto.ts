import { IsNumber, IsOptional, Min } from 'class-validator';

export const DEFAULT_LIMIT = 20;

export const MIN_LIMIT = 1;

export class QueryParamsDto {
    @Min(MIN_LIMIT)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsOptional()
    public limit?: number = DEFAULT_LIMIT;
}
