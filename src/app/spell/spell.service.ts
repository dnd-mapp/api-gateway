import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpellDto } from './dto';
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

    public async getById(id: string) {
        return await this.spellRepository.findOneById(id);
    }

    public async create(data: CreateSpellDto) {
        const { name } = data;

        if (await this.isNameTaken(name)) {
            throw new BadRequestException(`Could not create Spell. - Reason: Name "${name}" is already in use.`);
        }
        return await this.spellRepository.create(data);
    }

    private async getByName(name: string) {
        return await this.spellRepository.findOneByName(name);
    }

    private async isNameTaken(name: string) {
        const result = await this.getByName(name);
        return result !== null;
    }
}
