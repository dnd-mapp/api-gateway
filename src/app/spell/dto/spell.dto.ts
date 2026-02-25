import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SpellDto {
    @IsNotEmpty()
    @IsString()
    public id!: string;

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    public name!: string;
}
