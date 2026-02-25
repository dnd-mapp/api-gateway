import { Controller, Get } from '@nestjs/common';
import { SpellService } from './spell.service';

@Controller('/spells')
export class SpellController {
    private readonly spellService: SpellService;

    constructor(spellService: SpellService) {
        this.spellService = spellService;
    }

    @Get()
    public async getAll() {
        return await this.spellService.getAll();
    }
}
