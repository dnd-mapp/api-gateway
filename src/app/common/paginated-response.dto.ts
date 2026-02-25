import { IsArray, IsNumber } from 'class-validator';

export class PaginatedResponseDto<T> {
    @IsArray()
    public data!: T[];

    @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0, allowNaN: false })
    public totalCount!: number;

    @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0, allowNaN: false })
    public totalPages!: number;

    @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0, allowNaN: false })
    public page!: number;

    @IsNumber({ allowInfinity: false, maxDecimalPlaces: 0, allowNaN: false })
    public limit!: number;
}
