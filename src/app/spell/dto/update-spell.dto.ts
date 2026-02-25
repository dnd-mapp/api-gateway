import { PickType } from '@nestjs/swagger';
import { SpellDto } from './spell.dto';

export class UpdateSpellDto extends PickType(SpellDto, ['name']) {}
