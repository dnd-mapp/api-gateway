import { Spell as PrismaSpell } from '@dnd-mapp/api-gateway/prisma/client';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core';
import { CreateSpellDto, SpellQueryParams, UpdateSpellDto } from './dto';
import { SpellBuilder } from './spell.builder';

export function spellDatabaseRecordToDto(record: PrismaSpell) {
    return new SpellBuilder().withId(record.id).withName(record.name).build();
}

export function spellDatabaseRecordsToDto(records: PrismaSpell[]) {
    return records.map((record) => spellDatabaseRecordToDto(record));
}

@Injectable()
export class SpellRepository {
    private readonly databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    public async findAll(queryParams: SpellQueryParams) {
        const results = await this.databaseService.prisma.spell.findMany({
            ...(queryParams.limit ? { take: queryParams.limit } : {}),
            where: {
                ...(queryParams.name ? { name: { contains: queryParams.name } } : {}),
            },
        });
        return spellDatabaseRecordsToDto(results);
    }

    public async findOneById(id: string) {
        const result = await this.databaseService.prisma.spell.findUnique({
            where: { id: id },
        });

        if (!result) return null;
        return spellDatabaseRecordToDto(result);
    }

    public async findOneByName(name: string) {
        const result = await this.databaseService.prisma.spell.findUnique({
            where: { name: name },
        });

        if (!result) return null;
        return spellDatabaseRecordToDto(result);
    }

    public async createOne(data: CreateSpellDto) {
        const { name } = data;

        const result = await this.databaseService.prisma.spell.create({
            data: {
                name: name,
            },
        });
        return spellDatabaseRecordToDto(result);
    }

    public async updateOneById(id: string, data: UpdateSpellDto) {
        const { name } = data;

        const result = await this.databaseService.prisma.spell.update({
            where: { id: id },
            data: {
                name: name,
            },
        });
        return spellDatabaseRecordToDto(result);
    }

    public async removeOneById(id: string) {
        await this.databaseService.prisma.spell.delete({ where: { id: id } });
    }
}
