# Contributing to D&D Mapp: API Gateway

First off, thank you for taking the time to contribute! We appreciate your help in making this "Source of Truth" for TTRPG data even better.

As this project follows a strict schema-first design and high-performance architecture, please adhere to the following guidelines.

## Development Environment

Ensure you have initialized your environment using the instructions in the [README.md](./README.md):

- Use **Mise** to align Node.js and pnpm versions.
- Ensure your local MariaDB instance is running.
- Run `pnpm install` to set up Git hooks (if applicable).

## Coding Standards

To maintain a consistent codebase, we enforce strict linting and formatting rules.

### Linting & Formatting

We use **ESLint** for static analysis and **Prettier** for code formatting.

- **Auto-format**: Most IDEs can be configured to "Format on Save".
- **Manual Check**: Run `pnpm run lint` to check for issues and `pnpm run format:check` to check formatting.
- **Style Rules**:
  - Use single quotes.
  - Trailing commas are required.
  - Print width is set to 80 characters.
  - Always use strictly typed interfaces/DTOs; avoid `any`.

### Architecture Patterns

- **NestJS Modules**: Keep modules focused and decoupled.
- **Fastify**: Be mindful of Fastify-specific patterns if you touch the underlying adapter.
- **Prisma**: All database interactions must go through the Prisma service. Do not write raw SQL unless absolutely necessary for performance.
- **Validation**: Every request payload must be validated using `class-validator` decorators in the DTO.

## Workflow

### 1. Branching

Create a branch from `main`. Use a descriptive name:

- `feat/add-monster-filtering`
- `fix/spell-range-parsing`
- `docs/update-api-examples`

### 2. Database Changes

If you need to change the database schema:

1. Modify `prisma/schema.prisma`.
2. Run `pnpm prisma migrate dev --name your_change_description`.
3. Commit the resulting migration files in the `prisma/migrations` directory.

### 3. Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features.
- `fix:` for bug fixes.
- `refactor:` for code changes that neither fix a bug nor add a feature.
- `chore:` for updating dependencies or build scripts.

## Pull Request Process

1. **Update Documentation**: If you add a new feature or change an environment variable, update the README or Swagger documentation.
2. **Lint Your Code**: PRs with linting errors will not be merged.
3. **Self-Review**: Look over your diff one last time for debug logs or commented-out code.
4. **Link Issues**: Reference any related issue numbers in your PR description (e.g., `Closes #123`).

## Questions?

If you're unsure about where to start or how to implement a specific feature, feel free to open a "Draft" PR or reach out to **NoNamer777**.
