import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export const DEFAULT_LIMIT = 20;

export const MIN_LIMIT = 1;

export const SortOrders = {
    ASCENDING: 'asc',
    DESCENDING: 'desc',
} as const;

export type SortOrder = (typeof SortOrders)[keyof typeof SortOrders];

export const DEFAULT_SORT_ORDER: SortOrder = SortOrders.ASCENDING;

export class QueryParamsDto {
    @Min(MIN_LIMIT)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsOptional()
    public limit?: number = DEFAULT_LIMIT;

    @IsEnum(SortOrders)
    @IsOptional()
    public order?: SortOrder = DEFAULT_SORT_ORDER;
}
