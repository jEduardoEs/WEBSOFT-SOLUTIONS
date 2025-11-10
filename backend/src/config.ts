import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 4000),
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? 'development-access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'development-refresh-secret',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d'
  },
  corsOrigin: process.env.CORS_ORIGIN ?? '*'
};
