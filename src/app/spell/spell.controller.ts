import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import { type FastifyReply } from 'fastify';
import { CreateSpellDto, UpdateSpellDto } from './dto';
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

    @Post()
    public async create(@Body() data: CreateSpellDto, @Res({ passthrough: true }) response: FastifyReply) {
        const result = await this.spellService.create(data);
        const url = response.request.url;

        response.status(HttpStatus.CREATED).headers({ location: `${url}/${result.id}` });

        return result;
    }

    @Get('/:id')
    public async getById(@Param('id') id: string) {
        const result = await this.spellService.getById(id);

        if (!result) throw new NotFoundException(`Spell with ID "${id}" was not found`);
        return result;
    }

    @Put('/:id')
    public async update(@Param('id') id: string, @Body() data: UpdateSpellDto) {
        return await this.spellService.update(id, data);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param('id') id: string) {
        await this.spellService.remove(id);
    }
}
