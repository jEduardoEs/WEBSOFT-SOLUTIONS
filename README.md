# jEduardoEs Monorepo

Este repositorio ahora está organizado como un monorepo con [Turborepo](https://turbo.build/repo) y contiene:

- **apps/frontend**: Aplicación Next.js con TypeScript.
- **apps/backend**: API construida con NestJS/Express.
- **packages/shared**: Tipos compartidos entre aplicaciones (productos, usuarios y órdenes).

## Requisitos

- Node.js 20+
- pnpm (se habilita automáticamente mediante Corepack)

## Scripts principales

En la raíz del proyecto:

```bash
pnpm install        # instala dependencias
pnpm dev            # arranca dev servers definidos por turborepo
pnpm build          # compila todas las apps y paquetes
pnpm lint           # ejecuta ESLint mediante Turborepo
pnpm format         # formatea el código con Prettier
```

## Husky y lint-staged

Husky ejecuta `lint-staged` en cada commit para garantizar estilo consistente con Prettier y ESLint.

## Docker

Se incluyó un `Dockerfile` genérico para construir la imagen base del monorepo y un `docker-compose.yml` que levanta los siguientes servicios:

- `frontend`: Next.js en modo desarrollo disponible en `http://localhost:3000`.
- `backend`: API NestJS en modo watch en `http://localhost:3001/api`.
- `db`: PostgreSQL 16 con base de datos `app`.

Para levantar el stack completo:

```bash
docker-compose up --build
```

Esto descargará/compilará las imágenes necesarias y expondrá los puertos mencionados.
