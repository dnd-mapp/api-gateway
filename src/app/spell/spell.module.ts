import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core';
import { SpellController } from './spell.controller';
import { SpellRepository } from './spell.repository';
import { SpellService } from './spell.service';

@Module({
    imports: [DatabaseModule],
    controllers: [SpellController],
    providers: [SpellRepository, SpellService],
    exports: [SpellService],
})
export class SpellModule {}
