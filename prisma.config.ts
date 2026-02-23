import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'prisma/config';

config({ path: '.env', ignore: ['MISSING_ENV_FILE'], quiet: true });

const databaseUrl = process.env['DATABASE_URL'];

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: './prisma/seeding/seed.sh',
    },
    datasource: {
        url: databaseUrl,
        shadowDatabaseUrl: `${databaseUrl}_shadow`,
    },
});
