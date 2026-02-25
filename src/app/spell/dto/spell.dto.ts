import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SpellDto {
    @IsNotEmpty()
    @IsString()
    public id!: string;

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    public name!: string;
}

export class SpellQueryParams {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    public name?: string;
}
