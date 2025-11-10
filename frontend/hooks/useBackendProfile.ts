import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { getBackendClient } from '../lib/backendClient';
import type { BackendProfile } from '../lib/types';

export function useBackendProfile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<BackendProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status !== 'authenticated') {
        setProfile(null);
        return;
      }

      const accessToken = session?.backendTokens?.accessToken;
      if (!accessToken) {
        setProfile(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const client = getBackendClient(accessToken);
        const response = await client.get('/auth/me');
        setProfile(response.data.user);
      } catch (err: any) {
        if (err.response?.status === 401) {
          signIn();
        }
        setError(err.message ?? 'No fue posible obtener el perfil protegido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session, status]);

  return { profile, isLoading, error };
}
