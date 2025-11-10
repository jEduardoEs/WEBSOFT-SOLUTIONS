# syntax=docker/dockerfile:1.4
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat \
  && corepack enable

COPY package.json pnpm-workspace.yaml turbo.json tsconfig.json .eslintrc.cjs .prettierrc.json ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile=false

CMD ["pnpm", "dev"]
