import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { QueryParamsDto } from '../../common';

export class SpellDto {
    @IsNotEmpty()
    @IsString()
    public id!: string;

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    public name!: string;
}

export class SpellQueryParams extends QueryParamsDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    public name?: string;
}
