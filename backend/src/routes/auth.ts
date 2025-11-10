import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticate, AuthenticatedRequest } from '../middleware/authenticate';
import { authorizeRoles } from '../middleware/authorize';
import { config } from '../config';
import { findUserByEmail, findUserById } from '../users';
import { JwtPayload, Role } from '../types';
import { hasRefreshToken, removeRefreshToken, storeRefreshToken } from '../tokenStore';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RefreshRequestBody {
  refreshToken: string;
}

function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiresIn });
}

function signRefreshToken(payload: Pick<JwtPayload, 'sub' | 'roles'>) {
  return jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiresIn });
}

function mapUserToPayload(user: { id: string; email: string; roles: Role[] }): JwtPayload {
  return {
    sub: user.id,
    email: user.email,
    roles: user.roles
  };
}

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body as LoginRequestBody;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = mapUserToPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken({ sub: payload.sub, roles: payload.roles });
  storeRefreshToken(user.id, refreshToken);

  return res.json({
    accessToken,
    refreshToken,
    roles: user.roles,
    user: {
      id: user.id,
      email: user.email,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body as RefreshRequestBody;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const payload = jwt.verify(refreshToken, config.jwt.refreshSecret) as Pick<JwtPayload, 'sub' | 'roles'>;
    if (!hasRefreshToken(payload.sub, refreshToken)) {
      return res.status(401).json({ message: 'Refresh token has been revoked' });
    }

    const user = findUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    const accessToken = signAccessToken(mapUserToPayload(user));

    return res.json({ accessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

router.post('/logout', authenticate, (req: AuthenticatedRequest, res) => {
  const refreshToken = req.body.refreshToken as string | undefined;
  if (refreshToken) {
    removeRefreshToken(req.user!.sub, refreshToken);
  }
  return res.status(204).send();
});

router.get('/me', authenticate, (req: AuthenticatedRequest, res) => {
  return res.json({ user: req.user });
});

router.get('/admin-sample', authenticate, authorizeRoles('admin', 'superadmin'), (req: AuthenticatedRequest, res) => {
  return res.json({ message: 'Welcome admin level user', user: req.user });
});

export default router;
