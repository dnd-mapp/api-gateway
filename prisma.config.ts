import { config } from '@dotenvx/dotenvx';
import { defineConfig, env } from 'prisma/config';

config({ path: '.env', ignore: ['MISSING_ENV_FILE'], quiet: true });

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: './prisma/seeding/seed.sh',
    },
    datasource: {
        url: env('DATABASE_URL'),
    },
});
