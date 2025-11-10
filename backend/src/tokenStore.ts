const refreshTokensByUser = new Map<string, Set<string>>();

export function storeRefreshToken(userId: string, token: string) {
  if (!refreshTokensByUser.has(userId)) {
    refreshTokensByUser.set(userId, new Set());
  }
  refreshTokensByUser.get(userId)!.add(token);
}

export function removeRefreshToken(userId: string, token: string) {
  const tokens = refreshTokensByUser.get(userId);
  if (!tokens) return;
  tokens.delete(token);
  if (tokens.size === 0) {
    refreshTokensByUser.delete(userId);
  }
}

export function hasRefreshToken(userId: string, token: string) {
  return refreshTokensByUser.get(userId)?.has(token) ?? false;
}
