# D&D Mapp: API Gateway

![Docker Pulls](https://img.shields.io/docker/pulls/dndmapp/api-gateway)
![Docker Image Size](https://img.shields.io/docker/image-size/dndmapp/api-gateway/latest)
![NestJS](https://img.shields.io/badge/Framework-NestJS-E0234E.svg)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748.svg)

The **D&D Mapp API Gateway** is a high-performance REST API built with NestJS and Fastify. It serves as the authoritative source for 5th Edition Tabletop RPG data, providing structured access to Spells, Creatures, Classes, and more.

This image is optimized for production use, featuring multi-arch support (`amd64`, `arm64`) and a small footprint based on Alpine Linux.

## Features

- **SRD 5.1 Content**: Pre-loaded with System Reference Document data.
- **High Performance**: Built on NestJS with the Fastify adapter.
- **Type-Safe**: Fully typed API with Prisma ORM and MariaDB.
- **Secure**: JWT-based authentication and built-in SSL/TLS support.
- **Validated**: Strict environment and request validation using `class-validator`.

---

## Quick Start

The easiest way to run the API Gateway is using **Docker Compose**, as it requires a MariaDB instance to function.

```yaml
services:
    api-gateway:
        image: dndmapp/api-gateway:latest
        restart: unless-stopped
        depends_on:
            mariadb-server:
                condition: service_healthy
        ports:
            - "4450:4450"
        env_file:
            - ./.env

    mariadb-server:
        image: mariadb:latest
        container_name: mariadb
        restart: unless-stopped
        healthcheck:
            test: ['CMD', 'healthcheck.sh', '--connect', '--innodb_initialized']
            start_period: 10s
            interval: 10s
            timeout: 5s
            retries: 3
        ports:
            - '3306:3306/tcp'
        environment:
            MARIADB_ROOT_PASSWORD_FILE: /run/secrets/mariadb_root_password
            MARIADB_PASWORD_FILE: /run/secrets/mariadb_user_password
        volumes:
            - ./mariadb/data:/var/lib/mysql
        secrets:
            - mariadb_root_password
            - mariadb_user_password
secrets:
    mariadb_root_password:
        file: ./mariadb/root-password.txt
    mariadb_user_password:
        file: ./mariadb/user-password.txt
```

### 2. Run the Stack

```bash
docker compose up -d
```

The API will be available at `https://localhost:4450/docs` (Swagger UI).

## Configuration

The application is configured strictly via environment variables. The container will fail to start if required variables are missing or malformed.

### Database Settings

| Variable  | Description                    | Default       |
|-----------|--------------------------------|---------------|
| `DB_HOST` | Hostname of the MariaDB server | `localhost`   |
| `DB_PORT` | Port of the MariaDB server     | `3306`        |
| `DB_USER` | Database username              | `root`        |
| `DB_PASS` | Database password              | **Required**  |
| `DB_NAME` | Database schema name           | `dma_api_dev` |

### Server Settings

| Variable        | Description                     | Default          |
|-----------------|---------------------------------|------------------|
| `PORT`          | Port the gateway listens on     | `4450`           |
| `HOST`          | Binding address                 | `0.0.0.0`        |
| `CORS_ORIGINS`  | Comma-separated allowed origins | `*`              |

---

## Architecture

The Gateway acts as a "Reference Engine." It is decoupled from the main D&D Mapp application to ensure that static rulebook data remains highly cacheable and separate from dynamic player/campaign data.

- **Frontend**: Angular (Admin & Web)
- **Backend**: NestJS (This Image)
- **Auth**: Dedicated Auth Server
- **Storage**: MariaDB

## Links

- **GitHub Repository**: [dnd-mapp/api-gateway](https://github.com/dnd-mapp/api-gateway)
- **Official Documentation**: Available at the `/docs` endpoint of your running instance.
- **Maintainer**: [NoNamer777](https://github.com/NoNamer777)

## License

This project is currently **Unlicensed**. All rights reserved. 

> [!NOTE]
> Game content provided follows the Open Game License (OGL) v1.0a.
