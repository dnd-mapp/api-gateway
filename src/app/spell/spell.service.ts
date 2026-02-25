import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSpellDto, SpellQueryParams, UpdateSpellDto } from './dto';
import { SpellRepository } from './spell.repository';

@Injectable()
export class SpellService {
    private readonly logger = new Logger(SpellService.name);
    private readonly spellRepository: SpellRepository;

    constructor(spellRepository: SpellRepository) {
        this.spellRepository = spellRepository;
    }

    public async getAll(queryParams: SpellQueryParams) {
        return await this.spellRepository.findAll(queryParams);
    }

    public async getById(id: string) {
        return await this.spellRepository.findOneById(id);
    }

    public async create(data: CreateSpellDto) {
        const { name } = data;

        if (await this.isNameTaken(name)) {
            this.logger.error(`Create failed: Spell with name "${name}" already exists`);
            throw new BadRequestException(`Could not create Spell. - Reason: Name "${name}" is already in use`);
        }
        return await this.spellRepository.createOne(data);
    }

    public async update(id: string, data: UpdateSpellDto) {
        if (!(await this.doesSpellExist(id))) {
            this.logger.warn(`Update failed: Spell with ID "${id}" was not found`);
            throw new NotFoundException(`Could not update Spell with ID "${id}". - Reason: Spell was not found`);
        }
        const { name } = data;

        if (await this.isNameTaken(name, id)) {
            this.logger.error(`Update failed: New name "${name}" already taken by another Spell`);
            throw new BadRequestException(
                `Could not update Spell with ID "${id}" - Reason: Name "${name}" is already in use`,
            );
        }
        return await this.spellRepository.updateOneById(id, data);
    }

    public async remove(id: string) {
        if (!(await this.doesSpellExist(id))) {
            this.logger.warn(`Removal failed: Spell with ID "${id}" does not exist`);
            throw new NotFoundException(`Could not remove Spell by id "${id}". - Reason: Spell does not exist`);
        }
        await this.spellRepository.removeOneById(id);
    }

    private async getByName(name: string) {
        return await this.spellRepository.findOneByName(name);
    }

    private async isNameTaken(name: string, id?: string) {
        const queryResult = await this.getByName(name);
        return queryResult !== null && (!id || queryResult.id !== id);
    }

    private async doesSpellExist(id: string) {
        const queryResult = await this.getById(id);
        return queryResult !== null;
    }
}
