FROM --platform=$BUILDPLATFORM node:24.13.1 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm*.yaml ./


FROM --platform=$BUILDPLATFORM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma:generate && \
    pnpm build


FROM --platform=$BUILDPLATFORM base AS package

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"

COPY --from=build /app/dist/api-gateway .

COPY --from=build /app/generated/prisma ./generated/prisma

COPY prisma.config.ts .

COPY prisma prisma

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install


FROM node:24.13.1-alpine3.23

WORKDIR /app

USER node

COPY --from=package --chown=node:node /app .

EXPOSE 4450

CMD ["node", "main.js"]
