import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const description = `
High-performance REST API serving as the **Source of Truth** for 5th Edition TTRPG data.

### Key Features
- **SRD-Compliant**: Access to core 5e Spells, Creatures, Items, and Classes.
- **Type-Safe**: Strictly validated via Prisma and class-validator.
- **Performant**: Powered by NestJS and the Fastify adapter.

*This API handles static rulebook data; player-specific campaign data is decoupled.*
`.trim();

export function configureSwagger(app: NestFastifyApplication) {
    const config = new DocumentBuilder()
        .setTitle('D&D Mapp: API Gateway')
        .setDescription(description)
        .setVersion(process.env['npm_package_version']!)
        .build();

    SwaggerModule.setup('docs', app, () => SwaggerModule.createDocument(app, config));
}
