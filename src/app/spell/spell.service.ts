import { Injectable } from '@nestjs/common';
import { SpellRepository } from './spell.repository';

@Injectable()
export class SpellService {
    private readonly spellRepository: SpellRepository;

    constructor(spellRepository: SpellRepository) {
        this.spellRepository = spellRepository;
    }

    public async getAll() {
        return await this.spellRepository.findAll();
    }
}
