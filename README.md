# dnd-mapp/api-gateway

A high-performance REST API Gateway for the D&D Mapp platform, built with **NestJS** and powered by the **Fastify** adapter.

## What the project does

This repository serves as the central entry point for the D&D Mapp ecosystem. It acts as a robust data provider, handling incoming HTTP requests and serving all platform-related data directly.

While the gateway is responsible for **verifying authorization** to ensure requests are legitimate, it does not handle Authentication (AuthN) or Authorization logic (AuthZ) internally. Those responsibilities are delegated to the `@dnd-mapp/auth-server`.

Key features include:

- Centralized RESTful API routing for D&D Mapp resources.
- High-throughput data serving with the NestJS Fastify adapter.
- Authorization verification for incoming requests.
- Request validation and transformation.
- Integrated security headers and CORS management.

## Why the project is useful

Building a digital tabletop experience requires low latency and high reliability. The `api-gateway` provides:

- **Scalability:** Built on NestJS, allowing for a highly modular and maintainable architecture.
- **Speed:** By using Fastify instead of Express, the API benefits from significantly faster JSON parsing and routing.
- **Efficiency:** A streamlined architecture where data is served directly, reducing the complexity and overhead of downstream microservice communication.

## How users can get started with the project

### Prerequisites

- **Node.js**: v24
- **pnpm**: v10

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dnd-mapp/api-gateway.git
   cd api-gateway
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Running the application

```bash
pnpm start
```

## Where users can get help with your project

If you encounter issues or have questions regarding the API Gateway:

- **GitHub Issues:** Submit a bug report or feature request via the [Issues tab](https://github.com/dnd-mapp/api-gateway/issues).

## Who maintains and contributes to the project

The project is currently maintained and developed by **NoNamer777**.

### Contributing

We welcome contributions to help improve D&D Mapp! Before submitting a Pull Request, please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting changes.

---

## License

Copyright (c) 2026 Oscar. All rights reserved.

This project is currently unlicensed and all rights are reserved. Please refer to the [LICENSE](LICENSE) file for the full legal terms and conditions regarding the use of this software.
