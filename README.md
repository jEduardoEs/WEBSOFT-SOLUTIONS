# jEduardoEs

Este repositorio contiene una base inicial full-stack con autenticación mediante Auth0/NextAuth en el frontend y un backend Express con JWT y control de roles.

## Estructura

```
frontend/  # Aplicación Next.js + NextAuth
backend/   # API Express con JWT y roles
```

## Frontend (Next.js + NextAuth)

1. Copia el archivo de variables de entorno:

   ```bash
   cd frontend
   cp .env.local.example .env.local
   ```

2. Completa las variables relacionadas con Auth0 y el proveedor de correo. El proyecto está preparado para:

   - Login social mediante Auth0 (`AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_ISSUER`).
   - Login vía email magic-link usando `next-auth/providers/email` (configura `EMAIL_SERVER` y `EMAIL_FROM`).
   - Consumo del backend propio a través de `BACKEND_BASE_URL`.

3. Instala dependencias y ejecuta el servidor de desarrollo:

   ```bash
   npm install
   npm run dev
   ```

4. Páginas incluidas:

   - `/` Estado de sesión, acciones de login/logout y muestra del perfil protegido si existe un token válido del backend.
   - `/protected` Protegida con roles `user`, `employee`, `admin`, `superadmin` mediante el HOC `withRoleProtection`.
   - `/admin` Exclusiva para `admin` y `superadmin`.

5. Utilidades destacadas:

   - `hooks/useAuthorization` y `components/withRoleProtection` permiten proteger vistas en función de los roles del usuario.
   - `hooks/useBackendProfile` ilustra cómo consultar el backend con el token JWT almacenado en la sesión de NextAuth.

## Backend (Express + JWT)

1. Copia las variables de entorno y ajusta los secretos/puertos:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Instala dependencias y levanta la API:

   ```bash
   npm install
   npm run dev
   ```

3. Endpoints principales:

   - `POST /auth/login` Autentica email/contraseña, emite `accessToken` y `refreshToken` con roles (`visitor`, `user`, `employee`, `admin`, `superadmin`).
   - `POST /auth/refresh` Recibe `refreshToken` válido y genera un nuevo `accessToken`.
   - `GET /auth/me` Devuelve el payload del usuario autenticado.
   - `GET /auth/admin-sample` Ejemplo protegido con `authorizeRoles('admin', 'superadmin')`.

4. Middleware/guards:

   - `authenticate` verifica y deserializa el JWT de acceso.
   - `authorizeRoles` limita rutas a los roles permitidos.

5. Usuarios de ejemplo se generan en memoria con contraseña por defecto `P@ssword123`.

## Flujo recomendado

1. El usuario se autentica en el frontend usando Auth0 o email. Los roles pueden mapearse desde Auth0 (`AUTH0_ROLES_NAMESPACE`) o desde los tokens del backend.
2. Las páginas sensibles se protegen con `withRoleProtection` o el hook `useAuthorization`.
3. Para consumir recursos del backend, se aprovecha el token JWT retornado por los endpoints `/auth/login` o `/auth/refresh`.

> **Nota:** La función `exchangeAuth0TokenForBackendCredentials` contiene un stub para mostrar cómo se podría intercambiar un token de Auth0 por credenciales JWT del backend. Adapta este flujo a tu estrategia real (reglas de Auth0, Actions, orquestadores, etc.).
