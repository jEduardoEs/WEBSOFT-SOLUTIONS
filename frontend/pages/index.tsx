import Head from 'next/head';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useBackendProfile } from '../hooks/useBackendProfile';

export default function Home() {
  const { data: session, status } = useSession();
  const { profile, isLoading: isProfileLoading, error } = useBackendProfile();

  const isAuthenticated = status === 'authenticated';
  const roles = session?.user?.roles ?? ['visitor'];

  return (
    <>
      <Head>
        <title>Auth0 + NextAuth Demo</title>
      </Head>
      <main>
        <h1>Bienvenido a la demo de autenticación</h1>

        <section>
          <h2>Estado de sesión</h2>
          <p>
            {isAuthenticated ? 'Autenticado ✅' : status === 'loading' ? 'Cargando...' : 'No autenticado'}
          </p>
          {isAuthenticated ? (
            <>
              <p>
                Usuario: <strong>{session?.user?.email}</strong>
              </p>
              <p>Roles (NextAuth): {roles.join(', ')}</p>
              <button onClick={() => signOut({ callbackUrl: '/' })}>Cerrar sesión</button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => signIn('auth0')}>Ingresar con Auth0</button>
              <button onClick={() => signIn('email')}>Ingresar con Email</button>
            </div>
          )}
        </section>

        {isAuthenticated && (
          <section>
            <h2>Perfil del backend</h2>
            {isProfileLoading && <p>Cargando perfil protegido...</p>}
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
            {profile && (
              <pre style={{ background: '#0f172a', color: 'white', padding: '1rem', borderRadius: '0.75rem', overflowX: 'auto' }}>
                {JSON.stringify(profile, null, 2)}
              </pre>
            )}
          </section>
        )}
      </main>
    </>
  );
}
