# D&D Mapp: API Gateway (`@dnd-mapp/api-gateway`)

[![CI](https://github.com/dnd-mapp/api-gateway/actions/workflows/push-main.yaml/badge.svg)](https://github.com/dnd-mapp/api-gateway/actions/workflows/push-main.yaml)
[![License: All Rights Reserved](https://img.shields.io/badge/License-All_Rights_Reserved-red.svg)](./LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![NestJS](https://img.shields.io/badge/Framework-NestJS-E0234E.svg)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748.svg)](https://www.prisma.io/)

> **OpenAPI Documentation**: [https://localhost.api.dndmapp.dev:4450/docs](https://localhost.api.dndmapp.dev:4450/docs) (Local Dev)

## Project Overview

The **D&D Mapp: API Gateway** is a high-performance, standalone REST API designed to serve as the "Source of Truth" for Tabletop RPG data. It provides structured access to core 5th Edition game mechanics, including Spells, Creature Stat Blocks, Races, Items, and Classes.

While built as a foundational component for the **D&D Mapp** platform, this service is architected to operate independently. This approach successfully decouples static rulebook data (SRD) from dynamic, player-specific campaign data, ensuring a clear separation of concerns and a focused data model.

## Technical Stack

- **Framework:** [NestJS](https://nestjs.com/) with the [Fastify](https://www.fastify.io/) adapter for high-throughput, low-latency request handling.
- **Database:** [MariaDB](https://mariadb.org/) for robust relational data storage.
- **ORM:** [Prisma](https://www.prisma.io/) to ensure end-to-end type safety and efficient schema management.
- **API Pattern:** RESTful architecture featuring built-in Pagination, Filtering (e.g., by Challenge Rating, Spell Level), and Sorting.

## Key Features

- **SRD-Compliant Data:** A curated library of 5th Edition content, strictly adhering to the System Reference Document (SRD) for public consumption.
- **Administrative Data Management:** Includes a protected administrative layer for data entry and curation, allowing for seamless updates via a dedicated portal.
- **Decoupled Architecture:** By excluding player-specific data (characters, inventories, maps), the API remains a focused, highly cacheable reference engine.
- **Schema-First Design:** Leveraging Prisma and NestJS to provide a strictly typed contract, ensuring that complex game mechanics are represented with high data integrity.

## Documentation

The API Gateway is fully documented using **Swagger (OpenAPI 3.0)**.

When the application is running in `development` mode, you can access the interactive UI at: **`https://localhost.api.dndmapp.dev:4450/docs`**

This documentation provides:

- Detailed schema definitions for all SRD entities.
- Interactive request testing (Try it out!).
- Authentication requirements for administrative endpoints.
- Response examples and error code definitions.

## Getting Started

### Prerequisites

We recommend using **[Mise-en-place (mise)](https://mise.jdx.dev/)** to manage runtimes and package managers. This project includes a `.tool-versions` file to ensure development environment consistency.

- **Mise**: To handle Node.js and pnpm versions automatically.
- **Database**: MariaDB 10.11+
- **Docker**: For containerized development
- **mkcert**: For local TLS/SSL development (Optional but recommended)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dnd-mapp/api-gateway.git
   cd api-gateway
   ```

2. **Setup Runtimes (via Mise):**

   If you have Mise installed, run the following to install the correct Node.js and pnpm versions:

   ```bash
   mise install
   ```

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Configure Local DNS:**

   Map the development domain to your local machine. See [Local DNS Configuration](#local-dns-configuration) for details.

5. **Generate Local SSL Certificates:**

   To use HTTPS locally with `Fastify`, use `mkcert` to generate a self-signed certificate:

   ```bash
   # Install the CA to your trust store (once per machine)
   mkcert -install

   # Generate certificates for the local development domain
   pnpm gen:ssl-cert
   ```

6. **Start Database Infrastructure:**

   If you don't have a local MariaDB instance running, use the provided Docker Compose configuration to start one:

   ```bash
   docker compose -f .docker/compose.yaml up -d
   ```
   *This will start MariaDB with a health check. The API Gateway container is defined but will wait for the database to be healthy.*

7. **Database Setup:**

   Copy the environment template and configure your database credentials:

   ```bash
   cp .env.template .env
   ```

   Run the Prisma migrations to initialize the schema:

   ```bash
   pnpm prisma:migrate-reset
   
   # Or alternatively
   pnpm prisma:migrate-dev
   ```

8. **Seed the Database:**

   Populate your local database with core SRD data:

   ```bash
   pnpm prisma:seed
   ```

9. **Run the application:**

   ```bash
   pnpm run start
   ```

## Local DNS Configuration

To serve the API on `localhost.api.dndmapp.dev` during local development, you must update your system's hosts file.

### Edit your hosts file

**Windows (Run as Administrator):** `C:\Windows\System32\drivers\etc\hosts`  
**macOS / Linux:** `/etc/hosts`

Add the following line:

```text
127.0.0.1  localhost.api.dndmapp.dev
```

## Local HTTPS Setup

To enable HTTPS in the NestJS application (Fastify adapter), ensure your `.env` points to the correct paths. See the environment variables configuration below for more info.

## Docker Infrastructure

The project includes a `.docker/compose.yaml` file to simplify local development.

### Services

- **mariadb-server**: A MariaDB instance using secrets for the root password and volume mapping for persistence.
- **api-gateway**: The NestJS application itself.

> [!IMPORTANT]
> **Manual Database Setup Required**: The MariaDB container initializes with a root password, but it does **not** automatically create the application user or the required databases. You must create these manually before running migrations (see [Database Setup](#database-setup)).

### Management Commands

- **Start all services**: `pnpm docker:compose:up`
- **Stop all services**: `pnpm docker:compose:down`

## Database Setup

1. **Configure Environment**:

   Copy the environment template and configure your database credentials:

   ```bash
   cp .env.template .env
   ```

2. **Create Databases and User**:

   Prisma requires two databases to handle migrations safely in a development environment: the main database (`DB_NAME`) and a **Shadow Database**. Connect to your MariaDB instance (e.g., via `docker exec` or a GUI like DBeaver) and run:

   ```sql
   -- Create the main and shadow databases
   CREATE DATABASE IF NOT EXISTS dma_api_dev;
   CREATE DATABASE IF NOT EXISTS dma_api_dev_shadow;

   -- Create the user and grant privileges
   CREATE USER 'user'@'%' IDENTIFIED BY 'pass';
   
   GRANT ALL PRIVILEGES ON dma_api_dev.* TO 'user'@'%';
   GRANT ALL PRIVILEGES ON dma_api_dev_shadow.* TO 'user'@'%';
   
   FLUSH PRIVILEGES;
   ```

3. **Run Migrations**:

   Initialize the schema:

   ```bash
   pnpm prisma:migrate-dev
   ```

4. **Seed the Database**:

   Populate your local database with core SRD data:

   ```bash
   pnpm prisma:seed
   ```

## Docker Support

A Dockerfile is provided for containerized deployment, located at `.docker/Dockerfile`.

### Building the Image

To build the Docker image locally:

```bash
docker build -t dnd-mapp/api-gateway -f .docker/Dockerfile .
```

### Running the Container

Ensure you pass the required environment variables:

```bash
docker run -p 4450:4450 --env-file .env dnd-mapp/api-gateway
```

## Configuration

The application is configured via environment variables. Key variables include:

| Variable        | Description                       | Default                     |
|-----------------|-----------------------------------|-----------------------------|
| `DB_HOST`       | MariaDB host address              | `localhost`                 |
| `DB_PORT`       | MariaDB port                      | `3306`                      |
| `DB_USER`       | Database username                 | `user`                      |
| `DB_PASS`       | Database password                 | `pass`                      |
| `DB_NAME`       | Database/Schema name              | `dma_api_dev`               |
| `DATABASE_URL`  | Interpolated connection string    | (Constructed from above)    |
| `HOST`          | The hostname the gateway binds to | `localhost.api.dndmapp.dev` |
| `PORT`          | The port the gateway listens on   | `4450`                      |
| `SSL_KEY_PATH`  | Path to the private key           | `./ssl-key.pem`             |
| `SSL_CERT_PATH` | Path to the certificate           | `./ssl-cert.pem`            |
| `CORS_ORIGINS`  | Comma-separated allowed origins   | `*`                         |

### CORS Configuration

When defining multiple origins in your `.env` file, use a comma-separated string without spaces:

```bash
CORS_ORIGINS=https://localhost.auth.dndmapp.dev:4300,https://localhost.www.dndmapp.dev:4200
```

## Usage

The API Gateway provides a predictable REST interface. Most endpoints support `limit`, `offset`, and `sort` query parameters.

### Example: Fetching Spells

```http
GET /v1/spells?level=3&school=Evocation&limit=10
```

### Example: Fetching a Creature Stat Block

```http
GET /v1/creatures/ancient-red-dragon
```

## Contributing

We welcome contributions to the D&D Mapp ecosystem! For detailed instructions on our development workflow, coding standards, and how to submit pull requests, please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

This project is currently **unlicensed**. All rights are reserved. For more information, please see the [LICENSE](./LICENSE) file.

> [!Note]
> This project provides data covered under the Open Game License (OGL) v1.0a. Please refer to the `OGL.md` file in the root directory for specific attribution and compliance details.*

## Contact / Support

- **Lead Maintainer**: NoNamer777
- **Issue Tracker**: [GitHub Issues](https://github.com/dnd-mapp/api-gateway/issues)
