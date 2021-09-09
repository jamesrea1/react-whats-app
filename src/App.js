import AuthenticatedApp from 'components/AuthenticatedApp';
import UnauthenticatedApp from 'components/UnauthenticatedApp';
import { AuthProvider, useAuth } from 'context/AuthContext';

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

export default function AppProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
