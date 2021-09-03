import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import { AuthProvider, useAuth } from 'auth/useAuth';

function App() {
  const { authAttempted, auth } = useAuth();
  return !authAttempted ? (
    'loading'
  ) : auth ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  );
}

export default function Providers() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
