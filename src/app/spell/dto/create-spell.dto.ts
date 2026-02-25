import { PickType } from '@nestjs/swagger';
import { SpellDto } from './spell.dto';

export class CreateSpellDto extends PickType(SpellDto, ['name']) {}
