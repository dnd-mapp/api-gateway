import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpellDto, UpdateSpellDto } from './dto';
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

    public async update(id: string, data: UpdateSpellDto) {
        if (!(await this.doesSpellExist(id))) {
            throw new NotFoundException(`Could not update Spell with ID "${id}". - Reason: Spell was not found.`);
        }
        const { name } = data;

        if (await this.isNameTaken(name, id)) {
            throw new BadRequestException(
                `Could not update Spell with ID "${id}" - Reason: Name "${name}" is already in use.`,
            );
        }
        return await this.spellRepository.update(id, data);
    }

    private async getByName(name: string) {
        return await this.spellRepository.findOneByName(name);
    }

    private async isNameTaken(name: string, id?: string) {
        const result = await this.getByName(name);
        return result !== null && (!id || result.id !== id);
    }

    private async doesSpellExist(id: string) {
        const queryResult = await this.getById(id);
        return queryResult !== null;
    }
}
