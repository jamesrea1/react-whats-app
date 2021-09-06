import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import { AuthProvider, useAuth } from 'auth/useAuth';

function App() {
  const { authAttempted, authUser } = useAuth();

  return !authAttempted ? (
    'loading'
  ) : authUser ? (
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
