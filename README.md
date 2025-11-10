# jEduardoEs Monorepo

Este repositorio está organizado como un monorepo con [Turborepo](https://turbo.build/repo) y contiene una experiencia end-to-end para **WEBSOFT SOLUTIONS**:

- **apps/frontend**: Aplicación Next.js con TypeScript que centraliza la landing corporativa, catálogo y dashboards para clientes, empleados, administradores y super admin.
- **apps/backend**: API construida con NestJS que expone los módulos de catálogo, usuarios, POS, órdenes y reportería a partir de un solo origen de datos.
- **packages/shared**: Tipos y colecciones compartidas (productos, servicios, roles, reportes, órdenes e invoices) consumidas tanto por frontend como backend.

## Características principales

- Landing page responsiva alineada con la identidad visual (blancos, azules y negros) que resume misión, soluciones, servicios, roles y testimonios.
- Dashboard central con métricas, ventas, facturas y accesos rápidos a los módulos por rol.
- Vistas específicas para `customer`, `employee`, `admin` y `superadmin` con contenidos y acciones sugeridas.
- API NestJS con endpoints listos (`/catalog`, `/users`, `/orders`, `/pos`, `/reports`) para conectar la interfaz y futuras integraciones.
- Datos compartidos y tipados en `@jeduardoes/shared`, evitando discrepancias entre frontend y backend.

## Requisitos

- Node.js 20+
- pnpm (se habilita automáticamente mediante Corepack)

## Scripts principales

En la raíz del proyecto:

```bash
pnpm install        # instala dependencias
docker-compose up --build  # levanta stack con frontend, backend y PostgreSQL
docker-compose down        # detiene servicios
pnpm dev            # arranca dev servers definidos por turborepo
pnpm build          # compila todas las apps y paquetes
pnpm lint           # ejecuta ESLint mediante Turborepo
pnpm format         # formatea el código con Prettier
```

Los scripts individuales se encuentran en cada paquete dentro de `apps/` y `packages/`.

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
