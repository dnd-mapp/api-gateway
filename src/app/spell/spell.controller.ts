import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { type FastifyReply } from 'fastify';
import { CreateSpellDto, SpellQueryParams, UpdateSpellDto } from './dto';
import { SpellService } from './spell.service';

@Controller('/spells')
export class SpellController {
    private readonly logger = new Logger(SpellController.name);
    private readonly spellService: SpellService;

    constructor(spellService: SpellService) {
        this.spellService = spellService;
    }

    @Get()
    public async getAll(@Query() queryParams: SpellQueryParams) {
        this.logger.log(`Fetching all spells with filters: ${JSON.stringify(queryParams)}`);
        return await this.spellService.getAll(queryParams);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() data: CreateSpellDto, @Res({ passthrough: true }) response: FastifyReply) {
        this.logger.log(`Creating new Spell "${data.name}"`);
        const result = await this.spellService.create(data);
        const url = response.request.url;

        response.headers({ location: `${url}/${result.id}` });

        return result;
    }

    @Get('/:id')
    public async getById(@Param('id') id: string) {
        this.logger.log(`Fetching Spell with ID "${id}"`);
        const result = await this.spellService.getById(id);

        if (!result) {
            this.logger.warn(`Spell lookup failed for ID "${id}"`);
            throw new NotFoundException(`Spell with ID "${id}" was not found`);
        }
        return result;
    }

    @Put('/:id')
    public async update(@Param('id') id: string, @Body() data: UpdateSpellDto) {
        this.logger.log(`Updating Spell ID "${id}"`);
        return await this.spellService.update(id, data);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param('id') id: string) {
        this.logger.log(`Removing Spell ID "${id}"`);
        await this.spellService.remove(id);
    }
}
